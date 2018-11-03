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

  let closeMenu = () => {
    ctx.setState({
      isOpened: false
    });
  };

  let goToExternalLink = (link) => {
    window.open(link, '_blank', 'location=no');
  };

  return {
    toggleMenu,
    closeMenu,
    goToExternalLink
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
            {/*
            <div className="link--top">
              <img src="assets/images/logo-one-menu-white.svg" alt="ONE-MENU - The World on your Plate" />
            </div>
            */}

            <ul className="menu--simple">
              <li><Link id="navMenuToRestaurants" to="/home" onClick={this.handlers.closeMenu}>Restaurants</Link></li>
              <li><Link id="navMenuToMap" to="/map" onClick={this.handlers.closeMenu}>Map</Link></li>
              <li><Link id="navMenuToMenus" to="/restaurants/44/menus" onClick={this.handlers.closeMenu}>Menus</Link></li>
            </ul>

            <div className="link--bottom">
              <a id="navMenuToTOU" onClick={() => {this.handlers.goToExternalLink('http://one-menu.com/uploads/ONE-MENU_Terms_Of_Use.pdf')}}>Terms of Use</a>
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