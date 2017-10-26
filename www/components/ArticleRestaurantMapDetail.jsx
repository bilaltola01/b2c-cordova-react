import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

class ArticleRestaurant extends Component {
  render() {
    const { component } = this.props;

    console.log(component);

    const restaurant = component.restaurant;

    const firstImage = (restaurant.images && restaurant.images.length > 0) ? (
      <img src={restaurant.images[0].Path} alt={restaurant.images[0].AltDesc} />
    ) : null;

    const contactTel = restaurant.Tel || restaurant.CompanyTel;
    const contactEmail = restaurant.Email || restaurant.CompanyEmail;
    const contactWebsite = restaurant.Website || restaurant.CompanyWebsite;

    return (
      <div>
        <article className="restaurant--detail">
          <header>
            <div className="cross close-popup"></div>
            <h2>{restaurant.CompanyName}</h2>
            <h3 className="small-text">{restaurant.City}</h3>
          </header>
          <div className="restaurant--image">
            <div className="overlay overlay--black">
              <p className="restaurant--distance">
                {restaurant.Distance} km
              </p>
            </div>

            {firstImage}
          </div>
          <div className="restaurant--content">
            <h4>{restaurant.Address}</h4>
            <p className="restaurant--desc">
              Email: {contactEmail} <br />
              Tel: {contactTel} <br />
              Website: {contactWebsite} <br />
            </p>
          </div>
        </article>
        <footer className="popup--footer">
          <Link to={"/restaurant/" + restaurant.BranchID + "/menus"}>Menu</Link>
        </footer>
      </div>
    )
  }
};

ArticleRestaurant.propTypes = {
  component: PropTypes.object
};

export default ArticleRestaurant;