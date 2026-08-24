/* Langue de l'accueil DicoCheval : les aperçus et leurs actions changent entièrement. */
(() => {
  const select=document.getElementById('languageHero');
  if(!select)return;
  const saved=localStorage.getItem('dicochevalLanguage')||localStorage.getItem('dicopetsLanguage')||'fr';
  select.value=saved;
  const previews=[
    ['Carte des races','Breed map','Explore les pays et les races sur une véritable page interactive.','Explore countries and breeds on an interactive map.','Voir la rubrique →','View section →','Le monde','The world'],
    ['Races équines','Horse breeds','Chevaux, poneys, filtres et fiches détaillées : tout est dans une page dédiée.','Horses, ponies, filters and detailed profiles on a dedicated page.','Voir la rubrique →','View section →','Chevaux et poneys','Horses and ponies'],
    ['Mon cheval idéal','My ideal horse','Réponds au questionnaire complet dans une vraie page dédiée.','Answer the full questionnaire on its own page.','Voir la rubrique →','View section →','Trouver son partenaire','Find your match'],
    ['Comparer et comprendre','Compare and understand','Compare deux races, prépare une adoption et découvre les signaux du cheval à observer.','Compare two breeds, prepare for adoption and learn to read horse signals.','Voir la rubrique →','View section →','Mieux connaître','Learn more'],
    ['Équipement du cheval','Horse equipment','Photos et explications des équipements classique et western.','Photos and explanations for English and Western equipment.','Voir la rubrique →','View section →','Bien s’équiper','Choose equipment'],
    ['Équipement de la cavalière','Rider equipment','Tenues classique et western, avec les éléments importants.','English and Western riding outfits, with the important equipment.','Voir la rubrique →','View section →','Monter en sécurité','Ride safely']
  ];
  function apply(){
    const en=select.value==='en';
    document.querySelectorAll('.home-preview').forEach((card,index)=>{
      const item=previews[index];if(!item)return;
      const heading=card.querySelector('h2'),copy=card.querySelector('p:not(.preview-kicker)'),action=card.querySelector('a'),kicker=card.querySelector('.preview-kicker'),note=card.querySelector('.preview-note');
      if(heading)heading.textContent=en?item[1]:item[0];
      if(copy)copy.textContent=en?item[3]:item[2];
      if(action)action.textContent=en?item[5]:item[4];
      if(kicker)kicker.textContent=en?'Discover':'À découvrir';
      if(note)note.textContent=en?item[7]:item[6];
    });
  }
  apply();
  select.addEventListener('change',()=>{localStorage.setItem('dicochevalLanguage',select.value);localStorage.setItem('dicopetsLanguage',select.value);localStorage.setItem('dicochevalLocale',select.value==='en'?'en-US':'fr-FR');window.location.reload()});
})();
