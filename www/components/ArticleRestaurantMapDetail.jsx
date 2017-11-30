import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

let createHandlers = (ctx) => {
  let onClosePopup = () => {
    if (ctx.props.onClose) {
      ctx.props.onClose();
    }
  };

  let goToExternalLink = (link) => {
    window.open(link, '_blank', 'location=no');
  };

  let goToEmailLink = (email, body, subject) => {
    window.open('mailto:' + email, '_system');
  };

  let goToTelLink = (tel) => {
    window.open('tel:' + tel, '_system');
  };


  return {
    onClosePopup,
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

    console.log(component);

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
              Email: <a onClick={() => {this.handlers.goToEmailLink(contactEmail)}}>{contactEmail}</a><br />
              Tel: <a onClick={() => {this.handlers.goToTelLink(contactTel)}}>{contactTel}</a><br />
              Website: <a onClick={() => {this.handlers.goToExternalLink(contactWebsite)}}>{contactWebsite}</a><br />
            </p>
          </div>
        </article>
        <footer className="popup--footer">
          <Link to={"/restaurants/" + restaurant.BranchID + "/menus"} onClick={this.handlers.onClosePopup}>Menus</Link>
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
    console.log(state);
    return {
        offCanvas: state._offCanvas.offCanvas
    };
};

export default connect(mapStateToProps)(ArticleRestaurantMapDetail);