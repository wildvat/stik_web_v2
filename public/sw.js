(()=>{var m={baseURL:"/clientes/stik_web/",caches:null,debug:null,langs:[],offline_image:"",precaches:[]};try{self["workbox:core:7.0.0"]&&_()}catch(r){}var we=(r,...e)=>{let t=r;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t};var oe=we;var u=class extends Error{constructor(t,o){let s=oe(t,o);super(s);this.name=t,this.details=o}};var G=r=>new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),"");try{self["workbox:cacheable-response:7.0.0"]&&_()}catch(r){}var T=class{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(o=>e.headers.get(o)===this._headers[o])),t}};var N=class{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null;this._cacheableResponse=new T(e)}};function V(r){r.then(()=>{})}var se=(r,e)=>e.some(t=>r instanceof t);var ne,ae;function Be(){return ne||(ne=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Se(){return ae||(ae=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var ie=new WeakMap,J=new WeakMap,ce=new WeakMap,Q=new WeakMap,z=new WeakMap;function Ee(r){let e=new Promise((t,o)=>{let s=()=>{r.removeEventListener("success",a),r.removeEventListener("error",n)},a=()=>{t(p(r.result)),s()},n=()=>{o(r.error),s()};r.addEventListener("success",a),r.addEventListener("error",n)});return e.then(t=>{t instanceof IDBCursor&&ie.set(t,r)}).catch(()=>{}),z.set(e,r),e}function Re(r){if(J.has(r))return;let e=new Promise((t,o)=>{let s=()=>{r.removeEventListener("complete",a),r.removeEventListener("error",n),r.removeEventListener("abort",n)},a=()=>{t(),s()},n=()=>{o(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",a),r.addEventListener("error",n),r.addEventListener("abort",n)});J.set(r,e)}var Y={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return J.get(r);if(e==="objectStoreNames")return r.objectStoreNames||ce.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return p(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function ue(r){Y=r(Y)}function Ie(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let o=r.call(K(this),e,...t);return ce.set(o,e.sort?e.sort():[e]),p(o)}:Se().includes(r)?function(...e){return r.apply(K(this),e),p(ie.get(this))}:function(...e){return p(r.apply(K(this),e))}}function ke(r){return typeof r=="function"?Ie(r):(r instanceof IDBTransaction&&Re(r),se(r,Be())?new Proxy(r,Y):r)}function p(r){if(r instanceof IDBRequest)return Ee(r);if(Q.has(r))return Q.get(r);let e=ke(r);return e!==r&&(Q.set(r,e),z.set(e,r)),e}var K=r=>z.get(r);function le(r,e,{blocked:t,upgrade:o,blocking:s,terminated:a}={}){let n=indexedDB.open(r,e),i=p(n);return o&&n.addEventListener("upgradeneeded",c=>{o(p(n.result),c.oldVersion,c.newVersion,p(n.transaction),c)}),t&&n.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),i.then(c=>{a&&c.addEventListener("close",()=>a()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),i}function de(r,{blocked:e}={}){let t=indexedDB.deleteDatabase(r);return e&&t.addEventListener("blocked",o=>e(o.oldVersion,o)),p(t).then(()=>{})}var ve=["get","getKey","getAll","getAllKeys","count"],Pe=["put","add","delete","clear"],X=new Map;function me(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(X.get(e))return X.get(e);let t=e.replace(/FromIndex$/,""),o=e!==t,s=Pe.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!(s||ve.includes(t)))return;let a=async function(n,...i){let c=this.transaction(n,s?"readwrite":"readonly"),l=c.store;return o&&(l=l.index(i.shift())),(await Promise.all([l[t](...i),s&&c.done]))[0]};return X.set(e,a),a}ue(r=>({...r,get:(e,t,o)=>me(e,t)||r.get(e,t,o),has:(e,t)=>!!me(e,t)||r.has(e,t)}));try{self["workbox:expiration:7.0.0"]&&_()}catch(r){}var Ce="workbox-expiration",w="cache-entries",pe=r=>{let e=new URL(r,location.href);return e.hash="",e.href},L=class{constructor(e){this._db=null;this._cacheName=e}_upgradeDb(e){let t=e.createObjectStore(w,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&de(this._cacheName)}async setTimestamp(e,t){e=pe(e);let o={url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)},a=(await this.getDb()).transaction(w,"readwrite",{durability:"relaxed"});await a.store.put(o),await a.done}async getTimestamp(e){let o=await(await this.getDb()).get(w,this._getId(e));return o==null?void 0:o.timestamp}async expireEntries(e,t){let o=await this.getDb(),s=await o.transaction(w).store.index("timestamp").openCursor(null,"prev"),a=[],n=0;for(;s;){let c=s.value;c.cacheName===this._cacheName&&(e&&c.timestamp<e||t&&n>=t?a.push(s.value):n++),s=await s.continue()}let i=[];for(let c of a)await o.delete(w,c.id),i.push(c.url);return i}_getId(e){return this._cacheName+"|"+pe(e)}async getDb(){return this._db||(this._db=await le(Ce,1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}};var B=class{constructor(e,t={}){this._isRunning=!1;this._rerunRequested=!1;this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new L(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;let e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),o=await self.caches.open(this._cacheName);for(let s of t)await o.delete(s,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,V(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){let t=await this._timestampModel.getTimestamp(e),o=Date.now()-this._maxAgeSeconds*1e3;return t!==void 0?t<o:!0}else return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}};var y={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration!="undefined"?registration.scope:""},Z=r=>[y.prefix,r,y.suffix].filter(e=>e&&e.length>0).join("-"),_e=r=>{for(let e of Object.keys(y))r(e)},$={updateDetails:r=>{_e(e=>{typeof r[e]=="string"&&(y[e]=r[e])})},getGoogleAnalyticsName:r=>r||Z(y.googleAnalytics),getPrecacheName:r=>r||Z(y.precache),getPrefix:()=>y.prefix,getRuntimeName:r=>r||Z(y.runtime),getSuffix:()=>y.suffix};var A=new Set;function he(r){A.add(r)}var S=class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:o,cachedResponse:s})=>{if(!s)return null;let a=this._isResponseDateFresh(s),n=this._getCacheExpiration(o);V(n.expireEntries());let i=n.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(c){}return a?s:null};this.cacheDidUpdate=async({cacheName:e,request:t})=>{let o=this._getCacheExpiration(e);await o.updateTimestamp(t.url),await o.expireEntries()};this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&he(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===$.getRuntimeName())throw new u("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new B(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;let t=this._getDateHeaderTimestamp(e);if(t===null)return!0;let o=Date.now();return t>=o-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;let t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(let[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}};try{self["workbox:routing:7.0.0"]&&_()}catch(r){}var U="GET";var x=r=>r&&typeof r=="object"?r:{handle:r};var f=class{constructor(e,t,o=U){this.handler=x(t),this.match=e,this.method=o}setCatchHandler(e){this.catchHandler=x(e)}};var E=class extends f{constructor(e,t,o){let s=({url:a})=>{let n=e.exec(a.href);if(n&&!(a.origin!==location.origin&&n.index!==0))return n.slice(1)};super(s,t,o)}};var R=class{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,o=this.handleRequest({request:t,event:e});o&&e.respondWith(o)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){let{payload:t}=e.data,o=Promise.all(t.urlsToCache.map(s=>{typeof s=="string"&&(s=[s]);let a=new Request(...s);return this.handleRequest({request:a,event:e})}));e.waitUntil(o),e.ports&&e.ports[0]&&o.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let o=new URL(e.url,location.href);if(!o.protocol.startsWith("http"))return;let s=o.origin===location.origin,{params:a,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:s,url:o}),i=n&&n.handler,c=[],l=e.method;if(!i&&this._defaultHandlerMap.has(l)&&(i=this._defaultHandlerMap.get(l)),!i)return;let h;try{h=i.handle({url:o,request:e,event:t,params:a})}catch(b){h=Promise.reject(b)}let g=n&&n.catchHandler;return h instanceof Promise&&(this._catchHandler||g)&&(h=h.catch(async b=>{if(g)try{return await g.handle({url:o,request:e,event:t,params:a})}catch(re){re instanceof Error&&(b=re)}if(this._catchHandler)return this._catchHandler.handle({url:o,request:e,event:t});throw b})),h}findMatchingRoute({url:e,sameOrigin:t,request:o,event:s}){let a=this._routes.get(o.method)||[];for(let n of a){let i,c=n.match({url:e,sameOrigin:t,request:o,event:s});if(c)return i=c,(Array.isArray(i)&&i.length===0||c.constructor===Object&&Object.keys(c).length===0||typeof c=="boolean")&&(i=void 0),{route:n,params:i}}return{}}setDefaultHandler(e,t=U){this._defaultHandlerMap.set(t,x(e))}setCatchHandler(e){this._catchHandler=x(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new u("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new u("unregister-route-route-not-registered")}};var I,k=()=>(I||(I=new R,I.addFetchListener(),I.addCacheListener()),I);function v(r,e,t){let o;if(typeof r=="string"){let a=new URL(r,location.href),n=({url:i})=>i.href===a.href;o=new f(n,e,t)}else if(r instanceof RegExp)o=new E(r,e,t);else if(typeof r=="function")o=new f(r,e,t);else if(r instanceof f)o=r;else throw new u("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return k().registerRoute(o),o}function ee(r){k().setCatchHandler(r)}function ge(r,e){let t=new URL(r);for(let o of e)t.searchParams.delete(o);return t.href}async function fe(r,e,t,o){let s=ge(e.url,t);if(e.url===s)return r.match(e,o);let a={...o,ignoreSearch:!0},n=await r.keys(e,a);for(let i of n){let c=ge(i.url,t);if(s===c)return r.match(i,o)}}var H=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};async function ye(){for(let r of A)await r()}function W(r){return new Promise(e=>setTimeout(e,r))}try{self["workbox:strategies:7.0.0"]&&_()}catch(r){}function F(r){return typeof r=="string"?new Request(r):r}var P=class{constructor(e,t){this._cacheKeys={};Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new H,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(let o of this._plugins)this._pluginStateMap.set(o,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,o=F(e);if(o.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){let n=await t.preloadResponse;if(n)return n}let s=this.hasCallback("fetchDidFail")?o.clone():null;try{for(let n of this.iterateCallbacks("requestWillFetch"))o=await n({request:o.clone(),event:t})}catch(n){if(n instanceof Error)throw new u("plugin-error-request-will-fetch",{thrownErrorMessage:n.message})}let a=o.clone();try{let n;n=await fetch(o,o.mode==="navigate"?void 0:this._strategy.fetchOptions);for(let i of this.iterateCallbacks("fetchDidSucceed"))n=await i({event:t,request:a,response:n});return n}catch(n){throw s&&await this.runCallbacks("fetchDidFail",{error:n,event:t,originalRequest:s.clone(),request:a.clone()}),n}}async fetchAndCachePut(e){let t=await this.fetch(e),o=t.clone();return this.waitUntil(this.cachePut(e,o)),t}async cacheMatch(e){let t=F(e),o,{cacheName:s,matchOptions:a}=this._strategy,n=await this.getCacheKey(t,"read"),i={...a,cacheName:s};o=await caches.match(n,i);for(let c of this.iterateCallbacks("cachedResponseWillBeUsed"))o=await c({cacheName:s,matchOptions:a,cachedResponse:o,request:n,event:this.event})||void 0;return o}async cachePut(e,t){let o=F(e);await W(0);let s=await this.getCacheKey(o,"write");if(!t)throw new u("cache-put-with-no-response",{url:G(s.url)});let a=await this._ensureResponseSafeToCache(t);if(!a)return!1;let{cacheName:n,matchOptions:i}=this._strategy,c=await self.caches.open(n),l=this.hasCallback("cacheDidUpdate"),h=l?await fe(c,s.clone(),["__WB_REVISION__"],i):null;try{await c.put(s,l?a.clone():a)}catch(g){if(g instanceof Error)throw g.name==="QuotaExceededError"&&await ye(),g}for(let g of this.iterateCallbacks("cacheDidUpdate"))await g({cacheName:n,oldResponse:h,newResponse:a.clone(),request:s,event:this.event});return!0}async getCacheKey(e,t){let o=`${e.url} | ${t}`;if(!this._cacheKeys[o]){let s=e;for(let a of this.iterateCallbacks("cacheKeyWillBeUsed"))s=F(await a({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[o]=s}return this._cacheKeys[o]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let o of this.iterateCallbacks(e))await o(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if(typeof t[e]=="function"){let o=this._pluginStateMap.get(t);yield a=>{let n={...a,state:o};return t[e](n)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,o=!1;for(let s of this.iterateCallbacks("cacheWillUpdate"))if(t=await s({request:this.request,response:t,event:this.event})||void 0,o=!0,!t)break;return o||t&&t.status!==200&&(t=void 0),t}};var d=class{constructor(e={}){this.cacheName=$.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,o=typeof e.request=="string"?new Request(e.request):e.request,s="params"in e?e.params:void 0,a=new P(this,{event:t,request:o,params:s}),n=this._getResponse(a,o,t),i=this._awaitComplete(n,a,o,t);return[n,i]}async _getResponse(e,t,o){await e.runCallbacks("handlerWillStart",{event:o,request:t});let s;try{if(s=await this._handle(t,e),!s||s.type==="error")throw new u("no-response",{url:t.url})}catch(a){if(a instanceof Error){for(let n of e.iterateCallbacks("handlerDidError"))if(s=await n({error:a,event:o,request:t}),s)break}if(!s)throw a}for(let a of e.iterateCallbacks("handlerWillRespond"))s=await a({event:o,request:t,response:s});return s}async _awaitComplete(e,t,o,s){let a,n;try{a=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:s,request:o,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(n=i)}if(await t.runCallbacks("handlerDidComplete",{event:s,request:o,response:a,error:n}),t.destroy(),n)throw n}};var C=class extends d{async _handle(e,t){let o=[],s=await t.cacheMatch(e),a;if(!s)try{s=await t.fetchAndCachePut(e)}catch(n){n instanceof Error&&(a=n)}if(!s)throw new u("no-response",{url:e.url,error:a});return s}};var j={cacheWillUpdate:async({response:r})=>r.status===200||r.status===0?r:null};var D=class extends d{constructor(t={}){super(t);this.plugins.some(o=>"cacheWillUpdate"in o)||this.plugins.unshift(j),this._networkTimeoutSeconds=t.networkTimeoutSeconds||0}async _handle(t,o){let s=[],a=[],n;if(this._networkTimeoutSeconds){let{id:l,promise:h}=this._getTimeoutPromise({request:t,logs:s,handler:o});n=l,a.push(h)}let i=this._getNetworkPromise({timeoutId:n,request:t,logs:s,handler:o});a.push(i);let c=await o.waitUntil((async()=>await o.waitUntil(Promise.race(a))||await i)());if(!c)throw new u("no-response",{url:t.url});return c}_getTimeoutPromise({request:t,logs:o,handler:s}){let a;return{promise:new Promise(i=>{a=setTimeout(async()=>{i(await s.cacheMatch(t))},this._networkTimeoutSeconds*1e3)}),id:a}}async _getNetworkPromise({timeoutId:t,request:o,logs:s,handler:a}){let n,i;try{i=await a.fetchAndCachePut(o)}catch(c){c instanceof Error&&(n=c)}return t&&clearTimeout(t),(n||!i)&&(i=await a.cacheMatch(o)),i}};var O=class extends d{constructor(t={}){super(t);this._networkTimeoutSeconds=t.networkTimeoutSeconds||0}async _handle(t,o){let s,a;try{let n=[o.fetch(t)];if(this._networkTimeoutSeconds){let i=W(this._networkTimeoutSeconds*1e3);n.push(i)}if(a=await Promise.race(n),!a)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(n){n instanceof Error&&(s=n)}if(!a)throw new u("no-response",{url:t.url,error:s});return a}};var M=class extends d{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(j)}async _handle(e,t){let o=[],s=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(s);let a=await t.cacheMatch(e),n;if(!a)try{a=await s}catch(i){i instanceof Error&&(n=i)}if(!a)throw new u("no-response",{url:e.url,error:n});return a}};self.__WB_DISABLE_DEV_LOGS=!m.debug;var q=(...r)=>{self.__WB_DISABLE_DEV_LOGS||console.debug("[pwa]",...r)},te="hugo-pwa-",De=te+"fallbacks",be=m.precaches.filter(r=>r.indexOf("__h_pp_l1")!==0);q("precaches",be);v(({request:r})=>r.mode==="navigate",new D({cacheName:te+"pages",plugins:[new N({statuses:[200]})]}));var Ne=["font","image","script","style"],xe;for(let r in Ne){let e=Ne[r],t=m.caches[e],o=t.origins?t.origins.map(i=>i.replace(/\/$/,"")):[],s=te+e+"s",a=null,n=[new N({statuses:[0,200]}),new S({maxAgeSeconds:(xe=t.max_age)!=null?xe:60*60*24*30})];switch(t.strategy){case"network-first":a=new D({cacheName:s,plugins:n});break;case"cache-first":a=new C({cacheName:s,plugins:n});break;case"stale-while-revalidate":a=new M({cacheName:s,plugins:n});break;default:throw new Error(`invalid strategy for kind "${e}": `+t.strategy)}v(({request:i,sameOrigin:c,url:l})=>i.destination!==e?!1:c||o&&o.includes(l.origin.replace(/\/$/,""))?!0:(q(`${l} will not be cached.`),!1),a)}v(()=>!0,new O);self.addEventListener("install",r=>{r.waitUntil(self.caches.open(De).then(e=>e.addAll(be)))});var Oe=async r=>{q("catch handler",r.request);let e=r.request.destination,t=r.request.url,o=await self.caches.open(De),s=await o.match(t);if(s)return s;if(e==="document"){let a,n="",i;if(t.indexOf(m.baseURL)===0?i=t.replace(m.baseURL,"").split("/",1):i=new URL(t).pathname.replace(/^\//,"").split("/",1),i.length>0&&m.langs.includes(i[0])){n=i[0];let l=`${m.baseURL}${n}/offline/`;if(q("loading multilingual offline page",l),a=await o.match(l),a)return a}let c=`${m.baseURL}offline/`;return q("loading the fallback offline page",c),await o.match(c)||Response.error()}else if(e==="image"&&m.offline_image)return await o.match(m.offline_image)||Response.error();return Response.error()};ee(Oe);})();
