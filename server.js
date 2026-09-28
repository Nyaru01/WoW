const http=require('http');
const fs=require('fs');
const path=require('path');

const root=__dirname;
const port=Number(process.env.PORT)||3000;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};

http.createServer((request,response)=>{
  if(!['GET','HEAD'].includes(request.method)){
    response.writeHead(405,securityHeaders({'Allow':'GET, HEAD'})).end('Method not allowed');
    return;
  }
  let pathname;
  try{
    pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
  }catch{
    response.writeHead(400,securityHeaders({'Content-Type':'text/plain; charset=utf-8'})).end('Bad request');
    return;
  }
  const requested=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');
  // Publish only the website, never repository metadata or server source.
  if(!['index.html','styles.css','app.js'].includes(requested)&&!/^assets\/[a-z0-9_-]+\.(png|svg|jpg|jpeg|webp)$/i.test(requested)){
    response.writeHead(404,securityHeaders({'Content-Type':'text/plain; charset=utf-8'})).end('Not found');
    return;
  }
  const filePath=path.resolve(root,requested);
  if(!filePath.startsWith(root+path.sep)){
    response.writeHead(403).end('Forbidden');
    return;
  }
  fs.stat(filePath,(error,stats)=>{
    if(error||!stats.isFile()){
      response.writeHead(404,securityHeaders({'Content-Type':'text/plain; charset=utf-8'})).end('Not found');
      return;
    }
    const cache=path.extname(filePath)==='.html'?'public, max-age=0, must-revalidate':'public, max-age=604800';
    response.writeHead(200,securityHeaders({'Content-Type':types[path.extname(filePath).toLowerCase()]||'application/octet-stream','Cache-Control':cache}));
    if(request.method==='HEAD'){response.end();return;}
    const stream=fs.createReadStream(filePath);
    stream.on('error',()=>response.destroy());
    stream.pipe(response);
  });
}).listen(port,'0.0.0.0',()=>console.log(`Le Grimoire de Renaissance écoute sur le port ${port}`));

function securityHeaders(headers){
  return {
    ...headers,
    'Content-Security-Policy':"default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https://blz-contentstack-images.akamaized.net; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    'Referrer-Policy':'strict-origin-when-cross-origin',
    'X-Content-Type-Options':'nosniff',
    'X-Frame-Options':'DENY'
  };
}
