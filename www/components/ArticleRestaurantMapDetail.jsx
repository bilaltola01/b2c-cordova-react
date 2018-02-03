import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import pushAnalytics from '../shared/analytics.utils';

let createHandlers = (ctx) => {
  let onClosePopup = () => {
    if (ctx.props.onClose) {
      ctx.props.onClose();
    }
  };

  let onMenusClick = (restaurant) => {
    pushAnalytics.push({
      'event': 'mapRestaurantMenus',
      'branchAddress': restaurant.Address,
      'branchCity': restaurant.City,
      'branchName': restaurant.Name,
      'branchCountry': restaurant.Country,
      'branchID': restaurant.BranchID,
      'companyID': restaurant.CompanyID,
      'companyName': restaurant.CompanyName,
      'companyWebsite': restaurant.CompanyWebsite
    }, {
			event: 'mapRestaurantMenusClick',
			type: 'Branch',
			id: restaurant.BranchID,
      title: restaurant.Name,
		});

    onClosePopup();
  };

  let goToExternalLink = (restaurant, link) => {
    window.dataLayer.push({
      'event': 'mapRestaurantContactWebsite',
      'branchAddress': restaurant.Address,
      'branchCity': restaurant.City,
      'branchName': restaurant.Name,
      'branchCountry': restaurant.Country,
      'branchID': restaurant.BranchID,
      'companyID': restaurant.CompanyID,
      'companyName': restaurant.CompanyName,
      'companyWebsite': restaurant.CompanyWebsite
    });
    window.open(link, '_blank', 'location=no');
  };

  let goToEmailLink = (restaurant, email, body, subject) => {
    window.dataLayer.push({
      'event': 'mapRestaurantContactEmail',
      'branchAddress': restaurant.Address,
      'branchCity': restaurant.City,
      'branchName': restaurant.Name,
      'branchCountry': restaurant.Country,
      'branchID': restaurant.BranchID,
      'companyID': restaurant.CompanyID,
      'companyName': restaurant.CompanyName,
      'companyWebsite': restaurant.CompanyWebsite,
      'companyEmail': restaurant.CompanyEmail
    });
    window.open('mailto:' + email, '_system');
  };

  let goToTelLink = (restaurant, tel) => {
    window.dataLayer.push({
      'event': 'mapRestaurantContactTel',
      'branchAddress': restaurant.Address,
      'branchCity': restaurant.City,
      'branchName': restaurant.Name,
      'branchCountry': restaurant.Country,
      'branchID': restaurant.BranchID,
      'companyID': restaurant.CompanyID,
      'companyName': restaurant.CompanyName,
      'companyWebsite': restaurant.CompanyWebsite,
      'companyTel': restaurant.CompanyTel
    });
    window.open('tel:' + tel, '_system');
  };


  return {
    onClosePopup,
    onMenusClick,
    goToExternalLink,
    goToEmailLink,
    goToTelLink
  };
};

class ArticleRestaurantMapDetail extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this);
  }

  render() {
    const { component, onClose } = this.props;

    const restaurant = component.restaurant;

    const firstImage = (restaurant.images && restaurant.images.length > 0) ? (
      <img src={restaurant.images[0].Path} alt={restaurant.images[0].AltDesc} />
    ) : null;

    const lastImage = (restaurant.images && restaurant.images.length > 0) ? (
      <img src={restaurant.images[restaurant.images.length - 1].Path} alt={restaurant.images[restaurant.images.length - 1].AltDesc} />
    ) : null;

    const contactTel = restaurant.Tel || restaurant.CompanyTel;
    const contactEmail = restaurant.Email || restaurant.CompanyEmail;
    const contactWebsite = restaurant.Website || restaurant.CompanyWebsite;

    return (
      <div>
        <article className="restaurant--detail">
          <header>
            <div className="cross close-popup" onClick={this.handlers.onClosePopup}></div>
            <h2>{restaurant.CompanyName}</h2>
            <h3 className="small-text">{restaurant.City}</h3>
          </header>
          <div className="restaurant--image">
            <div className="overlay overlay--black">
              <p className="restaurant--distance">
                {restaurant.Distance} km
              </p>
            </div>

            {lastImage}
          </div>
          <div className="restaurant--content">
            <h4>{restaurant.Address}</h4>
            <p className="restaurant--desc">
              Email: <a id="mapRestaurantEmailClick" onClick={() => {this.handlers.goToEmailLink(restaurant, contactEmail)}}>{contactEmail}</a><br />
              Tel: <a id="mapRestaurantTelClick" onClick={() => {this.handlers.goToTelLink(restaurant, contactTel)}}>{contactTel}</a><br />
              Website: <a id="mapRestaurantWebsiteClick" onClick={() => {this.handlers.goToExternalLink(restaurant, contactWebsite)}}>{contactWebsite}</a><br />
            </p>
          </div>
        </article>
        <footer className="popup--footer">
          <Link id="mapRestaurantToMenus" to={"/restaurants/" + restaurant.BranchID + "/menus"} onClick={() => {this.handlers.onMenusClick(restaurant)}}>Menus</Link>
        </footer>
      </div>
    )
  }
};

ArticleRestaurantMapDetail.propTypes = {
  component: PropTypes.object,
  onClose: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        offCanvas: state._offCanvas.offCanvas
    };
};

export default connect(mapStateToProps)(ArticleRestaurantMapDetail);