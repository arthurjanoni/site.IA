
/*
 * Império Ambiental
 * Gerenciamento de consentimento de cookies
 * Google Consent Mode v2
 *
 * GTM: GTM-PD5RRP7
 *
 * O Google Tag Manager é carregado somente
 * após o visitante aceitar os cookies opcionais.
 */

(function () {
  'use strict';

  var KEY = 'imperio_consent_v1';
  var GTM = 'GTM-PD5RRP7';

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || [];

  // Inicializar gtag
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  /*
   * Consent Mode v2
   * Estado padrão: todos os consentimentos opcionais negados.
   * Deve ser definido antes do carregamento do GTM.
   */
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  /*
   * Controle de eventos personalizados.
   * Os eventos somente são enviados após o aceite.
   */
  window.imperioConsentGranted = false;

  window.imperioTrack = function (name, params) {
    if (window.imperioConsentGranted) {
      window.dataLayer.push(
        Object.assign(
          { event: name },
          params || {}
        )
      );
    }
  };

  /*
   * Carregar Google Tag Manager.
   * Evita carregar o mesmo contêiner duas vezes.
   */
  function loadGTM() {
    if (window.imperioGtmLoaded) {
      return;
    }

    window.imperioGtmLoaded = true;

    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    var script = document.createElement('script');

    script.async = true;

    script.src =
      'https://www.googletagmanager.com/gtm.js?id=' + GTM;

    document.head.appendChild(script);
  }

  /*
   * Aplicar a escolha do visitante.
   *
   * accepted: conceder consentimentos opcionais.
   * rejected: manter consentimentos negados.
   */
  function apply(choice) {
    var accepted = choice === 'accepted';

    window.imperioConsentGranted = accepted;

    window.gtag('consent', 'update', {
      analytics_storage: accepted ? 'granted' : 'denied',
      ad_storage: accepted ? 'granted' : 'denied',
      ad_user_data: accepted ? 'granted' : 'denied',
      ad_personalization: accepted ? 'granted' : 'denied'
    });

    window.dataLayer.push({
      event: 'imperio_consent_update',
      imperio_consent: choice
    });

    if (accepted) {
      loadGTM();
    }
  }

  /*
   * Ler escolha armazenada no navegador.
   */
  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  /*
   * Salvar escolha no navegador.
   */
  function write(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      // Continuar mesmo se o armazenamento estiver bloqueado.
    }
  }

  /*
   * Remover aviso de cookies.
   */
  function dismiss() {
    var element = document.getElementById(
      'imperio-consent-banner'
    );

    if (element) {
      element.remove();
    }
  }

  /*
   * Processar a escolha do visitante.
   */
  function choose(value) {
    write(value);
    apply(value);
    dismiss();
  }

  /*
   * Recuperar consentimento anterior.
   */
  var saved = read();

  if (saved === 'accepted' || saved === 'rejected') {
    apply(saved);
  }

  /*
   * Criar aviso de cookies.
   * Mantém o visual original da Império Ambiental.
   */
  function banner() {
    if (saved === 'accepted' || saved === 'rejected') {
      return;
    }

    if (document.getElementById('imperio-consent-banner')) {
      return;
    }

    var element = document.createElement('aside');

    element.id = 'imperio-consent-banner';

    element.setAttribute('role', 'dialog');

    element.setAttribute(
      'aria-label',
      'Preferências de privacidade'
    );

    element.style.cssText =
      'position:fixed;' +
      'bottom:16px;' +
      'left:16px;' +
      'right:16px;' +
      'max-width:510px;' +
      'background:#fff;' +
      'color:#193b30;' +
      'border:1px solid #d8e4dd;' +
      'box-shadow:0 8px 28px #0003;' +
      'padding:18px;' +
      'border-radius:12px;' +
      'z-index:2147483647;' +
      'font:14px/1.5 Arial,sans-serif';

    element.innerHTML =
      '<strong style="display:block;margin-bottom:6px">' +
      'Privacidade e métricas' +
      '</strong>' +

      '<p style="margin:0 0 12px">' +
      'Usamos métricas opcionais para entender as visitas ' +
      'e melhorar nossos serviços. Você pode aceitar ou ' +
      'rejeitar. Consulte nossa ' +

      '<a href="politica-de-privacidade.html" ' +
      'style="color:#17663d;text-decoration:underline">' +
      'Política de Privacidade' +
      '</a>.' +

      '</p>' +

      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +

      '<button type="button" data-consent="rejected" ' +
      'style="padding:9px 13px;background:white;' +
      'color:#193b30;border:1px solid #a8b9b0;' +
      'border-radius:7px;cursor:pointer">' +
      'Rejeitar opcionais' +
      '</button>' +

      '<button type="button" data-consent="accepted" ' +
      'style="padding:9px 13px;background:#17663d;' +
      'color:white;border:1px solid #17663d;' +
      'border-radius:7px;cursor:pointer">' +
      'Aceitar opcionais' +
      '</button>' +

      '</div>';

    element.addEventListener('click', function (event) {
      var button = event.target.closest('[data-consent]');

      if (button) {
        choose(button.getAttribute('data-consent'));
      }
    });

    document.body.appendChild(element);
  }

  /*
   * Permitir reabrir as preferências de privacidade.
   */
  window.imperioOpenPrivacyPreferences = function () {
    saved = null;
    dismiss();
    banner();
  };

  /*
   * Mostrar o aviso quando o DOM estiver disponível.
   */
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      banner
    );
  } else {
    banner();
  }

})();
