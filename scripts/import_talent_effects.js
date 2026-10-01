// Refresh the local rank descriptions from the calculator's client-data payload.
const fs = require('node:fs');
const path = require('node:path');
const data = require('../talents-data');

async function main() {
  for (const c of data.classes) {
    const html = await (await fetch(`https://foreverchanges.pro/fr/talents/${c.slug}`)).text();
    const payload = [...html.matchAll(/self\.__next_f\.push\((\[.*?\])\)<\/script>/gs)]
      .map(match => JSON.parse(match[1])[1]).filter(value => typeof value === 'string').join('');
    const records = new Map();
    for (const match of payload.matchAll(/\{"id":"[^"]+","name":/g)) {
      let depth = 0, quoted = false, escaped = false;
      for (let i = match.index; i < payload.length; i++) {
        const char = payload[i];
        if (quoted) {
          if (escaped) escaped = false;
          else if (char === '\\') escaped = true;
          else if (char === '"') quoted = false;
        } else if (char === '"') quoted = true;
        else if (char === '{') depth++;
        else if (char === '}' && --depth === 0) {
          const record = JSON.parse(payload.slice(match.index, i + 1));
          if (record.rank_texts) records.set(record.id, record);
          break;
        }
      }
    }
    for (const tree of c.trees) for (const node of tree.talents) {
      const record = records.get(node.id);
      if (!record || Number(record.max_rank) !== node.max) throw new Error(`Missing or changed talent: ${node.id}`);
      node.effects = Array.from({length: node.max}, (_, i) => {
        const text = record.rank_texts[i + 1];
        if (!text) throw new Error(`Missing rank ${i + 1}: ${node.id}`);
        return text;
      });
    }
    console.log(`${c.slug}: ${records.size} descriptions imported`);
  }
  fs.writeFileSync(path.join(__dirname, '../talents-data.js'),
    `(function(root,factory){const d=factory();if(typeof module==='object'&&module.exports)module.exports=d;root.RenaissanceTalents=d;})(typeof globalThis!=='undefined'?globalThis:this,()=>(${JSON.stringify(data)}));\n`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
