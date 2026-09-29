const path=require('node:path');
const {createServer}=require('./server.js');

const chromePath=process.env.CHROME_PATH||(
  process.platform==='win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform==='darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome'
);
const runLighthouse=process.argv.includes('--lighthouse')||!process.argv.includes('--a11y');
const runA11y=process.argv.includes('--a11y')||!process.argv.includes('--lighthouse');

async function lighthouseAudit(base){
  const [{default:lighthouse},{launch}]=await Promise.all([import('lighthouse'),import('chrome-launcher')]);
  const chrome=await launch({chromePath,chromeFlags:['--headless=new','--no-sandbox','--disable-gpu']});
  const pages=['/','/astuces','/depannage','/addons/hunters-field-guide'];
  const results=[];
  try{
    for(const route of pages){
      const report=await lighthouse(base+route,{port:chrome.port,logLevel:'error',output:'json',onlyCategories:['performance','accessibility','best-practices','seo']});
      const {categories,audits}=report.lhr;
      const metrics={
        performance:Math.round(categories.performance.score*100),accessibility:Math.round(categories.accessibility.score*100),
        bestPractices:Math.round(categories['best-practices'].score*100),seo:Math.round(categories.seo.score*100),
        LCP:audits['largest-contentful-paint'].displayValue,CLS:audits['cumulative-layout-shift'].displayValue,
        TBT:audits['total-blocking-time'].displayValue,SpeedIndex:audits['speed-index'].displayValue
      };
      results.push({route,...metrics});console.log('Lighthouse',route,metrics);
    }
  }finally{
    try{await chrome.kill();}catch(error){if(error.code!=='EPERM')throw error;}
  }
  return results;
}

async function accessibilityAudit(base){
  const {chromium}=require('playwright-core');
  const AxeBuilder=require('@axe-core/playwright').default;
  const browser=await chromium.launch({executablePath:chromePath,headless:true,args:['--no-sandbox','--disable-gpu']});
  const routes=['/','/addons','/astuces','/commandes','/depannage','/objets','/actualites','/favoris','/addons/hunters-field-guide','/astuces/preparer-liste-butin','/commandes/reload','/depannage/erreur-lua','/objets/torche-de-veillebois','/actualites/systeme-heritage'];
  const viewports=[{name:'mobile-compact',width:320,height:720},{name:'mobile',width:390,height:844},{name:'desktop',width:1440,height:900}];
  const violations=[];
  try{
    for(const viewport of viewports){
      const context=await browser.newContext({viewport});
      const page=await context.newPage();
      for(const route of routes){
        await page.goto(base+route,{waitUntil:'load'});
        await page.waitForTimeout(250);
        const result=await new AxeBuilder({page}).analyze();
        for(const violation of result.violations)violations.push({route,viewport:viewport.name,id:violation.id,impact:violation.impact,nodes:violation.nodes.length,target:violation.nodes.map(node=>node.target.join(' ')).join(' | '),help:violation.help});
        const overflow=await page.evaluate(()=>{
          document.documentElement.style.overflowX='visible';
          document.body.style.overflowX='visible';
          const width=document.documentElement.clientWidth;
          const hasScrollContainer=element=>{for(let parent=element.parentElement;parent&&parent!==document.body;parent=parent.parentElement){const overflowX=getComputedStyle(parent).overflowX;if(['auto','scroll','hidden','clip'].includes(overflowX))return true;}return false;};
          const offenders=[...document.querySelectorAll('body *')].filter(element=>{const box=element.getBoundingClientRect();return !hasScrollContainer(element)&&(box.right>width+1||box.left<-1);}).slice(0,8).map(element=>`${element.tagName.toLowerCase()}${element.id?'#'+element.id:''}${element.classList.length?'.'+[...element.classList].join('.'):''}`);
          return {scrollWidth:document.documentElement.scrollWidth,width,offenders};
        });
        if(overflow.scrollWidth>overflow.width+1||overflow.offenders.length)violations.push({route,viewport:viewport.name,id:'horizontal-overflow',impact:'serious',nodes:overflow.offenders.length,target:overflow.offenders.join(' | '),help:`Viewport ${overflow.width}px, document ${overflow.scrollWidth}px`});
      }
      await context.close();
    }
  }finally{await browser.close();}
  const unique=[...new Map(violations.map(item=>[`${item.route}:${item.viewport}:${item.id}`,item])).values()];
  if(unique.length)console.table(unique);else console.log('Axe : aucune violation sur les routes et viewports audités.');
  return unique;
}

async function main(){
  const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  try{
    const lighthouseResults=runLighthouse?await lighthouseAudit(base):[];
    const violations=runA11y?await accessibilityAudit(base):[];
    const serious=violations.filter(item=>['serious','critical'].includes(item.impact));
    const failedScore=lighthouseResults.some(item=>item.accessibility<95||item.seo<95||item.bestPractices<90);
    if(serious.length||failedScore)process.exitCode=1;
  }finally{await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
