import React, { useEffect, useState } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import Footer from "./components/Footer";
import LoadingBar from "react-top-loading-bar";
import MovieDetail from "./components/MovieDetail";
import { useLoading } from "./components/context/LoadingContext";
import Itemsloader from "./components/loaders/Itemsloader";
import AdminController from "./components/AdminController";

function App() {
  const { loading, setProgress } = useLoading();
  const [enableCustomScroll, setEnableCustomScroll] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", () => {
      setProgress(100);
    });
  }, []);

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

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [enableCustomScroll]);
  useEffect(() => {
    // Simulating a delay for demonstration purposes
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [setProgress]);

  return (
    <>
      {loading < 100 &&(
        <>
       <LoadingBar progress={loading} color="#f11946" height={3} />
       <Itemsloader />
       </>
       )}
      <Header />
      <Routes>
        <Route
          path="/:deletepost?"
          element={<Home/>}
        />
        <Route path="/" element={<Home  />} />
        <Route path="/movieform" element={<MovieForm />} />
        <Route
          path="/post/:postId"
          element={<MovieDetail />}
          onClick={() => setProgress(0)}
        />
        <Route path="*" element={<h1>Page not found</h1>} />
        <Route path="/admin" element={<AdminController />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
