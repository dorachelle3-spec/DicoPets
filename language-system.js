/* Langue fiable : la page repart toujours de son contenu d'origine, jamais d'un mélange. */
(()=>{
  const lang=document.getElementById('languageHero');
  if(!lang)return;
  const saved=localStorage.getItem('dicochevalLanguage')||'fr';
  lang.value=saved;
  const text=(sel,fr,en)=>document.querySelectorAll(sel).forEach(el=>el.textContent=saved==='en'?en:fr);
  text('.home-preview h2','Carte des races','Breed map');
  const previews=[['Carte des races','Explore countries and breeds on an interactive map.','Voir Carte des races →','View breed map →'],['Races équines','Horses, ponies, filters and detailed profiles: everything is on a dedicated page.','Voir Races équines →','View horse breeds →'],['Mon cheval idéal','Answer the full questionnaire on its own page.','Voir Mon cheval idéal →','View my ideal horse →'],['Équipement du cheval','Photos and explanations for English and Western equipment.','Voir Équipement du cheval →','View horse equipment →'],['Équipement de la cavalière','English and Western outfits, with the important elements.','Voir Équipement de la cavalière →','View rider equipment →']];
  document.querySelectorAll('.home-preview').forEach((card,i)=>{const p=previews[i];if(!p)return;const en=saved==='en';const h=card.querySelector('h2'),copy=card.querySelector('p:not(.preview-kicker)'),a=card.querySelector('a');if(h)h.textContent=en?['Breed map','Horse breeds','My ideal horse','Horse equipment','Rider equipment'][i]:p[0];if(copy)copy.textContent=en?p[1]:['Explore les pays et les races sur une véritable page interactive.','Chevaux, poneys, filtres et fiches détaillées : tout est dans une page dédiée.','Réponds au questionnaire complet dans une vraie page dédiée.','Photos et explications des équipements classique et western.','Tenues classique et western, avec les éléments importants.'][i];if(a)a.textContent=en?p[3]:p[2]});
  lang.addEventListener('change',()=>{localStorage.setItem('dicochevalLanguage',lang.value);localStorage.setItem('dicochevalLocale',lang.value==='en'?'en-US':'fr-FR');window.location.reload()});
})();