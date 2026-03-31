import React, { useState } from "react";

const Hero = () => {
  const [searchStatus, setSearchStatus] = useState("idle"); // 'idle', 'loading', 'success'

  // Replaces your searchPending() function
  const handleSearch = () => {
    setSearchStatus("loading");
    setTimeout(() => {
      setSearchStatus("success");

      // Optional: Reset back to idle after a few seconds
      setTimeout(() => setSearchStatus("idle"), 2000);
    }, 1000);
  };

  return (
    <header>
      <div className="header__container">
        <div className="header__description">
          <h1>Europe's most awarded film streaming platform</h1>
          <h2>Sift. Stream. Settle In.</h2>
          <div className="header__input--wrapper">
            <input
              className="header__input--search"
              type="text"
              placeholder="Search by Movie Name or Keyword"
            />
            <button className="header__input--btn" onClick={handleSearch}>
              <svg
                className="header__input--icon svg-inline--fa fa-search fa-w-16"
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>

              <div
                className={`btn__overlay btn__overlay--loading ${searchStatus === "loading" ? "btn__overlay--visible" : ""}`}
              >
                <i className="fa-solid fa-spinner"></i>
              </div>

              <div
                className={`btn__overlay btn__overlay--success ${searchStatus === "success" ? "btn__overlay--visible" : ""}`}
              >
                <i className="fa-solid fa-check"></i>
              </div>
            </button>
          </div>
        </div>
        <figure className="header__img--wrapper">
          <img
            className="header__img"
            src="/assets/undraw_home-cinema.svg"
            alt="Homepage Image"
          />
        </figure>
      </div>
    </header>
  );
};

export default Hero;
