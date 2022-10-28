import React, { FC } from 'react';
import styles from './Navbar.module.scss';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => (
  <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand js-scroll-trigger" href="#intro-page">S.<span className="last-name">Zarour</span></a>
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i className="fa fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#about-page">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#skills-page">Skills</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#projects-page">Portfolio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#timeline-page">Timeline</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#contact-page">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
