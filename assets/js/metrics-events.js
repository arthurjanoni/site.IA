/* Eventos próprios enviados ao GTM somente com consentimento. */
(function(){'use strict';document.addEventListener('click',function(ev){
var a=ev.target.closest&&ev.target.closest('a[href]');if(!a)return;
var href=a.getAttribute('href')||'',name='';
if(/^(https?:\/\/)?(www\.)?(wa\.me|api\.whatsapp\.com)\//i.test(href))name='whatsapp_click';
else if(/^tel:/i.test(href))name='phone_click';
else if(/^mailto:/i.test(href))name='email_click';
else if(/\.pdf(?:[?#]|$)/i.test(href))name='pdf_download_click';
if(name&&window.imperioTrack)window.imperioTrack(name,{link_url:a.href,link_text:(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,90),page_name:location.pathname.split('/').pop()||'index.html',link_position:a.closest('header')?'header':a.closest('footer')?'footer':'content'});
});})();