/* Império Ambiental: consentimento básico, GTM somente após aceite. */
(function(){'use strict';
var KEY='imperio_consent_v1', GTM='GTM-PD5RRP7';
window.dataLayer=window.dataLayer||[];
window.imperioTrack=function(name,params){if(window.imperioConsentGranted){window.dataLayer.push(Object.assign({event:name},params||{}));}};
function loadGTM(){if(window.imperioGtmLoaded)return;window.imperioGtmLoaded=true;
window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+GTM;document.head.appendChild(s);}
function apply(choice){window.imperioConsentGranted=choice==='accepted';
window.dataLayer.push({event:'imperio_consent_update',imperio_consent:choice});
if(choice==='accepted')loadGTM();}
function read(){try{return localStorage.getItem(KEY)}catch(e){return null}}
function write(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function dismiss(){var el=document.getElementById('imperio-consent-banner');if(el)el.remove()}
function choose(v){write(v);apply(v);dismiss()}
var saved=read();if(saved==='accepted'||saved==='rejected')apply(saved);
function banner(){if(saved==='accepted'||saved==='rejected')return;
var el=document.createElement('aside');el.id='imperio-consent-banner';el.setAttribute('role','dialog');el.setAttribute('aria-label','Preferências de privacidade');
el.style.cssText='position:fixed;bottom:16px;left:16px;right:16px;max-width:510px;background:#fff;color:#193b30;border:1px solid #d8e4dd;box-shadow:0 8px 28px #0003;padding:18px;border-radius:12px;z-index:2147483647;font:14px/1.5 Arial,sans-serif';
el.innerHTML='<strong style="display:block;margin-bottom:6px">Privacidade e métricas</strong><p style="margin:0 0 12px">Usamos métricas opcionais para entender as visitas e melhorar nossos serviços. Você pode aceitar ou rejeitar. Consulte nossa <a href="politica-de-privacidade.html" style="color:#17663d;text-decoration:underline">Política de Privacidade</a>.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" data-consent="rejected" style="padding:9px 13px;background:white;color:#193b30;border:1px solid #a8b9b0;border-radius:7px;cursor:pointer">Rejeitar opcionais</button><button type="button" data-consent="accepted" style="padding:9px 13px;background:#17663d;color:white;border:1px solid #17663d;border-radius:7px;cursor:pointer">Aceitar opcionais</button></div>';
el.addEventListener('click',function(e){var b=e.target.closest('[data-consent]');if(b)choose(b.getAttribute('data-consent'))});document.body.appendChild(el)}
window.imperioOpenPrivacyPreferences=function(){saved=null;banner()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',banner);else banner();
})();