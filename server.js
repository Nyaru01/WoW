const http=require('http');
const fs=require('fs');
const path=require('path');
const data=require('./data.js');
const {createCommunity}=require('./community.js');

const root=__dirname;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif'};
const typeLabels={addon:'Addons',astuce:'Astuces',commande:'Commandes',depannage:'Dépannage',objet:'Objets RP',actualite:'Actualités',preset:'Presets'};
const staticPages={
  '/':{title:'Renaissance — Le codex français pratique de WoW: Forever',description:'Addons, commandes, astuces, dépannage, objets RP et actualités utiles pour WoW: Forever.'},
  '/addons':{title:'Addons pour WoW: Forever | Renaissance',description:'Addons utiles pour WoW: Forever, avec compatibilité et date de vérification.'},
  '/astuces':{title:'Astuces WoW: Forever | Renaissance',description:'Guides pratiques et astuces vérifiées pour WoW: Forever.'},
  '/commandes':{title:'Commandes WoW: Forever | Renaissance',description:'Commandes console copiables, impacts et procédures de restauration.'},
  '/commandes/presets':{title:'Presets graphiques WoW: Forever | Renaissance',description:'Presets Immersion, Performance et Cinématique composés de CVars documentées.'},
  '/depannage':{title:'Dépannage WoW: Forever | Renaissance',description:'Résoudre les erreurs Lua, addons non chargés et problèmes d’interface.'},
  '/objets':{title:'Objets RP WoW: Forever | Renaissance',description:'Objets RP, trouvailles et commandes de waypoint documentées.'},
  '/actualites':{title:'Actualités WoW: Forever | Renaissance',description:'Ce que les mises à jour changent concrètement pour les joueurs de WoW: Forever.'},
  '/favoris':{title:'Mes favoris | Renaissance',description:'Vos addons, astuces, commandes et objets WoW: Forever enregistrés localement.'},
  '/sources':{title:'Sources | Renaissance',description:'Sources officielles et communautaires utilisées par le codex Renaissance.'},
  '/confidentialite':{title:'Confidentialité | Renaissance',description:'Renaissance ne contient ni compte, ni publicité ciblée, ni tracker, ni cookie marketing.'},
  '/a-propos':{title:'À propos | Renaissance',description:'Renaissance est un codex français indépendant consacré à WoW: Forever.'},
  '/contribuer':{title:'Contribuer | Renaissance',description:'Proposer une correction ou signaler une information à vérifier sur GitHub.'}
};

