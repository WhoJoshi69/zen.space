if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/HqnFrRRv-RQqzaEVXsUCM/_buildManifest.js",revision:"3c34f8a026f35a1e8c12d2f3a755545f"},{url:"/_next/static/HqnFrRRv-RQqzaEVXsUCM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/460-b7772713582725eb.js",revision:"b7772713582725eb"},{url:"/_next/static/chunks/486-86f24ac0bccb2697.js",revision:"86f24ac0bccb2697"},{url:"/_next/static/chunks/bee240a3-47bd3a19f89f17cc.js",revision:"47bd3a19f89f17cc"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-5bda77edde15e401.js",revision:"5bda77edde15e401"},{url:"/_next/static/chunks/pages/%5Bname%5D-5e859d965f871849.js",revision:"5e859d965f871849"},{url:"/_next/static/chunks/pages/404-7775a59398bc9603.js",revision:"7775a59398bc9603"},{url:"/_next/static/chunks/pages/_app-2d62586cbedfbbaa.js",revision:"2d62586cbedfbbaa"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/changelog-ba7fd0f42e9d0150.js",revision:"ba7fd0f42e9d0150"},{url:"/_next/static/chunks/pages/contact-420f174fc181269d.js",revision:"420f174fc181269d"},{url:"/_next/static/chunks/pages/index-593d90364836117f.js",revision:"593d90364836117f"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/public/sounds/pomodoro-timer.39b1d344408d37b1.mp3",revision:"39b1d344408d37b1"},{url:"/_next/static/chunks/reactPlayerPreview.de8d3145b1df7987.js",revision:"de8d3145b1df7987"},{url:"/_next/static/chunks/webpack-8d0fd68bf2e845f4.js",revision:"8d0fd68bf2e845f4"},{url:"/_next/static/css/7036ecf0d2379572.css",revision:"7036ecf0d2379572"},{url:"/_next/static/css/8c3ad5b0e7cc015b.css",revision:"8c3ad5b0e7cc015b"},{url:"/_next/static/css/984cc1e34918a859.css",revision:"984cc1e34918a859"},{url:"/android-chrome-192x192.png",revision:"f1d2636015de113de7941e7a222b8c33"},{url:"/android-chrome-512x512.png",revision:"5490717d934896f990bd364be788ba3f"},{url:"/apple-touch-icon.png",revision:"a26e5233b0c05282bdcae6075b31bbb0"},{url:"/banner-dark.jpg",revision:"ab80a4556e95176763113d9843c6777e"},{url:"/banner-light.jpg",revision:"8f89aa9617ded9b0fe0510b48b7fb1ff"},{url:"/carrousel/1.jpg",revision:"ce1ae01b237d3120084a7f40fab173a0"},{url:"/carrousel/2.jpg",revision:"2876596fdf6a5286d00ff90e0191eeea"},{url:"/carrousel/3.jpg",revision:"65f98c0e1b2711c641c2606c516d5c2b"},{url:"/carrousel/4.jpg",revision:"d8a037786b7f47e1080fa6e3df10b788"},{url:"/carrousel/5.jpg",revision:"6549798302e683cb7a30d048138f9ce0"},{url:"/favicon-16x16.png",revision:"00afdd612495804f6ee2fcb1396e77eb"},{url:"/favicon-32x32.png",revision:"b77680bafb19c3faeee7c7a82aaed401"},{url:"/favicon.ico",revision:"aee5a774f094a8e19abd0943f4d3502a"},{url:"/logo-dark.svg",revision:"4d0348efe0129695a765cdc6a1fc5151"},{url:"/logo-light.svg",revision:"e7e72272c87bfe6889c5190a224f17ea"},{url:"/manifest.json",revision:"69bcf5e5566025aaee4cdc27a8ea09a7"},{url:"/maskable_icon.png",revision:"8230850256775a264f72a287e650e69d"},{url:"/robots.txt",revision:"3a64150859c06fd7ef2f04e3fca3216b"},{url:"/sounds/pomodoro-timer.mp3",revision:"aaa8c66486ed64c9712743f81307647f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
