(function(root,factory){const engine=factory();if(typeof module==='object'&&module.exports)module.exports=engine;root.RenaissanceTalentEngine=engine;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
  const nodes=c=>c.trees.flatMap(t=>t.talents);
  const budget=level=>Math.max(0,level-9);
  const total=ranks=>Object.values(ranks).reduce((sum,n)=>sum+n,0);
  function problem(c,ranks,level){
    if(!Number.isInteger(level)||level<10||level>60)return 'Choisissez un niveau entre 10 et 60.';
    const known=new Map(nodes(c).map(n=>[n.id,n]));
    for(const [id,value] of Object.entries(ranks))if(!known.has(id)||!Number.isInteger(value)||value<0||value>known.get(id).max)return 'Cette répartition contient un rang invalide.';
    if(total(ranks)>budget(level))return 'Cette répartition dépasse les points disponibles à ce niveau.';
    for(const tree of c.trees)for(const node of tree.talents){
      if(!(ranks[node.id]>0))continue;
      const lower=tree.talents.filter(n=>n.tier<node.tier).reduce((sum,n)=>sum+(ranks[n.id]||0),0);
      if(lower<node.tier*5)return `${node.name} requiert ${node.tier*5} points dans les paliers précédents de ${tree.name}.`;
      if(node.requires){const prerequisite=known.get(node.requires);if(!prerequisite||(ranks[node.requires]||0)<prerequisite.max)return `${node.name} requiert ${prerequisite?.name||'un prérequis non confirmé'} au rang maximum.`;}
    }
    return '';
  }
  function change(c,ranks,level,id,delta){
    const n=nodes(c).find(n=>n.id===id);if(!n||![1,-1].includes(delta))return {error:'Talent invalide.'};
    const value=(ranks[id]||0)+delta;if(value<0||value>n.max)return {error:delta>0?'Ce talent est déjà au rang maximum.':'Aucun point à retirer.'};
    const next={...ranks,[id]:value};if(!value)delete next[id];const error=problem(c,next,level);return error?{error}:{ranks:next};
  }
  const encode=(c,ranks)=>nodes(c).map(n=>ranks[n.id]||0).join('');
  function decode(c,value,level){
    const list=nodes(c);if(!value)return {ranks:{}};
    if(typeof value!=='string'||value.length!==list.length||!/^[0-5]+$/.test(value))return {error:'Lien de build invalide.'};
    const ranks={};list.forEach((n,i)=>{if(Number(value[i]))ranks[n.id]=Number(value[i]);});const error=problem(c,ranks,level);return error?{error}:{ranks};
  }
  return {nodes,budget,total,problem,change,encode,decode};
});
