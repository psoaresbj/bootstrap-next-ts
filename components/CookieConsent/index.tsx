import CookieConsentRequest from './CookieConsentRequest';
import React from 'react';
import Script from 'next/script';
import useCookieConsent from './useCookieConsent';

const gaKey = process.env.NEXT_PUBLIC_GA;

const CookieConsent = () => {
  const { setConsentAnswer, consentAnswered, consentRequestVisible, hasConsent, isReady } = useCookieConsent();

  if (!isReady) {
    return null;
  }

  if (!!gaKey && hasConsent) {
    return (
      <>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaKey}`} />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaKey}');
          `}
        </Script>
      </>
    );
  }

  if (consentAnswered) {
    return null;
  }

  return <CookieConsentRequest handleRequestAnswer={setConsentAnswer} isVisible={consentRequestVisible} />;
};

export default CookieConsent;
