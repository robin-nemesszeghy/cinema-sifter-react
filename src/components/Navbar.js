import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Replaces your openMenu() and closeMenu() functions
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu--open");
    } else {
      document.body.classList.remove("menu--open");
    }

    // Cleanup function in case the component unmounts
    return () => document.body.classList.remove("menu--open");
  }, [isMenuOpen]);

  // Replaces your showContactAlert() function
  const handleContactClick = (e) => {
    e.preventDefault(); // Prevents the default '#' link jump
    alert("This feature has not been implemented.");
  };

  return (
    <nav>
      <div className="nav__container">
        <figure className="nav__logo">
          {/* Note: Ensure your assets folder is placed inside the 'public' folder of your React app */}
          <img
            className="nav__logo--img"
            src="/assets/CinemaSifter_logo_img.png"
            alt="Logo Image"
          />
          <img
            className="nav__logo--title"
            src="/assets/CinemaSifter_logo_text.png"
            alt="Logo Name"
          />
        </figure>
        <ul className="nav__links">
          <li>
            <Link
              className="nav__link link__hover-effect link__hover-effect--teal"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="nav__link link__hover-effect link__hover-effect--black"
              to="/film"
            >
              FlickFetch
            </Link>
          </li>
          <li>
            <a
              className="nav__link nav__link--btn"
              href="#"
              onClick={handleContactClick}
            >
              CONTACT
            </a>
          </li>
        </ul>
        <button className="btn__menu" onClick={() => setIsMenuOpen(true)}>
          <i className="fa-solid fa-film"></i>
        </button>

        <div className="menu__backdrop">
          <button
            className="btn__menu btn__menu--close"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link
                to="/"
                className="menu__link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="menu__list">
              <Link
                to="/film"
                className="menu__link"
                onClick={() => setIsMenuOpen(false)}
              >
                FlickFetch
              </Link>
            </li>
            <li className="menu__list">
              <a
                href="#"
                className="menu__link"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleContactClick(e);
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
