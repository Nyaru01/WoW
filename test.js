const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {createHash}=require('node:crypto');
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
  assert.match(theme,/mont-hyjal\.webp/);
});

test('le catalogue a été enrichi sans masquer les incertitudes',()=>{
  assert.ok(data.tips.length>=12);
  assert.ok(data.items.length>=3);
  for(const slug of ['torche-flamme-eternelle','torche-vindicte','deguisement-voile-hiver','four-en-fer']){
    assert.ok(!data.items.some(item=>item.slug===slug));
    assert.equal(pageForPath('/objets/'+slug),null);
  }
  assert.ok(data.news.length>=9);
  const historical=data.addons.filter(addon=>addon.slug!=='hunters-field-guide'&&!addon.addedDate);
  assert.equal(historical.length,27);
  for(const addon of historical){
    assert.ok(addon.bestFor&&addon.setupAdvice,addon.slug);
    assert.ok(addon.features.length>=3,addon.slug);
    assert.ok(addon.whyRecommended.length>=2,addon.slug);
    assert.equal(addon.tested,false,addon.slug);
    assert.equal(addon.verificationStatus,'À retester',addon.slug);
  }
});

test('les astuces ont des captures locales attribuées et des sources consultées',()=>{
  for(const tip of data.tips){
    assert.equal(tip.verificationStatus,'Sources consultées');
    assert.ok(tip.sources.length>0,tip.slug);
    assert.ok(tip.imageAlt&&tip.imageCaption&&tip.imagePage,tip.slug);
    assert.ok(fs.existsSync(path.join(__dirname,tip.image)),tip.image);
    assert.ok(data.addons.some(addon=>addon.slug===tip.relatedAddon),tip.slug);
    assert.doesNotMatch(tip.image,/azeroth-cosmique|mont-hyjal|citadelle-glace|chute-arthas|porte-tenebres|kaldorei/);
  }
});

