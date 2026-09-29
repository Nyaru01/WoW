const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=require('./data.js');
const {createServer,pageForPath}=require('./server.js');

test('les contenus possèdent un socle valide et des slugs uniques',()=>{
  const ids=new Set();
  for(const item of data.all){
    assert.ok(item.type&&item.slug&&item.title&&item.description&&item.tags&&item.verifiedDate&&item.verificationStatus&&item.sources);
    const id=`${item.type}:${item.slug}`;
    assert.equal(ids.has(id),false,`doublon ${id}`);ids.add(id);
    for(const source of item.sources)assert.match(source.url,/^https:\/\//);
  }
});

test("Hunter's Field Guide reste natif, bêta et non totalement testé",()=>{
  const addon=data.addons.find(item=>item.slug==='hunters-field-guide');
  assert.ok(addon);assert.equal(addon.foreverCompatibility,'native');assert.equal(addon.status,'beta');assert.equal(addon.tested,false);
  assert.deepEqual(addon.commands.map(item=>item.value),['/fg','/fg config','/fg export']);
});

test('la recherche de données couvre plusieurs types de contenu',()=>{
  const search=term=>data.all.filter(item=>JSON.stringify(item).toLocaleLowerCase('fr').includes(term));
  assert.ok(new Set(search('lua').map(item=>item.type)).size>=2);
  assert.ok(search('herbe').some(item=>item.type==='commande'));
  assert.ok(search('chasseur').some(item=>item.slug==='hunters-field-guide'));
});

test('chaque astuce fournit une procédure concrète',()=>{
  for(const tip of data.tips){
    assert.equal(tip.facts.length,3,tip.slug);
    assert.ok(tip.steps.length>=3,tip.slug);
    assert.ok(tip.note&&tip.image,tip.slug);
  }
  const theme=fs.readFileSync(path.join(__dirname,'theme.css'),'utf8');
  assert.match(theme,/hero-forever\.webp/);
});

test('le catalogue a été enrichi sans masquer les incertitudes',()=>{
  assert.ok(data.tips.length>=12);
  assert.ok(data.items.length>=6);
  assert.ok(data.news.length>=9);
  const historical=data.addons.filter(addon=>addon.slug!=='hunters-field-guide');
  assert.equal(historical.length,29);
  for(const addon of historical){
    assert.ok(addon.bestFor&&addon.setupAdvice,addon.slug);
    assert.ok(addon.features.length>=3,addon.slug);
    assert.ok(addon.whyRecommended.length>=2,addon.slug);
    assert.equal(addon.tested,false,addon.slug);
    assert.equal(addon.verificationStatus,'À retester',addon.slug);
  }
});

test('les images actives sont optimisées en WebP',()=>{
  const files=['index.html','styles.css','theme.css','data.js','server.js'];
  const source=files.map(file=>fs.readFileSync(path.join(__dirname,file),'utf8')).join('\n');
  assert.doesNotMatch(source,/assets\/[\w-]+\.png/i);
  for(const file of ['horde-forever.webp','alliance-forever.webp','hero-forever.webp','azeroth-cosmique.webp','torch-rp.webp']){
    const stat=fs.statSync(path.join(__dirname,'assets',file));
    assert.ok(stat.size<350*1024,`${file} est trop lourd`);
  }
});

test('la page dépannage utilise le thème sombre du codex',()=>{
  const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  const theme=fs.readFileSync(path.join(__dirname,'theme.css'),'utf8');
  assert.match(html,/id="depannage" class="troubleshooting"/);
  assert.match(theme,/\.troubleshooting \.content-card/);
  assert.match(theme,/\.troubleshooting-card-foot/);
});

test('toutes les routes publiques ont une page de métadonnées',()=>{
  for(const item of data.all)assert.ok(pageForPath(data.routeFor(item).split('#')[0]));
  for(const route of ['/','/addons','/astuces','/commandes','/commandes/presets','/depannage','/objets','/actualites','/favoris'])assert.ok(pageForPath(route));
});

test('le client conserve les mécanismes de recherche, copie et migration des favoris',()=>{
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  for(const marker of ['renaissance-favorites-v2','renaissance-favorites','navigator.clipboard','renderGlobalSearch','clear-all-favorites'])assert.match(app,new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.doesNotMatch(app,/compatibilityLabels|compatibility-filter/);
  const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  assert.doesNotMatch(html,/Natif Forever|À retester/);
});

test('les parcours utilisent les glyphes SVG du codex sans emoji',()=>{
  const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  for(const icon of ['explore','dungeon','interface','repair','performance','roleplay'])assert.match(html,new RegExp(`id="journey-${icon}"`));
  assert.doesNotMatch(html,/🗺️|⚔️|🖥️|🐞|🚀|🎭/u);
});

test('aucun tracker ou cookie marketing n’est présent',()=>{
  const files=['index.html','app.js','server.js','data.js'].map(file=>fs.readFileSync(path.join(__dirname,file),'utf8')).join('\n');
  assert.doesNotMatch(files,/google-analytics|googletagmanager|facebook pixel|document\.cookie/i);
  const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  for(const link of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert.match(link[0],/rel="noopener noreferrer"/);
});

test('le serveur répond aux routes, métadonnées, sitemap et erreurs',async t=>{
  const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>server.close());
  const base=`http://127.0.0.1:${server.address().port}`;
  for(const route of ['/','/addons','/addons/hunters-field-guide','/astuces/construire-pack-propre','/commandes/reload','/commandes/presets','/depannage/erreur-lua','/objets/torche-de-veillebois','/actualites/client-1-60-1-69977','/favoris']){
    const response=await fetch(base+route);assert.equal(response.status,200,route);const html=await response.text();assert.match(html,/<link rel="canonical"/);assert.match(html,/property="og:image"/);assert.match(html,/name="twitter:card"/);
    assert.match(html,/href="\/styles\.css\?/);assert.match(html,/href="\/theme\.css\?/);assert.match(html,/src="\/data\.js\?/);assert.match(html,/src="\/app\.js\?/);
  }
  for(const asset of ['/styles.css','/theme.css','/data.js','/app.js'])assert.equal((await fetch(base+asset)).status,200,asset);
  const sitemap=await fetch(base+'/sitemap.xml');assert.equal(sitemap.status,200);assert.match(await sitemap.text(),/\/addons\/hunters-field-guide/);
  const robots=await fetch(base+'/robots.txt');assert.match(await robots.text(),/Sitemap:/);
  const home=await fetch(base+'/');assert.match(await home.text(),/rel="preload" as="image" href="\/assets\/hero-forever\.webp"/);
  const presenceController=new AbortController();
  const presence=await fetch(base+'/api/presence',{signal:presenceController.signal});assert.equal(presence.status,200);assert.match(presence.headers.get('content-type'),/text\/event-stream/);
  const firstPresence=await presence.body.getReader().read();assert.match(new TextDecoder().decode(firstPresence.value),/retry:/);presenceController.abort();
  assert.equal((await fetch(base+'/inconnue')).status,404);
  assert.equal((await fetch(base+'/',{method:'POST'})).status,405);
});