function escapeHtml(value=''){
  return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function normalizeOrigin(request){
  const configured=process.env.SITE_URL?.replace(/\/$/,'');
  if(configured)return configured;
  if(process.env.RAILWAY_PUBLIC_DOMAIN)return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  const protocol=request.headers['x-forwarded-proto']?.split(',')[0]||'http';
  return `${protocol}://${request.headers.host||'localhost:3000'}`;
}
function itemForPath(pathname){
  return data.all.find(item=>data.routeFor(item).split('#')[0]===pathname)||null;
}
function pageForPath(pathname){
  if(staticPages[pathname])return staticPages[pathname];
  const item=itemForPath(pathname);
  if(item)return {
    title:`${item.title} pour WoW Forever | Renaissance`,description:item.description,item,
    breadcrumbs:[{name:'Accueil',path:'/'},{name:typeLabels[item.type],path:`/${item.type==='objet'?'objets':item.type==='actualite'?'actualites':item.type==='astuce'?'astuces':item.type==='commande'||item.type==='preset'?'commandes':item.type==='depannage'?'depannage':'addons'}`},{name:item.title,path:pathname}]
  };
  return null;
}
function jsonLd(page,canonical){
  const blocks=[];
  if(page.item)blocks.push({'@context':'https://schema.org','@type':'Article',headline:page.item.title,description:page.item.description,dateModified:page.item.verifiedDate,url:canonical,author:{'@type':'Organization',name:'Renaissance'}});
  if(page.breadcrumbs)blocks.push({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:page.breadcrumbs.map((crumb,index)=>({'@type':'ListItem',position:index+1,name:crumb.name,item:new URL(crumb.path,canonical).href}))});
  return blocks.map(block=>`<script type="application/ld+json">${JSON.stringify(block).replace(/</g,'\\u003c')}</script>`).join('\n  ');
}
function renderIndex(request,pathname,page){
  const origin=normalizeOrigin(request);
  const canonical=`${origin}${pathname==='/'?'':pathname}`;
  const image=`${origin}/assets/azeroth-cosmique.webp`;
  let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  if(pathname==='/')html=html.replace('</head>','  <link rel="preload" as="image" href="/assets/hero-horde-alliance-e4bfd66ec7.webp" fetchpriority="high">\n</head>');
  html=html.replace(/<title>.*?<\/title>/s,`<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${escapeHtml(page.description)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/,`<meta property="og:title" content="${escapeHtml(page.title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/,`<meta property="og:description" content="${escapeHtml(page.description)}">`)
    .replace(/<meta property="og:type" content="[^"]*">/,`<meta property="og:type" content="${page.item?'article':'website'}">`)
    .replace('</head>',`  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  ${jsonLd(page,canonical)}
</head>`)
    .replace('<body>','<body data-route="'+escapeHtml(pathname)+'">');
  return html;
}
function sitemap(request){
  const origin=normalizeOrigin(request);
  const excluded=['/favoris'];
  const paths=[...Object.keys(staticPages).filter(item=>!excluded.includes(item)),...new Set(data.all.map(item=>data.routeFor(item).split('#')[0]))];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(paths)].map(item=>`  <url><loc>${escapeHtml(origin+(item==='/'?'':item))}</loc></url>`).join('\n')}
</urlset>`;
}
function securityHeaders(headers={}){
  return {...headers,
    'Content-Security-Policy':"default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://blz-contentstack-images.akamaized.net; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    'Referrer-Policy':'strict-origin-when-cross-origin','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY',
    'Permissions-Policy':'camera=(), microphone=(), geolocation=()'
  };
}
function send(response,status,headers,body,headOnly=false){
  response.writeHead(status,securityHeaders(headers));
  response.end(headOnly?'':body);
}
function createServer(options={}){
  const community=createCommunity(data.addons.map(a=>a.slug),options.community);
  const limits=new Map();
  const api=(response,status,payload,headers={})=>send(response,status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers},JSON.stringify(payload));
  const presenceClients=new Set();
  const broadcastPresence=()=>{
    const payload=`data: ${JSON.stringify({count:presenceClients.size})}\n\n`;
    for(const client of presenceClients){try{client.write(payload);}catch{presenceClients.delete(client);}}
  };
  const server=http.createServer((request,response)=>{
    let pathname;
    try{pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname).replace(/\/$/,'')||'/';}
    catch{return send(response,400,{'Content-Type':'text/plain; charset=utf-8'},'Bad request',request.method==='HEAD');}
    if(pathname==='/api/community'){
      if(!['GET','POST'].includes(request.method))return api(response,405,{error:'Méthode non autorisée.'},{Allow:'GET, POST'});
      if(!community.enabled)return api(response,503,{enabled:false,error:'Les votes sont momentanément indisponibles.'});
      const identity=community.identity(request);
      const headers=identity.cookie?{'Set-Cookie':identity.cookie}:{};
      if(request.method==='GET')return api(response,200,community.snapshot(identity.id),headers);
      if(request.headers.origin!==normalizeOrigin(request))return api(response,403,{error:'Origine non autorisée.'});
      if(!String(request.headers['content-type']).startsWith('application/json'))return api(response,415,{error:'Format non autorisé.'});
      if(identity.cookie)return api(response,403,{error:'Rechargez la page pour activer les votes.'});
      const address=request.headers['x-forwarded-for']?.split(',')[0]||request.socket.remoteAddress;
      const key=require('node:crypto').createHash('sha256').update(address).digest('hex');
      const now=Date.now();for(const [k,v] of limits)if(now-v.start>60000)limits.delete(k);
      const limit=limits.get(key)||{start:now,count:0};limits.set(key,limit);
      if(++limit.count>40)return api(response,429,{error:'Trop de votes rapprochés. Réessayez dans une minute.'},{'Retry-After':'60'});
      let body='',oversized=false;request.setTimeout(10000,()=>request.destroy());
      request.on('data',chunk=>{if(oversized)return;body+=chunk;if(Buffer.byteLength(body)>2048){oversized=true;body='';api(response,413,{error:'Message trop long.'});}});
      request.on('end',()=>{
        if(oversized)return;
        try{const vote=JSON.parse(body);if(!vote||typeof vote!=='object'||Array.isArray(vote)||!community.vote(vote.slug,identity.id,vote.value))return api(response,400,{error:'Vote invalide.'});api(response,200,community.snapshot(identity.id));}
        catch(error){if(error instanceof SyntaxError)return api(response,400,{error:'Vote invalide.'});console.error('Vote non enregistré:',error.message);api(response,503,{error:'Le vote n’a pas été enregistré. Réessayez plus tard.'});}
      });return;
    }
    if(!['GET','HEAD'].includes(request.method))return send(response,405,{'Allow':'GET, HEAD','Content-Type':'text/plain; charset=utf-8'},'Method not allowed',request.method==='HEAD');
    if(pathname==='/robots.txt')return send(response,200,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'},`User-agent: *
Allow: /
Sitemap: ${normalizeOrigin(request)}/sitemap.xml
`,request.method==='HEAD');
    if(pathname==='/sitemap.xml')return send(response,200,{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'},sitemap(request),request.method==='HEAD');
    if(pathname==='/api/presence'){
      if(request.method==='HEAD')return send(response,200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-store'},'',true);
      response.writeHead(200,securityHeaders({'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-store','Connection':'keep-alive','X-Accel-Buffering':'no'}));
      response.write('retry: 5000\n\n');presenceClients.add(response);broadcastPresence();
      const heartbeat=setInterval(()=>{if(!response.destroyed)response.write(': presence\n\n');},25000);
      request.on('close',()=>{clearInterval(heartbeat);presenceClients.delete(response);broadcastPresence();});
      return;
    }
    const page=pageForPath(pathname);
    if(page)return send(response,200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'public, max-age=0, must-revalidate'},renderIndex(request,pathname,page),request.method==='HEAD');
    const requested=pathname.replace(/^\/+/, '');
    if(!['styles.css','theme.css','art-direction.css','app.js','data.js'].includes(requested)&&!/^assets\/[a-z0-9_-]+\.(png|svg|jpg|jpeg|webp|avif)$/i.test(requested)){
      return send(response,404,{'Content-Type':'text/html; charset=utf-8'},'<!doctype html><html lang="fr"><title>Page introuvable | Renaissance</title><body><main><h1>Page introuvable</h1><p><a href="/">Retour au codex</a></p></main></body></html>',request.method==='HEAD');
    }
    const filePath=path.resolve(root,requested);
    if(!filePath.startsWith(root+path.sep))return send(response,403,{'Content-Type':'text/plain; charset=utf-8'},'Forbidden',request.method==='HEAD');
    fs.stat(filePath,(error,stats)=>{
      if(error||!stats.isFile())return send(response,404,{'Content-Type':'text/plain; charset=utf-8'},'Not found',request.method==='HEAD');
      response.writeHead(200,securityHeaders({'Content-Type':types[path.extname(filePath).toLowerCase()]||'application/octet-stream','Cache-Control':'public, max-age=604800'}));
      if(request.method==='HEAD')return response.end();
      fs.createReadStream(filePath).on('error',()=>response.destroy()).pipe(response);
    });
  });
  server.on('close',()=>community.close());
  return server;
}
if(require.main===module){
  const port=Number(process.env.PORT)||3000;
  createServer().listen(port,'0.0.0.0',()=>console.log(`Renaissance écoute sur le port ${port}`));
}
module.exports={createServer,pageForPath,itemForPath,staticPages};
