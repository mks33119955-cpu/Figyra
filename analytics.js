(function(){
  const COUNTER=111889785;
  const KEY="cookie_ok";
  function loadMetrika(){
    if(window.__ymLoaded)return; window.__ymLoaded=true;
    window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};
    window.ym.l=+new Date;
    const s=document.createElement("script"); s.async=true; s.src="https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(s);
    ym(COUNTER,"init",{webvisor:true,clickmap:true,trackLinks:true,accurateTrackBounce:true,trackHash:true});
    setTimeout(trackPageGoal,300);
  }
  function goal(id){ if(typeof ym==="function") ym(COUNTER,"reachGoal",id); }
  function trackPageGoal(){
    const p=location.pathname;
    const map={
      "/apparatnyy-massazh.html":"view_service",
      "/apparatnaya-korrekciya-figury.html":"view_service",
      "/ceny.html":"view_prices",
      "/programmy.html":"view_programs",
      "/pervyy-vizit.html":"view_first_visit",
      "/faq.html":"view_faq"
    };
    if(map[p]) goal(map[p]);
  }
  function bind(){
    document.querySelectorAll("[data-track]").forEach(a=>a.addEventListener("click",()=>goal(a.dataset.track),{passive:true}));
    document.querySelectorAll('a[href*="dikidi.ru"]').forEach(a=>{
      if(!a.dataset.track) a.addEventListener("click",()=>goal("booking_dikidi"),{passive:true});
    });
    document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
      if(!a.dataset.track) a.addEventListener("click",()=>goal("booking_phone"),{passive:true});
    });
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a=>{
      if(!a.dataset.track) a.addEventListener("click",()=>goal("booking_whatsapp"),{passive:true});
    });
  }
  function banner(){
    if(localStorage.getItem(KEY)==="1"){loadMetrika(); bind(); return;}
    const box=document.createElement("div");
    box.id="cookie"; box.className="cookie";
    box.innerHTML='<span>Сайт использует технические cookies. Аналитика включается после вашего согласия. Подробнее — в <a href="/privacy.html" style="color:#4f7fd8">Политике конфиденциальности</a>.</span><button style="border:0;background:#4f7fd8;color:#fff;border-radius:12px;padding:11px 17px;font-weight:800;cursor:pointer;white-space:nowrap">Понятно</button>';
    document.body.appendChild(box);
    box.querySelector("button").addEventListener("click",()=>{localStorage.setItem(KEY,"1");box.remove();loadMetrika();bind();});
  }
  document.addEventListener("DOMContentLoaded",()=>{banner();});
})();