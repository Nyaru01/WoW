const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {createServer}=require('./server');
const {createCommunity}=require('./community');

test('votes uniques, changement, annulation et conservation après redémarrage',async t=>{
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),'codex-votes-'));
  t.after(()=>fs.rmSync(directory,{recursive:true,force:true}));
  let store=createCommunity(['atlas'],{directory});
  assert.equal(store.vote('atlas','alice',1),true);
  store.vote('atlas','alice',1);store.vote('atlas','bob',-1);
  assert.deepEqual(store.snapshot('alice').addons.atlas,{up:1,down:1,mine:1});
  store.close();store=createCommunity(['atlas'],{directory});
  assert.deepEqual(store.snapshot('alice').addons.atlas,{up:1,down:1,mine:1});
  store.vote('atlas','alice',-1);
  assert.deepEqual(store.snapshot('alice').addons.atlas,{up:0,down:2,mine:-1});
  store.vote('atlas','alice',0);
  assert.deepEqual(store.snapshot('alice').addons.atlas,{up:0,down:1,mine:0});
  assert.equal(store.vote('invalid','alice',1),false);
  assert.equal(store.vote('atlas','alice',2),false);store.close();
});

test('API votes : cookie fonctionnel, validation, origine, limite et base privée',async t=>{
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),'codex-api-'));
  const server=createServer({community:{directory}});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  t.after(async()=>{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));fs.rmSync(directory,{recursive:true,force:true});});
  const first=await fetch(base+'/api/community');
  assert.equal(first.status,200);assert.match(first.headers.get('cache-control'),/no-store/);
  assert.match(first.headers.get('set-cookie'),/HttpOnly; SameSite=Strict/);
  const cookie=first.headers.get('set-cookie').split(';')[0];
  const send=(payload,headers={})=>fetch(base+'/api/community',{method:'POST',headers:{Cookie:cookie,Origin:base,'Content-Type':'application/json',...headers},body:JSON.stringify(payload)});
  assert.equal((await send({slug:'atlas',value:1},{Origin:'https://untrusted.example'})).status,403);
  assert.equal((await send({slug:'atlas',value:1},{Cookie:''})).status,403);
  assert.equal((await send({slug:'atlas',value:1},{'Content-Type':'text/plain'})).status,415);
  assert.equal((await send({slug:'not-an-addon',value:1})).status,400);
  assert.equal((await send({slug:'atlas',value:'1'})).status,400);
  assert.equal((await send(null)).status,400);
  const vote=await send({slug:'atlas',value:1});assert.equal(vote.status,200);
  assert.deepEqual((await vote.json()).addons.atlas,{up:1,down:0,mine:1});
  const other=await fetch(base+'/api/community');assert.equal((await other.json()).addons.atlas.mine,0);
  assert.equal((await send({slug:'atlas',value:1,filler:'a'.repeat(2200)})).status,413);
  assert.equal((await fetch(base+'/.community/votes.sqlite')).status,404);
  let response;for(let i=0;i<40;i++)response=await send({slug:'atlas',value:0});
  assert.equal(response.status,429);
});
