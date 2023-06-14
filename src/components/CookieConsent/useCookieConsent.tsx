import { useCallback, useEffect, useState } from 'react';

const cookieConsentAccepted = 'accepted';
const cookieConsentDeclined = 'declined';
const cookieConsentKey = 'hasCookieConsent';

const useCookieConsent = () => {
  const [state, setState] = useState({
    consentAnswered: false,
    consentRequestVisible: false,
    hasConsent: false,
    isReady: false
  });

  const setConsentAnswer = useCallback((accepted: boolean) => {
    window.localStorage.setItem(cookieConsentKey, accepted ? cookieConsentAccepted : cookieConsentDeclined);

    setState(state => ({ ...state, consentRequestVisible: false }));

    return setTimeout(() => {
      return setState(state => ({ ...state, consentAnswered: true, hasConsent: accepted }));
    }, 500);
  }, []);

  useEffect(() => {
    const consentAnswer = window.localStorage.getItem(cookieConsentKey);
    const hasConsent = consentAnswer === cookieConsentAccepted;

    if (!consentAnswer) {
      setState(state => ({ ...state, isReady: true }));

      setTimeout(() => {
        setState(state => ({ ...state, consentRequestVisible: true }));
      }, 500);
    } else {
      setState(state => ({ ...state, consentAnswered: true, hasConsent, isReady: true }));
    }
  }, []);

  return { ...state, setConsentAnswer };
};

export default useCookieConsent;
