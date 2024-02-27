import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import ReviewForm from './components/ReviewForm';
import Header from './components/Header';
import MovieForm from './components/MovieForm';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const handleScroll = (event) => {
      // Prevent the default scroll behavior
      event.preventDefault();

      // Set the scroll speed factor (adjust this value to control the speed)
      const scrollSpeed = 1.1;

      // Calculate the new scroll position
      const delta = event.deltaY * scrollSpeed;

      // Adjust the scroll position
      window.scrollBy(0, delta);
    };

    // Add an event listener for the scroll event
    window.addEventListener('wheel', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);
  return (
    <>
    <Header />
    <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/movies/:id" element={<MovieDetails/>} />
        <Route path="/submit-review" element={<ReviewForm/>} />
        <Route path="/movieform" element={<MovieForm/>} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
