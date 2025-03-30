import{S as w,a as q,i as o}from"./assets/vendor-mj6yH6lW.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const p=document.querySelector(".gallery");let S=new w(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function x(){p.innerHTML=""}function g(t,s=!0){s&&x();const r=t.map(({webformatURL:i,largeImageURL:e,tags:a,likes:n,views:b,comments:L,downloads:v})=>`
      <li class="gallery-item">
        <a href="${e}" class="gallery-link">
          <img src="${i}" alt="${a}" class="gallery-image" />
        </a>
        <div class="info">
        <ul class="baner">
          <li class="baner-li">
            <p class="baner-title">Likes</p>
            <p class="baner-text">${n}</p>
          </li>
          <li class="baner-li">
            <p class="baner-title">Views</p>
            <p class="baner-text">${b}</p>
          </li>
          <li class="baner-li">
            <p class="baner-title">Comments</p>
            <p class="baner-text">${L}</p>
          </li>
          <li class="baner-li">
            <p class="baner-title">Downloads</p>
            <p class="baner-text">${v}</p>
          </li>
        </ul>
        </div>
      </li>`).join("");p.insertAdjacentHTML("beforeend",r),S.refresh()}const E="49390436-eaa1c4fe3003ec0e1553f6322",O="https://pixabay.com/api/";async function h(t,s=15,r=1){try{return(await q.get(O,{params:{key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:r}})).data}catch(i){throw console.error("Error fetching images:",i),i}}const f=document.querySelector("form"),$=document.querySelector(".gallery"),d=document.querySelector(".loader"),l=document.querySelector(".load-more-btn");let u=15,c=1,m,y;l.classList.add("hidden");o.settings({position:"topRight"});f.addEventListener("submit",async t=>{t.preventDefault();const s=t.target.elements["search-text"].value.trim();if(!s){o.error({title:"Error",message:"Please enter a search query!"});return}s!==m&&(m=s,c=1),$.innerHTML="",d.classList.add("visible"),l.classList.add("hidden");try{const r=await h(s,u,c);y=r.totalHits,r.hits.length===0?o.warning({title:"Oops!",message:"No images found. Try again!"}):(g(r.hits),r.hits.length===u&&l.classList.remove("hidden"))}catch{o.error({title:"Error",message:"Failed to fetch images. Try again later!"})}finally{d.classList.remove("visible"),f.reset()}});l.addEventListener("click",async()=>{l.classList.add("hidden"),d.classList.add("visible"),c+=1;try{const t=await h(m,u,c);t.hits.length>0&&(g(t.hits,!1),P(".gallery-item",3)),c*u>=y?(l.classList.add("hidden"),o.info({message:"No more images to load!"})):l.classList.remove("hidden")}catch(t){o.error({message:t.message})}finally{d.classList.remove("visible")}});function P(t,s){const r=document.querySelector(t);if(r){const i=r.getBoundingClientRect().height;window.scrollBy({top:i*s,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
