const http=require('http');
const fs=require('fs');
const path=require('path');

const root=__dirname;
const port=Number(process.env.PORT)||3000;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};

http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
  const requested=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');
  const filePath=path.resolve(root,requested);
  if(!filePath.startsWith(root+path.sep)){
    response.writeHead(403).end('Forbidden');
    return;
  }
  fs.stat(filePath,(error,stats)=>{
    if(error||!stats.isFile()){
      response.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Not found');
      return;
    }
    response.writeHead(200,{'Content-Type':types[path.extname(filePath).toLowerCase()]||'application/octet-stream','Cache-Control':'public, max-age=3600'});
    fs.createReadStream(filePath).pipe(response);
  });
}).listen(port,'0.0.0.0',()=>console.log(`Chroniques d’Azeroth écoute sur le port ${port}`));
