import React, { useEffect, useRef } from 'react';
import './AdComponent.css';

/* global adsbygoogle */

const AdComponent = ({ adSlot }) => {
  const isMounted = useRef(true);

  useEffect(() => {
    // Ensure you load the AdSense library only once
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      document.head.appendChild(script);
    }

    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Ensure you push ads only if the component is still mounted
    if (isMounted.current && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }

    return () => {
      if (window.adsbygoogle) {
        // Restore original value if needed
        // adsbygoogle = window.adsbygoogle;
      }
    };
  }, []);

  return (
    <>
    <ins
      className="adsbygoogle custom-adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.REACT_APP_DATA_AD_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      ></ins>
      </>
  );
};

export default AdComponent;
