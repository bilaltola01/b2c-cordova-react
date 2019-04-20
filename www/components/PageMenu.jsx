import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Splashscreen from './Splashscreen';
import PageContent from './PageContent';

import { Pages } from './Pages';

let createHandlers = (ctx) => {
  let setMenuLanguages = (menu) => {
    ctx.props.dispatch(actionCreators.setMenuLanguages(menu));
  };

  return {
    setMenuLanguages
  };
};

class PageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false,
    };
    this.handlers = createHandlers(this);
  }

  getRestaurants(propsProfile) {
    return (propsProfile || []).reduce((acc, current) => {
      return acc.concat(
        (current.branches || []).map(branch => {
          const finalMenus =
            current.CompanyID === 2 && !branch.menus
              ? ((current.branches || [])[0] || {}).menus.map(menu => {
                  console.log(menu)
                  return {
                    ...menu,
                    MenuID: this.props.match.params.menuId,
                    BranchID: branch.BranchID,
                  };
                })
              : branch.menus;
          return {
            ...branch,
            CompanyLogoPath: current.LogoPath,
            CompanyLogoAltDesc: current.LogoAltDesc,
            CompanyName: current.Name,
            CompanyWebsite: current.Website,
            CompanyEmail: current.Email,
            CompanyTel: current.Tel,
            menus: finalMenus,
          };
        }),
      );
    }, []);
  }

  getCurrentRestaurant(restaurants, id) {
    return (restaurants && restaurants.length > 0) ? restaurants.filter(r => {
      return parseInt(r.BranchID, 10) === parseInt(id, 10);
    }) : null;
  }

  getCurrentMenu(restaurant, menuId) {
    return restaurant && restaurant[0].menus && restaurant[0].menus.length > 0
      ? restaurant[0].menus.find(menu => {
          return parseInt(menu.MenuID, 10) === parseInt(menuId, 10);
        })
      : null;
  }

  componentDidMount() {
    this.handlers.setMenuLanguages(this.getCurrentMenu(this.getCurrentRestaurant(this.getRestaurants(this.props.profile), this.props.match.params.id), this.props.match.params.menuId));
  }

  render() {
    const title = Pages.getPageAttribute('Menu', 'title');
    const footer = Pages.getPageAttribute('Menu', 'footer');
    const offCanvasSettings = Pages.getPageAttribute('Menu', 'offCanvas');

    const { id, menuId } = this.props.match.params;

    let navigation = Pages.getPageAttribute('Menu', 'navigation');
    navigation.leftButtons[0].action.path += '/' + id;
    const restaurants = this.getRestaurants(this.props.profile);
    const restaurant =
      restaurants && restaurants.length > 0
        ? restaurants.filter(r => {
            return parseInt(r.BranchID, 10) === parseInt(id, 10);
          })
        : null;

    const currency = (restaurant && restaurant[0] && restaurant[0].currencies && restaurant[0].currencies.length > 0) ? restaurant[0].currencies[0] : null;

    const menu =
      restaurant && restaurant[0].menus && restaurant[0].menus.length > 0
        ? restaurant[0].menus.find(menu => {
            return parseInt(menu.MenuID, 10) === parseInt(menuId, 10);
          })
        : null;

    const companyId =
      restaurant && restaurant[0] ? restaurant[0].CompanyID : null;
    const sections = [
      {
        type: 'restaurant-menu',
        title: '',
        component: {
          menu,
          currency,
          companyId: companyId,
        },
      },
    ];
    return (
      <div>
        <PageContent
          companyId={companyId}
          title={title}
          sections={sections}
          navigation={navigation}
          footer={footer}
          offCanvasSettings={offCanvasSettings}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    offCanvas: state._offCanvas.offCanvas,
    profile: state._profile.profile,
  };
};

export default connect(mapStateToProps)(PageMenu);
