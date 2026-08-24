/* Les navigateurs modernes gèrent les clics tactiles nativement.
   On évite de recréer un clic en JavaScript : cela pouvait bloquer certains boutons sur iPad. */
(()=>{'use strict';
  const style=document.createElement('style');
  style.textContent='button,a,[role="button"],select,input{touch-action:manipulation;-webkit-tap-highlight-color:transparent}button,a,[role="button"]{cursor:pointer}';
  document.head.appendChild(style);
})();
