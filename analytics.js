(function(){
  const COUNTER=111889785;
  const KEY="analytics_consent_v2";
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
    const choice=localStorage.getItem(KEY);
    if(choice==="accepted"){loadMetrika(); bind(); return;}
    if(choice==="rejected") return;
    const box=document.createElement("div");
    box.id="cookie"; box.className="cookie";
    box.setAttribute("role","region"); box.setAttribute("aria-label","Настройки аналитики");
    box.innerHTML='<span>Яндекс Метрика помогает оценивать работу сайта. Она включается только после вашего согласия. Вы можете отказаться. Подробнее — в <a href="/privacy.html" style="color:#4f7fd8">Политике конфиденциальности</a>.</span><div class="cookie-actions" style="display:flex;gap:8px;flex-shrink:0"><button type="button" data-consent="reject" style="border:1px solid #cbd5e1;background:#fff;color:#25324a;border-radius:12px;padding:11px 13px;font-weight:800;cursor:pointer;white-space:nowrap">Не согласен</button><button type="button" data-consent="accept" style="border:0;background:#4f7fd8;color:#fff;border-radius:12px;padding:11px 15px;font-weight:800;cursor:pointer;white-space:nowrap">Согласен</button></div>';
    document.body.appendChild(box);
    box.querySelector('[data-consent="accept"]').addEventListener("click",()=>{localStorage.setItem(KEY,"accepted");box.remove();loadMetrika();bind();});
    box.querySelector('[data-consent="reject"]').addEventListener("click",()=>{localStorage.setItem(KEY,"rejected");box.remove();});
  }
  document.addEventListener("DOMContentLoaded",()=>{banner();});
})();