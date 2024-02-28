import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import Footer from "./components/Footer";
import Itemsloader from "./components/loaders/Itemsloader";

function App() {
  const [loading, setLoading] = useState(true);
  const [enableCustomScroll, setEnableCustomScroll] = useState(true);

  useEffect(() => {
    const handleScroll = (event) => {
      if (enableCustomScroll) {
        event.preventDefault();
        const scrollSpeed = 1.1;
        const delta = event.deltaY * scrollSpeed;
        window.scrollBy(0, delta);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    window.addEventListener("DOMContentLoaded", () => {
      setLoading(false);
    });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [enableCustomScroll]);

  return (
    <>
      {loading ? (
        <>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/movieform" element={<MovieForm />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Itemsloader />
      )}
    </>
  );
}

export default App;
