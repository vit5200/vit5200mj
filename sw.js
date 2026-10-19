const C='mj-v24',F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./maskable-512.png','https://cdn.tailwindcss.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{mode:u.startsWith('http')?'no-cors':'same-origin'}).then(r=>c.put(u,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
const keep=(req,res)=>{const cp=res.clone();caches.open(C).then(c=>c.put(req,cp));return res};
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const same=new URL(e.request.url).origin===location.origin;
  e.respondWith(same
    ?fetch(e.request).then(r=>keep(e.request,r)).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html')))
    :caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>keep(e.request,res))));
});
