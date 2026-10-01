const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const D=require('./talents-data');
const E=require('./talent-engine');
const site=require('./data');
const {pageForPath}=require('./server');

test('neuf classes, 27 arbres et structure complète avec assets locaux',()=>{
  assert.equal(D.classes.length,9);let count=0;
  for(const c of D.classes){
    assert.equal(c.trees.length,3);assert.ok(pageForPath('/talents/'+c.slug));
    assert.ok(fs.existsSync(path.join(__dirname,'assets/talent-art-'+c.slug+'.webp')));
    for(const tree of c.trees){
      const cells=new Set();
      for(const n of tree.talents){
        count++;assert.ok(n.name&&n.id&&n.source&&n.build);
        assert.equal(n.effects.length,n.max,n.id);
        assert.ok(n.effects.every(effect=>typeof effect==='string'&&effect.trim().length>0),n.id);
        assert.ok(Number.isInteger(n.max)&&n.max>=1&&n.max<=5,n.id);
        assert.ok(n.tier>=0&&n.tier<=6&&n.col>=0&&n.col<=3,n.id);
        assert.ok(!cells.has(n.tier+':'+n.col),n.id);cells.add(n.tier+':'+n.col);
        assert.ok(fs.existsSync(path.join(__dirname,'assets/talent-icon-'+n.icon+'.webp')),n.icon);
        if(n.requires){const previous=tree.talents.find(p=>p.id===n.requires);assert.ok(previous,n.id);assert.ok(previous.tier<=n.tier,n.id);}
      }
    }
  }
  assert.ok(count>450);
});

test('points par niveau, rangs, paliers et prérequis du guerrier',()=>{
  const c=D.classes.find(c=>c.slug==='warrior'),nodes=E.nodes(c);
  const get=name=>nodes.find(n=>n.name===name).id;
  const heroic=get('Frappe héroïque améliorée'),deflection=get('Déviation'),rend=get('Pourfendre amélioré'),deep=get('Blessures profondes');
  assert.equal(E.budget(10),1);assert.equal(E.budget(60),51);
  assert.ok(E.change(c,{},60,deep,1).error);
  let ranks={[heroic]:3,[deflection]:5,[rend]:2};
  assert.match(E.change(c,ranks,60,deep,1).error,/rang maximum/);
  ranks[rend]=3;let change=E.change(c,ranks,60,deep,1);assert.ok(change.ranks);
  assert.ok(E.change(c,change.ranks,60,rend,-1).error);
  assert.ok(E.change(c,{[heroic]:1},10,deflection,1).error);
  assert.ok(E.change(c,{[heroic]:3},60,heroic,1).error);
  assert.ok(E.problem(c,ranks,10));
  assert.ok(E.problem(c,ranks,61));
  assert.ok(E.change(c,{},60,'bad-id',1).error);
  const encoded=E.encode(c,change.ranks);assert.deepEqual(E.decode(c,encoded,60).ranks,change.ranks);
  assert.ok(E.decode(c,encoded,10).error);
  assert.ok(E.decode(c,'bad',60).error);
  assert.ok(E.decode(c,'9'.repeat(nodes.length),60).error);
});

test('sélections pertinentes et partage : slugs connus, doublons et données invalides',()=>{
  for(const s of site.selections){assert.ok(s.title&&s.description&&s.addons.length);for(const slug of s.addons)assert.ok(site.addons.some(a=>a.slug===slug),slug);}
  assert.deepEqual(site.parseSelection('addon:atlas,addon:atlas,unknown:<script>'),[site.addons.find(a=>a.slug==='atlas')]);
  assert.deepEqual(site.parseSelection('<script>'),[]);
  const sample=[site.addons[0],site.tips[0]];
  assert.deepEqual(site.parseSelection(sample.map(i=>i.type+':'+i.slug).join(',')),sample);
});
