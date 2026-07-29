// ForgeAI enhancements
(function(){try{var els=document.querySelectorAll('section,.card,.feature,.testimonial');if(!els.length||!('IntersectionObserver'in window))return;els.forEach(function(el){el.classList.add('fa-reveal')});var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('fa-in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(el){io.observe(el)})}catch(e){}})();

/* Mobile menu (any markup) */
(function(){
  function setup(){
    var hdr = document.querySelector('header, .header, .site-header, .navbar, .top, .main-header');
    if (!hdr || hdr.querySelector('.fa-burger')) return;
    var menu = hdr.querySelector('nav ul, nav, .nav-links');
    if (!menu) {
      var best = null, bestN = 0;
      hdr.querySelectorAll('ul').forEach(function(ul){
        var n = ul.querySelectorAll('a').length; if (n > bestN) { bestN = n; best = ul; }
      });
      if (bestN >= 3) menu = best;
    }
    if (!menu) return;
    menu.classList.add('fa-mobile-menu');
    hdr.classList.add('fa-has-menu');
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'fa-burger'; btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    btn.addEventListener('click', function(){ menu.classList.toggle('fa-open'); });
    menu.addEventListener('click', function(e){
      if (e.target && e.target.closest && e.target.closest('a')) menu.classList.remove('fa-open');
    });
    hdr.appendChild(btn);
  }
  if (document.readyState !== 'loading') setup(); else document.addEventListener('DOMContentLoaded', setup);
  try { new MutationObserver(setup).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
})();

/* Mobile hamburger nav */
(function(){
  function enhance(){
    var navs = document.querySelectorAll('header nav, .site-header nav, .navbar nav, header .nav-links');
    for (var i = 0; i < navs.length; i++) {
      var nav = navs[i];
      var header = nav.closest('header, .site-header, .navbar, .main-header') || nav.parentElement;
      if (!header || header.querySelector('.nav-toggle')) continue;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'nav-toggle'; btn.setAttribute('aria-label', 'Toggle menu');
      btn.innerHTML = '<span></span><span></span><span></span>';
      (function(nav){
        btn.addEventListener('click', function(){ nav.classList.toggle('nav-open'); });
        nav.addEventListener('click', function(e){ if (e.target && e.target.closest && e.target.closest('a')) nav.classList.remove('nav-open'); });
      })(nav);
      // Insert into the nav's own flex row (with the brand) so it sits level with
      // the logo — not appended to the outer <header> where it drops to a new line.
      (nav.parentElement || header).appendChild(btn);
    }
  }
  if (document.readyState !== 'loading') enhance(); else document.addEventListener('DOMContentLoaded', enhance);
  try { new MutationObserver(enhance).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
})();
