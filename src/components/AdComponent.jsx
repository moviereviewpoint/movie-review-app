import React, { useEffect, useRef } from 'react';
import './AdComponent.css';

const AdComponent = ({ adSlot }) => {
  useEffect(() => {
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (window.adsbygoogle && adSlot) {
      window.adsbygoogle.push({});
    }
  }, [adSlot]);

  return adSlot ? (
    <ins
      className="adsbygoogle custom-adsbygoogle"
      style={{ display: 'block', minWidth: '200px' }} // Set a minimum width
      data-ad-client={process.env.REACT_APP_DATA_AD_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  ) : null;
};

export default AdComponent;