test('la sélection de septembre contient les 20 liens sans doublon et des images locales',()=>{
  const expected='forever-quest-tint offhand shotrange reverse-engineering-by-chills roarforever loot-triage dungeonjournal trainerspells forever-field-journal foreverthreatplate banterblocker the-fishing-log immersion coloured-enemy-nameplates forever-thanks shard-source lorewalker forever-fishing questtogether books-forever'.split(' ');
  assert.equal(data.addons.length,49);
  for(const slug of expected){
    const matches=data.addons.filter(addon=>addon.slug===slug);
    assert.equal(matches.length,1,slug);
    const addon=matches[0];
    assert.equal(addon.curseforgeUrl,`https://www.curseforge.com/wow/addons/${slug}`);
    assert.ok(fs.existsSync(path.join(__dirname,addon.image)),slug);
    assert.ok(addon.description.length<200,slug);
    assert.equal(addon.tested,false);
    assert.ok(['capture','logo'].includes(addon.imageKind));
    assert.match(addon.image,/\.webp$/);
    assert.ok(addon.imageSource?.startsWith('https://'),slug);
  }
  assert.match(data.addons.find(addon=>addon.slug==='shotrange').warnings[0],/compatibilité Forever reste à confirmer/);
  for(const slug of ['banterblocker','books-forever','shotrange','loot-triage','forever-field-journal','foreverthreatplate','forever-fishing']){
    const addon=data.addons.find(item=>item.slug===slug);
    assert.equal(addon.imageKind,'capture',slug);
    assert.match(addon.imageSource,/media\.forgecdn\.net\/attachments\//,slug);
    const bytes=fs.readFileSync(path.join(__dirname,addon.image));
    const digest=require('node:crypto').createHash('sha256').update(bytes).digest('hex').slice(0,10);
    assert.ok(addon.image.endsWith(`-${digest}.webp`),`URL versionnée : ${slug}`);
  }
});

test('la Torche du guetteur de nuit possède un guide illustré et sourcé',()=>{
  const torch=data.items.find(item=>item.slug==='torche-de-veillebois');
  assert.equal(torch.title,'Torche du guetteur de nuit');
  assert.equal(torch.duration,'5 minutes');
  assert.equal(torch.cooldown,'30 secondes');
  assert.equal(torch.macro,'/tar Garde des Veilleurs');
  assert.ok(torch.steps.length>=4);
  assert.equal(torch.gallery.length,3);
  assert.ok(torch.sources.some(source=>source.url.includes('mamytwink.com')));
  for(const image of torch.gallery)assert.ok(fs.existsSync(path.join(__dirname,image.src.replace(/^\//,''))));
});

test('les images actives sont optimisées en WebP',()=>{
  const files=['index.html','styles.css','theme.css','art-direction.css','data.js','server.js'];
  const source=files.map(file=>fs.readFileSync(path.join(__dirname,file),'utf8')).join('\n');
  assert.doesNotMatch(source,/assets\/[\w-]+\.png/i);
  for(const file of ['horde-forever.webp','alliance-forever.webp','mont-hyjal.webp','azeroth-cosmique.webp','torch-rp.webp']){
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
  for(const marker of ['night-agency-favorites-v2','night-agency-favorites','navigator.clipboard','renderGlobalSearch','clear-all-favorites'])assert.match(app,new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  assert.doesNotMatch(app,/compatibilityLabels|compatibility-filter/);
  const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  assert.doesNotMatch(html,/Natif Forever|À retester/);
});

test('les parcours utilisent les glyphes SVG du codex sans emoji',()=>{
  const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  for(const icon of ['explore','dungeon','interface','repair','performance','roleplay'])assert.match(html,new RegExp(`id="journey-${icon}"`));
  assert.doesNotMatch(html,/🗺️|⚔️|🖥️|🐞|🚀|🎭/u);
});

test('le héros conserve une atmosphère animée sans réglage utilisateur',()=>{
  const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  const theme=fs.readFileSync(path.join(__dirname,'theme.css'),'utf8');
  const particles=html.match(/<div class="embers"[^>]*>(.*?)<\/div>/s)?.[1]||'';
  const particleCount=(particles.match(/<i(?:\s[^>]*)?><\/i>/g)||[]).length;
  assert.ok(particleCount>=14&&particleCount<=40,'Les particules restent présentes et en nombre limité');
  assert.doesNotMatch(html+app,/motion-toggle|night-agency-motion|Animations : activées/);
  assert.match(theme,/@keyframes aether-rise/);
  assert.match(theme,/prefers-reduced-motion:reduce/);
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
    const response=await fetch(base+route);assert.equal(response.status,200,route);const html=await response.text();assert.match(html,/<link rel="canonical"/);assert.match(html,/property="og:image"/);assert.match(html,/name="twitter:card"/);assert.match(html,/property="og:image" content="http:\/\/[^"]+\/assets\/share-wow-horde-alliance-[a-f0-9]+\.jpg"/);assert.match(html,/property="og:image:width" content="1200"/);assert.doesNotMatch(html,/content="[^"]*azeroth-cosmique/);
    assert.match(html,/href="\/styles\.css\?/);assert.match(html,/href="\/theme\.css\?/);assert.match(html,/src="\/data\.js\?/);assert.match(html,/src="\/app\.js\?/);
  }
  for(const asset of ['/styles.css','/theme.css','/art-direction.css','/data.js','/app.js'])assert.equal((await fetch(base+asset)).status,200,asset);
  const talentPage=await (await fetch(base+'/talents/druid')).text();
  for(const asset of ['talents.js','talents.css','talents-data.js']){
    const version=createHash('sha256').update(fs.readFileSync(path.join(__dirname,asset))).digest('hex').slice(0,16);
    assert.ok(talentPage.includes(`/${asset}?v=${version}`),asset+' uses its content hash to invalidate cached versions');
    assert.equal((await fetch(base+`/${asset}?v=${version}`)).status,200);
  }
  assert.ok(!talentPage.includes('?v=10.4.4'));
  const sitemap=await fetch(base+'/sitemap.xml');assert.equal(sitemap.status,200);assert.match(await sitemap.text(),/\/addons\/hunters-field-guide/);
  const robots=await fetch(base+'/robots.txt');assert.match(await robots.text(),/Sitemap:/);
  const home=await fetch(base+'/');assert.match(await home.text(),/rel="preload" as="image" href="\/assets\/hero-horde-alliance-[a-f0-9]+\.webp"/);
  const presenceController=new AbortController();
  const presence=await fetch(base+'/api/presence',{signal:presenceController.signal});assert.equal(presence.status,200);assert.match(presence.headers.get('content-type'),/text\/event-stream/);
  const firstPresence=await presence.body.getReader().read();assert.match(new TextDecoder().decode(firstPresence.value),/retry:/);presenceController.abort();
  assert.equal((await fetch(base+'/inconnue')).status,404);
  assert.equal((await fetch(base+'/',{method:'POST'})).status,405);
});

test('les addons possèdent une image locale et une source identifiée',()=>{
  assert.equal(data.addons.length,49);
  for(const addon of data.addons){
    assert.ok(['capture','logo'].includes(addon.imageKind),addon.slug);
    assert.ok(fs.existsSync(path.join(__dirname,addon.image)),addon.slug);
    assert.match(addon.imageSource,/^https:\/\//,addon.slug);
    assert.doesNotMatch(addon.imageSource,/patreon|discord/i,addon.slug);
  }
  assert.match(data.addons.find(a=>a.slug==='bug-grabber').imageCaption,/BugSack/);
});


test('la présence compte une session par navigateur malgré plusieurs onglets',async t=>{
  const http=require('node:http');
  const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  const connections=[];
  t.after(async()=>{for(const c of connections)c.destroy();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));});
  const page=await fetch(base+'/');
  const cookie=page.headers.get('set-cookie').split(';')[0];
  assert.match(cookie,/^codex-presence=[a-f0-9]{32}$/);
  assert.doesNotMatch(page.headers.get('set-cookie'),/Max-Age|Expires/);
  assert.match(page.headers.get('cache-control'),/private/);
  const connect=cookie=>new Promise((resolve,reject)=>{
    const request=http.get(base+'/api/presence',{headers:{Cookie:cookie}},response=>{
      let buffer='',lastCount;
      const listeners=[];
      const client={destroy:()=>request.destroy(),waitCount:count=>new Promise((resolve,reject)=>{
        if(lastCount===count)return resolve();
        const timer=setTimeout(()=>reject(Error('compteur attendu : '+count)),2000);
        listeners.push(value=>{if(value===count){clearTimeout(timer);resolve();}});
      })};
      connections.push(client);
      response.on('data',chunk=>{
        buffer+=chunk;
        let end;
        while((end=buffer.indexOf('\n\n'))>=0){const event=buffer.slice(0,end);buffer=buffer.slice(end+2);const line=event.split('\n').find(l=>l.startsWith('data: '));if(!line)continue;lastCount=JSON.parse(line.slice(6)).count;resolve({client,count:lastCount});for(const notify of listeners)notify(lastCount);}
      });
    });request.on('error',reject);
  });
  const first=await connect(cookie);assert.equal(first.count,1);
  const second=await connect(cookie);assert.equal(second.count,1);
  const other=await connect('codex-presence='+'b'.repeat(32));assert.equal(other.count,2);
  first.client.destroy();await second.client.waitCount(2);
  other.client.destroy();await second.client.waitCount(1);
  const navigation=await connect(cookie);assert.equal(navigation.count,1);
});
