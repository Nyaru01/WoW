(() => {
  'use strict';
  const data=globalThis.RenaissanceData;
  if(!data)return;

  const $=(selector,scope=document)=>scope.querySelector(selector);
  const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];
  const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normalize=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
  const formatDate=value=>value?new Intl.DateTimeFormat('fr-FR',{dateStyle:'long'}).format(new Date(`${value}T12:00:00`)):'Non vérifié';
  const typeLabels={addon:'Addon',astuce:'Astuce',commande:'Commande',depannage:'Dépannage',objet:'Objet RP',actualite:'Actualité',preset:'Preset'};
  function readPreference(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}}
  function savePreference(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}}
  const favoriteKey='renaissance-favorites-v2';
  const legacyFavorites=readPreference('renaissance-favorites',[]);
  const migrated=Array.isArray(legacyFavorites)?legacyFavorites.map(url=>data.addons.find(addon=>addon.curseforgeUrl===url)).filter(Boolean).map(addon=>`addon:${addon.slug}`):[];
  const favorites=new Set([...readPreference(favoriteKey,[]),...migrated]);
  if(migrated.length)savePreference(favoriteKey,[...favorites]);
  const favoriteId=item=>`${item.type}:${item.slug}`;
  const isFavorite=item=>favorites.has(favoriteId(item));
  const persistFavorites=()=>savePreference(favoriteKey,[...favorites]);
  let community={enabled:false,addons:{}};
  let communityLoaded=false;
  const voting=new Set();
  function thumb(direction){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${direction===-1?'class="thumb-down"':''}><path d="M7 10v11H3V10h4Zm0 0 5-7c1-1 3 0 2 3l-1 4h6c2 0 2 1 2 2l-2 7c0 1-1 2-2 2H7"/></svg>`;}
  function voteControls(item){
    const votes=community.addons[item.slug]||{up:0,down:0,mine:0};
    const disabled=!community.enabled||voting.has(item.slug);
    return `<div class="community-votes" data-votes="${escapeHtml(item.slug)}" role="group" aria-label="Avis des visiteurs sur ${escapeHtml(item.title)}"><span class="vote-heading">Avis des joueurs</span><div class="vote-buttons">${[1,-1].map(value=>`<button type="button" data-vote-slug="${escapeHtml(item.slug)}" data-vote-value="${value}" aria-pressed="${votes.mine===value}" aria-label="${value===1?'Utile':'Pas convaincu'} : ${escapeHtml(item.title)}${votes.mine===value?' — cliquer pour annuler':''}" ${disabled?'disabled':''}>${thumb(value)}<span>${value===1?'Utile':'Pas convaincu'}</span><strong>${value===1?votes.up:votes.down}</strong></button>`).join('')}</div><small>${!communityLoaded?'Chargement des votes…':!community.enabled?'Votes momentanément indisponibles.':votes.mine?'Votre vote est enregistré · cliquez à nouveau pour l’annuler.':'Un vote par navigateur · modifiable à tout moment.'}</small></div>`;
  }
  function compatibility(item,detail=false){
    const status=item.testedBy==='Nyaru'?'tested':item.foreverCompatibility==='native'?'announced':'unknown';
    const label={tested:'Testé par Nyaru',announced:'Conçu pour Forever · non testé',unknown:'Compatibilité à vérifier'}[status];
    return `<div class="compatibility-status ${status}"><span class="compatibility-dot" aria-hidden="true"></span><span>${label}</span></div>${detail?`<p class="compatibility-explanation">${status==='tested'?'Test en jeu réalisé par Nyaru.':status==='announced'?'L’auteur présente cet addon comme conçu pour WoW: Forever. Cela ne vaut pas un test en jeu par Nyaru.':'La présence dans le catalogue ne garantit pas le fonctionnement sur votre client. Vérifiez le fichier proposé par l’auteur ; cet addon n’a pas été testé en jeu par Nyaru.'}</p><p class="verified-date">Fiche consultée le ${escapeHtml(formatDate(item.verifiedDate))}</p>`:''}`;
  }
  function communityPanel(item){return `<section class="addon-community detail-block"><h2>L’avis de la communauté</h2><p>Ces votes reflètent l’utilité de l’addon pour les joueurs. Ils ne certifient pas sa compatibilité.</p>${voteControls(item)}<button class="report-link" type="button" data-report-slug="${escapeHtml(item.slug)}">Signaler un problème avec cet addon →</button></section>`;}
  function refreshVotes(){
    $$('[data-votes]').forEach(element=>{const item=data.addons.find(a=>a.slug===element.dataset.votes);if(item)element.outerHTML=voteControls(item);});
  }
  const communityFeedback=document.createElement('div');communityFeedback.className='community-feedback';communityFeedback.setAttribute('role','status');communityFeedback.setAttribute('aria-live','polite');document.body.append(communityFeedback);
  let feedbackTimer;
  function voteFeedback(message){communityFeedback.textContent=message;communityFeedback.classList.add('visible');clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>communityFeedback.classList.remove('visible'),4500);}
  document.addEventListener('click',async event=>{
    const button=event.target.closest('[data-vote-slug]');
    if(button){
      const slug=button.dataset.voteSlug;if(voting.has(slug)||!community.enabled)return;
      const selected=Number(button.dataset.voteValue),value=community.addons[slug]?.mine===selected?0:selected;
      voting.add(slug);refreshVotes();
      try{
        const response=await fetch('/api/community',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug,value})});
        const result=await response.json();if(!response.ok)throw new Error(result.error||'Le vote n’a pas été enregistré.');
        community=result;voteFeedback(value?'Votre vote est enregistré.':'Votre vote est annulé.');
      }catch(error){voteFeedback(error.message||'Connexion impossible. Réessayez plus tard.');}
      finally{voting.delete(slug);refreshVotes();if(addonSort?.value==='rating')renderAddons();}
    }
    const report=event.target.closest('[data-report-slug]');if(report)openReport(report.dataset.reportSlug);
  });
  function openReport(slug){
    const item=data.addons.find(a=>a.slug===slug);if(!item)return;
    let dialog=$('#report-dialog');if(dialog)dialog.remove();
    dialog=document.createElement('dialog');dialog.id='report-dialog';dialog.className='report-dialog';dialog.setAttribute('aria-labelledby','report-title');
    dialog.innerHTML=`<form><button type="button" class="report-close" aria-label="Fermer le signalement">×</button><span class="chapter">Aider la communauté</span><h2 id="report-title">Signaler un problème</h2><p>${escapeHtml(item.title)}</p><label for="report-reason">Quel problème avez-vous rencontré ?</label><select id="report-reason" required><option>Incompatibilité avec WoW: Forever</option><option>Erreur ou dysfonctionnement</option><option>Lien de téléchargement cassé</option><option>Image incorrecte</option><option>Information à corriger</option></select><label for="report-version">Version du jeu et de l’addon <small>(facultatif)</small></label><input id="report-version" maxlength="120" placeholder="Ex. client Forever, version de l’addon…"><label for="report-details">Décrivez le problème</label><textarea id="report-details" required minlength="10" maxlength="2000" rows="4" placeholder="Ce que vous attendiez, ce qui se produit et comment le reproduire…"></textarea><p class="report-help">Le bouton ouvre un brouillon sur GitHub : relisez-le puis publiez-le avec votre compte. Votre signalement sera public ; évitez les données personnelles.</p><button class="button primary" type="submit">Préparer le signalement sur GitHub ↗</button></form>`;
    document.body.append(dialog);
    $('.report-close',dialog).addEventListener('click',()=>dialog.close());
    $('form',dialog).addEventListener('submit',event=>{
      event.preventDefault();
      const reason=$('#report-reason',dialog).value,version=$('#report-version',dialog).value.trim(),details=$('#report-details',dialog).value.trim();
      const params=new URLSearchParams({title:`[Addon] ${item.title} : ${reason}`,body:`Addon : ${item.title}\nFiche : ${location.origin}/addons/${item.slug}\nProblème : ${reason}\nVersion du jeu / addon : ${version||'Non précisée'}\n\n${details}`});
      window.open(`https://github.com/Nyaru01/WoW/issues/new?${params}`,'_blank','noopener,noreferrer');
    });dialog.showModal();
  }

  function sourceLinks(sources=[]){
    if(!sources.length)return '<p class="source-note">Aucune source externe nécessaire pour cette fiche pratique.</p>';
    return `<div class="source-list">${sources.map(source=>`<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)} <small class="external-destination">${escapeHtml(new URL(source.url).hostname.replace(/^www\./,''))} · nouvel onglet ↗</small></a>`).join('')}</div>`;
  }
  function verified(item){
    return `<span class="verified-date">✓ ${escapeHtml(item.verificationStatus||'Vérifié')} · ${escapeHtml(formatDate(item.verifiedDate))}</span>`;
  }
  function favoriteButton(item){
    const active=isFavorite(item);
    return `<button class="favorite-button" data-favorite-id="${escapeHtml(favoriteId(item))}" aria-pressed="${active}" aria-label="${active?'Retirer':'Ajouter'} ${escapeHtml(item.title)} ${active?'des':'aux'} favoris">${active?'★':'☆'}</button>`;
  }
  function copyBlock(value,label='Copier'){
    return `<div class="command-block"><code>${escapeHtml(value)}</code><button data-copy="${escapeHtml(value)}" aria-label="${label}">${label}</button></div>`;
  }
  function tagList(tags=[]){return tags.length?`<div class="tag-list">${tags.map(tag=>`<span>${escapeHtml(tag)}</span>`).join('')}</div>`:'';}
  function typePath(item){return data.routeFor(item);}

  document.addEventListener('click',async event=>{
    const copy=event.target.closest('[data-copy]');
    if(copy){
      const initial=copy.textContent;
      try{
        if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(copy.dataset.copy);
        else{
          const field=document.createElement('textarea');field.value=copy.dataset.copy;field.style.cssText='position:fixed;opacity:0';
          document.body.append(field);field.select();document.execCommand('copy');field.remove();
        }
        copy.textContent='Copié !';copy.classList.add('copied');
      }catch{copy.textContent='Copie impossible';}
      setTimeout(()=>{copy.textContent=initial;copy.classList.remove('copied');},1600);
      return;
    }
    const favorite=event.target.closest('[data-favorite-id]');
    if(favorite){
      const id=favorite.dataset.favoriteId;
      favorites.has(id)?favorites.delete(id):favorites.add(id);
      persistFavorites();
      refreshFavoriteButtons();
      if(location.pathname==='/favoris')renderFavorites();
      renderAddons();
    }
  });
  function refreshFavoriteButtons(){
    $$('[data-favorite-id]').forEach(button=>{
      const active=favorites.has(button.dataset.favoriteId);
      button.textContent=active?'★':'☆';button.setAttribute('aria-pressed',String(active));
    });
    const count=$('#favorites-count');if(count)count.textContent=favorites.size;
  }

  const addonGrid=$('.addon-grid');
  const addonSearch=$('#addon-search');
  const addonSort=$('#addon-sort');
  const count=$('#addon-count');
  const empty=$('.empty-state');
  const pagination=$('.catalogue-pagination');
  let activeFilter=new URLSearchParams(location.search).get('categorie')||'all';
  let favoritesOnly=false;
  let currentPage=1;
  const pageSize=12;
  const categoryOrder=['all','quetes','donjons','combat','interface','confort','support','hunter','map','rp'];
  const categoryNames={all:'Tous',...data.categoryLabels};
  const filterRow=$('.filter-row');
  if(filterRow){
    filterRow.innerHTML=categoryOrder.map(key=>`<button class="${key===activeFilter?'active':''}" data-addon-filter="${key}" aria-pressed="${key===activeFilter}">${escapeHtml(categoryNames[key])} <span>${key==='all'?data.addons.length:data.addons.filter(addon=>addon.categories.includes(key)).length}</span></button>`).join('');
    filterRow.addEventListener('click',event=>{
      const button=event.target.closest('[data-addon-filter]');if(!button)return;
      activeFilter=button.dataset.addonFilter;currentPage=1;
      $$('[data-addon-filter]',filterRow).forEach(candidate=>{const active=candidate===button;candidate.classList.toggle('active',active);candidate.setAttribute('aria-pressed',String(active));});
      renderAddons();
    });
  }
  function addonCard(addon,index=0){
    const preview=hasAddonPreview(addon);
    return `<article class="addon-card" style="--accent:#d7ad58;--delay:${Math.min(index,8)*35}ms">
      <a class="addon-cover ${preview?'':'curseforge-placeholder'}" href="/addons/${escapeHtml(addon.slug)}" tabindex="-1" aria-hidden="true"><img src="${preview?escapeHtml(addon.image):'/assets/curseforge-logo.svg'}" alt="" width="500" height="320" loading="lazy" decoding="async"><span>${preview?'Aperçu en jeu':'Aperçu non disponible'}</span></a>
      <div class="addon-top"><span class="addon-category">${escapeHtml(addon.categories.map(key=>categoryNames[key]).join(' · '))}</span>${favoriteButton(addon)}</div>
      ${addon.status==='beta'?'<div class="status-row"><span class="status-pill beta">Bêta</span></div>':''}
      <h2><a href="/addons/${escapeHtml(addon.slug)}">${escapeHtml(addon.title)}</a></h2><p>${escapeHtml(addon.description)}</p>
      ${compatibility(addon)}
      <div class="addon-meta"><span>par ${escapeHtml(addon.author)}</span><a href="/addons/${escapeHtml(addon.slug)}">Découvrir cet addon →</a></div>
      <a class="addon-download" href="${escapeHtml(addon.curseforgeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(addon.title)} sur CurseForge">Versions sur CurseForge <span aria-hidden="true">↗</span></a>
      ${voteControls(addon)}<button type="button" class="report-link" data-report-slug="${escapeHtml(addon.slug)}">Signaler un problème →</button>
    </article>`;
  }
  function voteRank(item){
    const {up=0,down=0}=community.addons[item.slug]||{},n=up+down;if(!n)return -1;
    const p=up/n,z=1.96;return (p+z*z/(2*n)-z*Math.sqrt((p*(1-p)+z*z/(4*n))/n))/(1+z*z/n);
  }
  function renderAddons(){
    if(!addonGrid)return;
    const query=normalize(addonSearch?.value.trim());
    let matches=data.addons.filter(addon=>{
      const inCategory=activeFilter==='all'||addon.categories.includes(activeFilter);
      const haystack=normalize([addon.title,addon.description,...addon.tags,...addon.categories.map(key=>categoryNames[key])].join(' '));
      return inCategory&&(!favoritesOnly||isFavorite(addon))&&(!query||haystack.includes(query));
    });
    if(addonSort?.value==='name')matches.sort((a,b)=>a.title.localeCompare(b.title,'fr'));
    if(addonSort?.value==='newest')matches.sort((a,b)=>String(b.addedDate||'').localeCompare(String(a.addedDate||''))||a.title.localeCompare(b.title,'fr'));
    if(addonSort?.value==='verified')matches.sort((a,b)=>String(b.verifiedDate).localeCompare(String(a.verifiedDate)));
    if(addonSort?.value==='selection')matches.sort((a,b)=>Number(b.recommended)-Number(a.recommended));
    if(addonSort?.value==='rating')matches.sort((a,b)=>voteRank(b)-voteRank(a)||(community.addons[b.slug]?.up||0)-(community.addons[a.slug]?.up||0)||a.title.localeCompare(b.title,'fr'));
    const totalPages=Math.max(1,Math.ceil(matches.length/pageSize));currentPage=Math.min(currentPage,totalPages);
    const first=(currentPage-1)*pageSize;
    addonGrid.innerHTML=matches.slice(first,first+pageSize).map(addonCard).join('');
    if(count)count.textContent=matches.length;
    const status=$('#catalogue-status');if(status)status.textContent=matches.length?`${first+1}–${Math.min(first+pageSize,matches.length)} sur ${matches.length} addons`:'Aucun addon trouvé';
    if(empty)empty.hidden=matches.length>0;
    if(pagination){
      pagination.hidden=matches.length===0;
      $('.page-prev',pagination).disabled=currentPage===1;$('.page-next',pagination).disabled=currentPage===totalPages;
      $('.page-status',pagination).textContent=`Page ${currentPage} sur ${totalPages}`;
      $('.page-numbers',pagination).innerHTML=Array.from({length:totalPages},(_,i)=>`<button data-page="${i+1}" ${i+1===currentPage?'aria-current="page" class="active"':''}>${String(i+1).padStart(2,'0')}</button>`).join('');
    }
    const clear=$('#clear-filters');if(clear)clear.hidden=!query&&activeFilter==='all'&&!favoritesOnly;
    refreshFavoriteButtons();
  }
  addonSearch?.addEventListener('input',()=>{currentPage=1;renderAddons();});
  addonSort?.addEventListener('change',()=>{currentPage=1;renderAddons();});
  pagination?.addEventListener('click',event=>{
    if(event.target.closest('.page-prev'))currentPage--;
    else if(event.target.closest('.page-next'))currentPage++;
    else if(event.target.closest('[data-page]'))currentPage=Number(event.target.closest('[data-page]').dataset.page);
    else return;
    renderAddons();$('.catalogue-tools')?.scrollIntoView({block:'start'});
  });
  $('#favorites-filter')?.addEventListener('click',event=>{favoritesOnly=!favoritesOnly;event.currentTarget.setAttribute('aria-pressed',String(favoritesOnly));currentPage=1;renderAddons();});
  $('#clear-filters')?.addEventListener('click',resetAddons);
  $('#reset-catalogue')?.addEventListener('click',resetAddons);
  function resetAddons(){
    if(addonSearch)addonSearch.value='';favoritesOnly=false;activeFilter='all';currentPage=1;
    $$('[data-addon-filter]').forEach(button=>{const active=button.dataset.addonFilter==='all';button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    renderAddons();
  }
  $$('[data-view]').forEach(button=>button.addEventListener('click',()=>{
    const view=button.dataset.view;addonGrid?.classList.toggle('list-view',view==='list');savePreference('renaissance-view',view);
    $$('[data-view]').forEach(candidate=>candidate.setAttribute('aria-pressed',String(candidate===button)));
  }));
  if(readPreference('renaissance-view','cards')==='list')$('[data-view="list"]')?.click();
  renderAddons();
  const meter=$('.hero-meter strong');if(meter)meter.textContent=data.addons.length;

  const globalInput=$('#home-search');
  const globalResults=$('#global-search-results');
  function renderGlobalSearch(){
    if(!globalInput||!globalResults)return;
    const query=normalize(globalInput.value.trim());
    if(!query){globalResults.hidden=true;return;}
    const matches=data.all.filter(item=>normalize([item.title,item.description,...(item.tags||[]),item.command||'',item.verificationStatus||''].join(' ')).includes(query)).slice(0,10);
    globalResults.innerHTML=matches.length?matches.map(item=>`<a class="search-result" href="${escapeHtml(typePath(item))}"><span>${escapeHtml(typeLabels[item.type])}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small><em>${escapeHtml((item.tags||[]).slice(0,3).join(' · '))}${item.type==='addon'?'':` · ${escapeHtml(item.verificationStatus||'')} · ${escapeHtml(formatDate(item.verifiedDate))}`}</em></a>`).join(''):'<p>Aucun résultat. Essayez un terme plus court.</p>';
    globalResults.hidden=false;
  }
  globalInput?.addEventListener('input',renderGlobalSearch);
  $('.hero-search')?.addEventListener('submit',event=>{event.preventDefault();renderGlobalSearch();globalResults?.querySelector('a')?.focus();});
  document.addEventListener('click',event=>{if(globalResults&&!event.target.closest('.hero-search')&&!event.target.closest('#global-search-results'))globalResults.hidden=true;});

  const troubleGrid=$('#troubleshooting-grid');
  if(troubleGrid)troubleGrid.innerHTML=data.troubleshooting.map((item,index)=>`<article class="content-card troubleshooting-card"><div class="troubleshooting-card-top"><span>Guide ${String(index+1).padStart(2,'0')}</span><b>${item.steps.length} étapes</b></div><h2><a href="${typePath(item)}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.description)}</p>${tagList(item.tags)}<div class="troubleshooting-card-foot">${verified(item)}<a class="text-link" href="${typePath(item)}">Ouvrir la checklist →</a></div></article>`).join('');

  const commandShell=$('#commandes .section-shell');
  if(commandShell){
    const directory=document.createElement('section');directory.className='content-directory';directory.innerHTML=`<div class="section-intro"><div><span class="chapter">Fiches partageables</span><h2>Toutes les commandes</h2></div><p>Une URL stable par réglage, avec impact et restauration documentés.</p></div><div class="content-grid">${data.commands.map(item=>`<article class="content-card"><div class="addon-top"><span>Commande</span>${favoriteButton(item)}</div><h3><a href="${typePath(item)}">${escapeHtml(item.title)}</a></h3>${copyBlock(item.command)}${verified(item)}</article>`).join('')}<article class="content-card"><span>Presets</span><h3><a href="/commandes/presets">Immersion, Performance et Cinématique</a></h3><p>Copiez un ensemble cohérent de CVars documentées.</p><a class="text-link" href="/commandes/presets">Voir les presets →</a></article></div>`;commandShell.append(directory);
  }
  const itemShell=$('#objets-rp .section-shell');
  if(itemShell){
    const directory=document.createElement('section');directory.className='content-directory';directory.innerHTML=`<div class="section-intro"><div><span class="chapter">Fiches partageables</span><h2>Toutes les trouvailles</h2></div><p>Torches, lumière, jouets, transformations, musique, cuisine, feu, objets équipables, insolites et secrets.</p></div><div class="filter-row item-filters" role="group" aria-label="Filtrer les objets RP"><button class="active" data-item-filter="all">Tous</button><button data-item-filter="Torches">Torches</button><button data-item-filter="Lumière">Lumière</button><button data-item-filter="Jouets">Jouets</button><button data-item-filter="Transformation">Transformation</button><button data-item-filter="Musique">Musique</button><button data-item-filter="Cuisine">Cuisine</button><button data-item-filter="Feu">Feu</button><button data-item-filter="Objets équipables">Objets équipables</button><button data-item-filter="Objets insolites">Objets insolites</button><button data-item-filter="Secrets">Secrets</button></div><div class="content-grid item-directory"></div>`;itemShell.append(directory);
    const renderItems=filter=>{$('.item-directory',directory).innerHTML=data.items.filter(item=>filter==='all'||item.category===filter).map(item=>`<article class="content-card"><div class="addon-top"><span>${escapeHtml(item.category)}</span>${favoriteButton(item)}</div><h3><a href="${typePath(item)}">${escapeHtml(item.title)}</a></h3><p>${escapeHtml(item.description)}</p>${item.way?copyBlock(item.way,'Copier /way'):''}${verified(item)}</article>`).join('')||'<p>Aucune trouvaille documentée dans cette catégorie pour le moment.</p>';refreshFavoriteButtons();};
    $('.item-filters',directory).addEventListener('click',event=>{const button=event.target.closest('[data-item-filter]');if(!button)return;$$('[data-item-filter]',directory).forEach(item=>item.classList.toggle('active',item===button));renderItems(button.dataset.itemFilter);});renderItems('all');
  }
  const newsShell=$('#nouvelles .section-shell');
  if(newsShell){
    const directory=document.createElement('section');directory.className='content-directory';directory.innerHTML=`<div class="section-intro"><div><span class="chapter">Impacts documentés</span><h2>Fiches d’actualité</h2></div><p>Ce qui change réellement, pour qui, et la source officielle.</p></div><div class="content-grid">${data.news.map(item=>`<article class="content-card"><span>Actualité</span><h3><a href="${typePath(item)}">${escapeHtml(item.title)}</a></h3><p>${escapeHtml(item.description)}</p>${tagList(item.tags)}${verified(item)}</article>`).join('')}</div>`;newsShell.append(directory);
  }

  const tabList=$('.guide-tabs');
  const guide=$('#guide-panel');
  function tipFigure(tip){return `<figure class="tip-figure"><img src="${escapeHtml(tip.image)}" alt="${escapeHtml(tip.imageAlt)}" width="960" height="540" decoding="async"><figcaption>${escapeHtml(tip.imageCaption)} <a href="${escapeHtml(tip.imagePage)}" target="_blank" rel="noopener noreferrer">Voir cette capture sur CurseForge ↗</a></figcaption></figure>`;}
  if(tabList&&guide){
    tabList.innerHTML=data.tips.map((tip,index)=>`<button class="guide-tab ${index===0?'active':''}" role="tab" id="guide-tab-${index}" aria-controls="guide-panel" aria-selected="${index===0}" tabindex="${index===0?'0':'-1'}" data-tip="${index}"><span>${String(index+1).padStart(2,'0')}</span><div><small>${escapeHtml(tip.category)}</small><strong>${escapeHtml(tip.title)}</strong></div><b>→</b></button>`).join('');
    const tipSelect=$('#tip-select');
    tipSelect.innerHTML=data.tips.map((tip,index)=>`<option value="${index}">${String(index+1).padStart(2,'0')} · ${escapeHtml(tip.title)}</option>`).join('');
    $('.guide-summary').innerHTML=`<span><strong>${data.tips.length}</strong> fiches pratiques</span><span>Installation · exploration · donjons · interface</span><span>Conseils sourcés · bêta Forever</span>`;
    const renderTip=index=>{
      const tip=data.tips[index];guide.setAttribute('aria-labelledby',`guide-tab-${index}`);
      guide.innerHTML=`<div class="guide-content"><span class="guide-kicker">${escapeHtml(tip.category)} · Fiche ${String(index+1).padStart(2,'0')}</span><h2>${escapeHtml(tip.title)}</h2><p class="guide-intro">${escapeHtml(tip.description)}</p><div class="guide-facts">${tip.facts.map((fact,factIndex)=>`<span><small>${['Prévoir','Quand','Repère utile'][factIndex]}</small><b>${escapeHtml(fact)}</b></span>`).join('')}</div>${tipFigure(tip)}<h3 class="guide-subtitle">En pratique</h3><ol class="guide-steps">${tip.steps.map(step=>`<li>${escapeHtml(step)}</li>`).join('')}</ol><aside class="guide-note"><strong>À retenir</strong><span>${escapeHtml(tip.note)}</span></aside><div class="guide-resources"><h3 class="guide-subtitle">Pour aller plus loin</h3><p class="guide-reviewed">Sources consultées le ${escapeHtml(formatDate(tip.verifiedDate))}. Les conseils de préparation sont des recommandations éditoriales ; les possibilités des addons dépendent du client.</p>${sourceLinks(tip.sources)}<div class="guide-links"><a href="/addons/${escapeHtml(tip.relatedAddon)}">Découvrir ${escapeHtml(data.addons.find(addon=>addon.slug===tip.relatedAddon)?.title||'cet addon')} →</a><a class="tip-permalink" href="${typePath(tip)}">Lire le guide complet →</a></div></div></div>`;
      tipSelect.value=String(index);
      $$('[data-tip]',tabList).forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;});
    };
    tabList.addEventListener('click',event=>{const button=event.target.closest('[data-tip]');if(button)renderTip(Number(button.dataset.tip));});
    tipSelect.addEventListener('change',()=>renderTip(Number(tipSelect.value)));
    tabList.addEventListener('keydown',event=>{const button=event.target.closest('[data-tip]');if(!button)return;let index=Number(button.dataset.tip);if(['ArrowDown','ArrowRight'].includes(event.key))index=(index+1)%data.tips.length;else if(['ArrowUp','ArrowLeft'].includes(event.key))index=(index+data.tips.length-1)%data.tips.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=data.tips.length-1;else return;event.preventDefault();renderTip(index);$(`[data-tip="${index}"]`,tabList).focus();});
    renderTip(0);
  }

  $$('.command-group').forEach((group,index)=>{
    if($('details',group))return;
    const header=$('header',group),list=$('.command-list',group);if(!header||!list)return;
    const details=document.createElement('details'),summary=document.createElement('summary');
    summary.innerHTML=`<span>${escapeHtml($('h3',header).textContent)}</span><small>${$$('.command-card',list).length} réglages</small>`;details.open=index===0;details.append(summary,list);header.remove();group.append(details);
  });

  function breadcrumb(item){
    const parent=item.type==='objet'?['Objets RP','/objets']:item.type==='actualite'?['Actualités','/actualites']:item.type==='astuce'?['Astuces','/astuces']:item.type==='commande'||item.type==='preset'?['Commandes','/commandes']:item.type==='depannage'?['Dépannage','/depannage']:['Addons','/addons'];
    return `<nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>›</span><a href="${parent[1]}">${parent[0]}</a><span>›</span><span aria-current="page">${escapeHtml(item.title)}</span></nav>`;
  }
  function listBlock(title,items=[]){
    return items.length?`<section class="detail-block"><h2>${escapeHtml(title)}</h2><ul>${items.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></section>`:'';
  }
  function hasAddonPreview(item){return Boolean(item.image&&item.imageKind==='capture'&&item.slug!=='bug-grabber');}
  function addonPreview(item){
    if(!hasAddonPreview(item))return `<figure class="addon-preview curseforge-placeholder"><img src="/assets/curseforge-logo.svg" alt="Logo CurseForge — aperçu de ${escapeHtml(item.title)} non disponible" width="1000" height="640"><figcaption>Aperçu de cet addon non disponible. <a href="${escapeHtml(item.curseforgeUrl)}" target="_blank" rel="noopener noreferrer">Consulter ${escapeHtml(item.title)} sur CurseForge ↗</a></figcaption></figure>`;
    return `<figure class="addon-preview"><img src="${escapeHtml(item.image)}" alt="Aperçu de ${escapeHtml(item.title)}" width="1000" height="640"><figcaption>${escapeHtml(item.imageCaption||'Capture de la présentation de l’auteur')} · <a href="${escapeHtml(item.imagePage||item.curseforgeUrl)}" target="_blank" rel="noopener noreferrer">Voir cette capture sur CurseForge ↗</a></figcaption></figure>`;
  }
  function renderDetail(item){
    if(item.type==='addon'&&item.addedDate)return `${breadcrumb(item)}<header class="detail-header"><div><span class="chapter">${escapeHtml(item.categories.map(key=>categoryNames[key]).join(' · '))}</span><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.description)}</p></div>${favoriteButton(item)}</header>${addonPreview(item)}${compatibility(item,true)}${communityPanel(item)}<a class="button primary" href="${escapeHtml(item.curseforgeUrl)}" target="_blank" rel="noopener noreferrer">Choisir une version sur CurseForge ↗</a><div class="detail-status">${verified(item)}</div>${item.sourceNote?`<p class="source-note">${escapeHtml(item.sourceNote)}</p>`:''}${listBlock('À savoir',item.warnings)}${sourceLinks(item.sources)}<a class="detail-back" href="/addons">← Tous les addons</a>`;
    return `${breadcrumb(item)}<header class="detail-header"><div><span class="chapter">${escapeHtml(typeLabels[item.type])}</span><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.description)}</p></div>${['addon','astuce','commande','objet'].includes(item.type)?favoriteButton(item):''}</header>
      ${item.type==='addon'?addonPreview(item)+compatibility(item,true)+communityPanel(item):''}
      ${item.type==='astuce'?tipFigure(item):''}
      <div class="detail-status">${item.type==='addon'?(item.status==='beta'?'<span class="status-pill beta">Bêta</span>':''):verified(item)}</div>
      ${item.type==='addon'?`<dl class="fact-grid"><div><dt>Auteur</dt><dd>${escapeHtml(item.author)}</dd></div><div><dt>Version</dt><dd>${escapeHtml(item.version||'Non confirmée')}</dd></div><div><dt>Version du jeu</dt><dd>${escapeHtml(item.gameVersion||'Non confirmée')}</dd></div><div><dt>Test</dt><dd>${item.tested?'Testé':'Non présenté comme totalement testé'}</dd></div></dl>`:''}
      ${item.type==='addon'&&item.bestFor?`<section class="detail-block addon-guidance"><div><h2>Idéal pour</h2><p>${escapeHtml(item.bestFor)}</p></div><div><h2>Conseil de configuration</h2><p>${escapeHtml(item.setupAdvice)}</p></div></section>`:''}
      ${listBlock('Pourquoi l’utiliser ?',item.whyRecommended)}${listBlock('Fonctionnalités',item.features)}${listBlock('Découverte',item.discovery)}
      ${item.commands?.length?`<section class="detail-block"><h2>Commandes</h2>${item.commands.map(command=>`<h3>${escapeHtml(command.label)}</h3>${copyBlock(command.value)}`).join('')}</section>`:''}
      ${item.command?`<section class="detail-block"><h2>Commande</h2>${copyBlock(item.command)}<dl class="fact-grid"><div><dt>Impact FPS</dt><dd>${escapeHtml(item.impact)}</dd></div><div><dt>Valeur par défaut</dt><dd>${escapeHtml(item.defaultValue||'Voir restauration')}</dd></div><div><dt>Revenir en arrière</dt><dd>${escapeHtml(item.restore)}</dd></div></dl></section>`:''}
      ${item.type==='astuce'&&item.facts?.length?`<dl class="fact-grid"><div><dt>Temps</dt><dd>${escapeHtml(item.facts[0])}</dd></div><div><dt>Moment</dt><dd>${escapeHtml(item.facts[1])}</dd></div><div><dt>Outil conseillé</dt><dd>${escapeHtml(item.facts[2])}</dd></div></dl>`:''}
      ${item.steps?.length?listBlock('Procédure pas à pas',item.steps):''}${item.note?`<aside class="detail-note"><strong>À retenir</strong><p>${escapeHtml(item.note)}</p></aside>`:''}${item.impact?.length&&Array.isArray(item.impact)?listBlock('Ce qui change réellement',item.impact):''}
      ${item.commands&&item.type==='preset'?`<section class="detail-block"><h2>Tout copier</h2>${copyBlock(item.commands.join('\n'),'Copier toutes les commandes')}<p>${escapeHtml(item.restore)}</p></section>`:''}
      ${item.type==='objet'?`<dl class="fact-grid"><div><dt>Zone</dt><dd>${escapeHtml(item.zone)}</dd></div><div><dt>Coordonnées</dt><dd>${escapeHtml(item.coordinates||'Non confirmées')}</dd></div><div><dt>Prérequis</dt><dd>${escapeHtml(item.prerequisites)}</dd></div><div><dt>Combat</dt><dd>${escapeHtml(item.combat)}</dd></div><div><dt>Intérieur</dt><dd>${escapeHtml(item.indoors)}</dd></div><div><dt>Durée</dt><dd>${escapeHtml(item.duration)}</dd></div><div><dt>Recharge</dt><dd>${escapeHtml(item.cooldown)}</dd></div><div><dt>Lié au compte</dt><dd>${escapeHtml(item.accountBound)}</dd></div></dl>${item.way?copyBlock(item.way,'Copier /way'):''}${item.macro?copyBlock(item.macro,'Copier la macro de ciblage'):''}<p class="source-note">${escapeHtml(item.notes)}</p>`:''}
      ${item.gallery?.length?`<section class="detail-block"><h2>Repères en images</h2><div class="item-gallery">${item.gallery.map(image=>`<figure><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async"><figcaption>${escapeHtml(image.caption)}</figcaption></figure>`).join('')}</div><p class="image-credit">Captures : <a href="https://www.mamytwink.com/guides/wow-forever-guide-dobtention-du-jouet-torche-du-guetteur-de-nuit" target="_blank" rel="noopener noreferrer">Mamytwink / Melody ↗</a></p></section>`:''}
      ${listBlock('À savoir',item.warnings)}${tagList(item.tags)}<section class="detail-block"><h2>Sources</h2>${sourceLinks(item.sources)}</section>`;
  }
  function renderFavorites(){
    const container=$('#route-content');if(!container)return;
    const items=data.all.filter(item=>favorites.has(favoriteId(item)));
    container.innerHTML=`<nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>›</span><span aria-current="page">Favoris</span></nav><header class="detail-header"><div><span class="chapter">Collection locale</span><h1>Mes favoris</h1><p>Conservés uniquement dans ce navigateur, sans compte.</p></div></header>${items.length?`<div class="content-grid">${items.map(item=>`<article class="content-card"><div class="addon-top"><span>${escapeHtml(typeLabels[item.type])}</span>${favoriteButton(item)}</div><h2><a href="${typePath(item)}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.description)}</p></article>`).join('')}</div><button id="clear-all-favorites" class="button ghost">Tout effacer</button>`:'<div class="empty-state"><h2>Aucun favori</h2><p>Utilisez l’étoile sur une fiche pour la retrouver ici.</p></div>'}`;
    $('#clear-all-favorites')?.addEventListener('click',()=>{if(confirm('Effacer tous les favoris de ce navigateur ?')){favorites.clear();persistFavorites();renderFavorites();}});
  }
  function renderStaticPage(pathname){
    const pages={
      '/sources':['Sources','Chaque fiche technique affiche ses sources. Les données officielles, CurseForge et les observations communautaires sont clairement distinguées.'],
      '/confidentialite':['Confidentialité','Renaissance ne crée aucun compte, n’ajoute aucun tracker, aucune publicité ciblée et aucun cookie marketing. Les favoris et préférences restent dans votre navigateur. Un cookie fonctionnel anonyme, codex-voter, valable un an, permet de modifier ou annuler vos votes. Le serveur conserve uniquement son empreinte, l’addon, le choix du vote et sa date ; les adresses IP ne sont pas enregistrées dans la base des votes. Effacer ce cookie fait perdre l’accès à vos anciens votes. Le compteur en ligne conserve seulement des connexions temporaires en mémoire. Les signalements publiés sur GitHub sont publics et soumis aux règles de GitHub.'],
      '/a-propos':['À propos','Renaissance est un codex français indépendant tenu pour aider les joueurs de WoW: Forever. Il n’est ni affilié à Blizzard Entertainment ni à CurseForge.'],
      '/contribuer':['Contribuer','Vous pouvez signaler un addon cassé, proposer une commande ou corriger une information avec une issue GitHub préremplie.']
    };
    const page=pages[pathname];if(!page)return false;
    $('#route-content').innerHTML=`<nav class="breadcrumb"><a href="/">Accueil</a><span>›</span><span aria-current="page">${page[0]}</span></nav><header class="detail-header"><div><span class="chapter">Renaissance</span><h1>${page[0]}</h1><p>${page[1]}</p></div></header>${pathname==='/contribuer'?'<a class="button primary" href="https://github.com/Nyaru01/WoW/issues/new?title=%5BRenaissance%5D%20Proposition" target="_blank" rel="noopener noreferrer">Ouvrir une issue GitHub ↗</a>':''}`;
    return true;
  }
  function showRoute(){
    const pathname=location.pathname.replace(/\/$/,'')||'/';
    const routeView=$('#route-view');
    const homeOnly=[$('.hero'),$('.discovery'),$('.essentials')].filter(Boolean);
    const sections=$$('main > section[id]:not(#route-view)');
    routeView.hidden=true;document.body.classList.remove('chapter-view');
    homeOnly.forEach(section=>section.hidden=pathname!=='/');
    sections.forEach(section=>{if(!homeOnly.includes(section))section.hidden=true;});
    const hashMap={addons:'addons',astuces:'astuces',commandes:'commandes','objets-rp':'objets-rp',nouvelles:'nouvelles',depannage:'depannage'};
    const pathMap={'/addons':'addons','/astuces':'astuces','/commandes':'commandes','/depannage':'depannage','/objets':'objets-rp','/actualites':'nouvelles'};
    const legacy=pathname==='/'&&hashMap[location.hash.slice(1)];
    const chapter=legacy||pathMap[pathname];
    const sectionPaths={addons:'/addons',astuces:'/astuces',commandes:'/commandes',depannage:'/depannage','objets-rp':'/objets',nouvelles:'/actualites'};
    const activePath=legacy?sectionPaths[legacy]:pathname==='/'?'/':'/'+pathname.split('/')[1];
    document.querySelectorAll('#main-navigation a').forEach(link=>{
      if(link.getAttribute('href')===activePath)link.setAttribute('aria-current',pathname===activePath&&!legacy?'page':'location');
      else link.removeAttribute('aria-current');
    });
    if(chapter){
      homeOnly.forEach(section=>section.hidden=true);
      const section=document.getElementById(chapter);if(section)section.hidden=false;
      document.body.classList.add('chapter-view','route-ready');return;
    }
    if(pathname==='/'){document.body.classList.add('route-ready');return;}
    homeOnly.forEach(section=>section.hidden=true);
    routeView.hidden=false;document.body.classList.add('chapter-view');
    document.body.classList.add('route-ready');
    if(pathname==='/favoris')return renderFavorites();
    if(pathname==='/commandes/presets'){
      $('#route-content').innerHTML=`<nav class="breadcrumb"><a href="/">Accueil</a><span>›</span><a href="/commandes">Commandes</a><span>›</span><span aria-current="page">Presets</span></nav><header class="detail-header"><div><span class="chapter">Réglages groupés</span><h1>Presets graphiques</h1><p>Uniquement des CVars documentées, avec avertissement lorsque la valeur d’origine n’est pas confirmée.</p></div></header><div class="content-grid preset-grid">${data.presets.map(item=>`<article class="content-card" id="${item.slug}"><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.description)}</p>${copyBlock(item.commands.join('\n'),'Copier toutes les commandes')}<small>${escapeHtml(item.restore)}</small></article>`).join('')}</div>`;return;
    }
    const item=data.all.find(candidate=>typePath(candidate).split('#')[0]===pathname);
    if(item){$('#route-content').innerHTML=renderDetail(item);refreshFavoriteButtons();return;}
    renderStaticPage(pathname);
  }
  showRoute();
  addEventListener('hashchange',showRoute);

  const topbar=$('.topbar'),menuToggle=$('.menu-toggle'),mainNavigation=$('#main-navigation');
  const closeMenu=()=>{topbar?.classList.remove('menu-open');menuToggle?.setAttribute('aria-expanded','false');};
  menuToggle?.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));topbar.classList.toggle('menu-open',open);});
  mainNavigation?.addEventListener('click',closeMenu);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){closeMenu();if(globalResults)globalResults.hidden=true;}
    if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.target.closest('input,textarea,select,[contenteditable]')){
      event.preventDefault();(location.pathname==='/'?globalInput:addonSearch)?.focus();
    }
  });
  const progress=$('.scroll-progress i');
  addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=`${max?scrollY/max*100:0}%`;topbar?.classList.toggle('scrolled',scrollY>30);},{passive:true});
  const motionMedia=matchMedia('(prefers-reduced-motion: reduce)');
  const presenceCount=$('#presence-count');
  if(presenceCount&&'EventSource' in window){
    const presence=new EventSource('/api/presence');
    presence.onmessage=event=>{try{const count=JSON.parse(event.data).count;presenceCount.textContent=String(count);presenceCount.parentElement.setAttribute('aria-label',`${count} visiteur${count>1?'s':''} en ligne`);}catch{}};
    presence.onerror=()=>{presenceCount.textContent='—';};
  }
  const revealSelector='.discovery-card,.essential-card,.addon-card,.content-card,.command-card,.news-card,.rp-feature,.rp-secondary';
  if(!motionMedia.matches&&'IntersectionObserver' in window){
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');revealObserver.unobserve(entry.target);}}),{rootMargin:'0px 0px -8%'});
    const observeReveals=root=>{
      const elements=[];
      if(root.matches?.(revealSelector)&&!root.classList.contains('reveal'))elements.push(root);
      elements.push(...$$(`${revealSelector}:not(.reveal)`,root));
      elements.forEach(element=>{element.classList.add('reveal');revealObserver.observe(element);});
    };
    observeReveals(document);
    new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)observeReveals(node);}))).observe($('main'),{childList:true,subtree:true});
  }
  const featured=data.news[0];
  if(featured){const title=$('#featured-patch-title'),summary=$('#featured-patch-summary'),date=$('#featured-patch-date');if(title)title.textContent=featured.title;if(summary)summary.textContent=featured.description;if(date){date.textContent=formatDate(featured.verifiedDate);date.dateTime=featured.verifiedDate;}}
  fetch('/api/community',{signal:AbortSignal.timeout(10000)}).then(async response=>{const result=await response.json();community=response.ok?result:{enabled:false,addons:{}};}).catch(()=>{community={enabled:false,addons:{}};}).finally(()=>{communityLoaded=true;refreshVotes();if(addonSort?.value==='rating')renderAddons();});
  refreshFavoriteButtons();
})();
