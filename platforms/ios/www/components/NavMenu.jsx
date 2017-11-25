import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

const classNames = require('classnames');

let createHandlers = (ctx) => {
  let toggleMenu = () => {
    ctx.setState((prevState) => {
      return {
        isOpened: !prevState.isOpened
      };
    });
  };

  return {
    toggleMenu
  };
};

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isOpened: props.isOpenedDefault || false
    };
    this.handlers = createHandlers(this);
  }

  render() {
    const { isOpenedDefault } = this.props;

    const classes = classNames(
      'menu-btn',
      (this.state.isOpened) ? 'active' : ''
    );

		return (
      <div className="nav-menu">
        <span id="menu-btn" className={classes} onClick={this.handlers.toggleMenu}>
          <span id="burger-menu" className="burger-menu"></span>
        </span>
        <nav className="main-nav">
          <div className="main-nav--container">
            <div className="link--top">
              <img src="assets/images/logo-one-menu-white.svg" alt="ONE-MENU - The World on your Plate" />
            </div>

            <ul className="menu--simple">
              <li><Link to="/home">Restaurants</Link></li>
              <li><Link to="/map">Map</Link></li>
              <li><Link to="/restaurant/3/menus">Menus</Link></li>
            </ul>

            <div className="link--bottom">
              <a href="http://one-menu.com/uploads/ONE-MENU_Terms_Of_Use.pdf" target="_blank">Terms of Use</a>
            </div>
          </div>
        </nav>
      </div>
    );
	}
};

NavMenu.propTypes = {
  isOpenedDefault: PropTypes.bool
};


export default NavMenu;