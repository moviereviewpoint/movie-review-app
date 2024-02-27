// Header.jsx

import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = scrolled ? "app-header-fixed" : "";

  return (
    <header className={`app-header ${headerClass}`}>
      <div className="logo">
        <h1>moviereviewpoint</h1>
      </div>
    </header>
  );
};

export default Header;
