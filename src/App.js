import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FlickFetch from "./components/FlickFetch";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* When the URL is exactly '/', shows the Home component */}
          <Route path="/" element={<Home />} />

          {/* When the URL is '/film', shows the FlickFetch component */}
          <Route path="/film" element={<FlickFetch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
