const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {DatabaseSync}=require('node:sqlite');

function createCommunity(slugs,options={}){
  const directory=options.directory||process.env.RAILWAY_VOLUME_MOUNT_PATH||process.env.COMMUNITY_DATA_DIR||(!process.env.RAILWAY_ENVIRONMENT_ID?path.join(__dirname,'.community'):null);
  if(!directory)return {enabled:false,close(){}};
  fs.mkdirSync(directory,{recursive:true});
  const db=new DatabaseSync(path.join(directory,'votes.sqlite'));
  db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS votes (slug TEXT NOT NULL, visitor TEXT NOT NULL, value INTEGER NOT NULL CHECK(value IN (-1,1)), updated TEXT NOT NULL, PRIMARY KEY(slug,visitor));');
  const allowed=new Set(slugs);
  const totals=db.prepare('SELECT slug, SUM(value=1) AS up, SUM(value=-1) AS down FROM votes GROUP BY slug');
  const mine=db.prepare('SELECT slug,value FROM votes WHERE visitor=?');
  const put=db.prepare('INSERT INTO votes VALUES (?,?,?,?) ON CONFLICT(slug,visitor) DO UPDATE SET value=excluded.value,updated=excluded.updated');
  const remove=db.prepare('DELETE FROM votes WHERE slug=? AND visitor=?');
  const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
  return {
    enabled:true,
    identity(request){
      const value=String(request.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('codex-voter='))?.slice(12);
      const valid=/^[a-f0-9]{64}$/.test(value||'');
      const token=valid?value:crypto.randomBytes(32).toString('hex');
      return {id:hash(token),cookie:valid?null:`codex-voter=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000${request.headers['x-forwarded-proto']==='https'||request.socket.encrypted?'; Secure':''}`};
    },
    snapshot(visitor){
      const result=Object.fromEntries(slugs.map(slug=>[slug,{up:0,down:0,mine:0}]));
      for(const row of totals.all())if(result[row.slug])Object.assign(result[row.slug],{up:row.up,down:row.down});
      for(const row of mine.all(visitor))if(result[row.slug])result[row.slug].mine=row.value;
      return {enabled:true,addons:result};
    },
    vote(slug,visitor,value){
      if(!allowed.has(slug)||![-1,0,1].includes(value))return false;
      if(value===0)remove.run(slug,visitor);else put.run(slug,visitor,value,new Date().toISOString());
      return true;
    },
    close(){db.close();}
  };
}
module.exports={createCommunity};
