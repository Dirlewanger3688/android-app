const C='plan-v1',F=['./','index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
self.addEventListener('notificationclick',e=>{e.notification.close();const a=e.action||'O',id=e.notification.data;
e.waitUntil(clients.matchAll({type:'window'}).then(cs=>{if(cs.length){cs[0].focus();if(a!='O')cs[0].postMessage({a,id})}else clients.openWindow('./'+(a!='O'?'?a='+a+'&id='+id:''))}))});
