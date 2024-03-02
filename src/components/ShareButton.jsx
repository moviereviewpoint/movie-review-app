import React, { useEffect, useState } from "react";
import "./ShareButton.css";
import {
  FaRegShareSquare,
  FaWhatsapp,
  FaFacebook,
  FaTwitter
} from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

const ShareButton = React.forwardRef(({ itemId, showShareDialog }, ref) => {
  useEffect(() => {
    if (showShareDialog) {
      setShowSharePage(true);
    } else {
      setShowSharePage(false);
    }
  }, [showShareDialog]);

  const [showSharePage, setShowSharePage] = useState(false);

  const url = `https://moviereviewpoint.com/post/${itemId}`;

  const handleShareButtonClick = () => {
    setShowSharePage(true);
  };

  const handleSharePageClose = () => {
    setShowSharePage(false);
  };

  const handleSharePageClick = (event) => {
    event.stopPropagation();
  };

  const handleSharePageKeydown = (event) => {
    if (event.key === "Escape") {
      setShowSharePage(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showSharePage &&
        !event.target.closest(".sharepage") &&
        !event.target.closest(".share-icon")
      ) {
        setShowSharePage(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showSharePage]);

  useEffect(() => {
    document.addEventListener("keydown", handleSharePageKeydown);
    return () => {
      document.removeEventListener("keydown", handleSharePageKeydown);
    };
  }, []);

  const defaultWindowShare = async () => {
    try {
      await navigator.share({
        title: "Movie Review App",
        text: "Check out this movie review app!",
        url: `http://localhost:3000/post/${itemId}`,
      });
    } catch (error) {
      console.error("Error sharing using Web Share API:", error);
      // Handle error or provide alternative sharing method
    }
  };

  const shareOnWhatsapp = () => {
    window.open(`https://wa.me/?text=Check+out+this+movie+review+app!+${url}`);
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=http://${url}&text=Check+out+this+movie+review+app!`
    );
  };


  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    alert("URL Copied!");
    setShowSharePage(false);
  };

  return (
    <div>
      <FaRegShareSquare
        className="share-icon"
        size={20}
        onClick={handleShareButtonClick}
      />

      {showSharePage && (
        <div className="sharepagewarp" onClick={handleSharePageClose}>
          <div
            className="sharepage"
            onClick={handleSharePageClick}
            onKeyDown={handleSharePageKeydown}
          >
            <div className="iconsRow">
              <FaWhatsapp
                className="share-icon whatsapp"
                size={20}
                onClick={shareOnWhatsapp}
              />
              <FaFacebook
                className="share-icon facebook"
                size={20}
                onClick={shareOnFacebook}
              />
              <FaTwitter
                className="share-icon twitter"
                size={20}
                onClick={shareOnTwitter}
              />
            
              <FaShareNodes
                className="share-icon default"
                size={20}
                onClick={defaultWindowShare}
              />
            </div>
            <div className="copyUrl">
              <p className="copyUrlText">{`http://localhost:3000/post/${itemId}`}</p>
              <button className="copyButton" onClick={handleCopyUrl}>
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ShareButton;
