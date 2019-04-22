import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';
import pushAnalytics from './Analytics/analytics.service';

let createHandlers = ctx => {
  let onRestaurantClick = restaurant => {
    pushAnalytics(
      {
        event: 'homeRestaurantClick',
        branchAddress: restaurant.Address,
        branchCity: restaurant.City,
        branchName: restaurant.Name,
        branchCountry: restaurant.Country,
        branchID: restaurant.BranchID,
        companyID: restaurant.CompanyID,
        companyName: restaurant.CompanyName,
        companyWebsite: restaurant.CompanyWebsite,
      },
      {
        event: 'homeRestaurantClick',
        type: 'Branch',
        id: restaurant.BranchID,
        title: restaurant.Name,
        companyId: restaurant.CompanyID,
      },
    );
  };

  return {
    onRestaurantClick,
  };
};

class ArticleRestaurant extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this);
  }

  render() {
    const { restaurant } = this.props;

    const firstImage =
      restaurant.images && restaurant.images.length > 0 ? (
        <img src={restaurant.images[0].Path} alt={restaurant.images[0].AltDesc} />
      ) : null;

    const lastImage =
      restaurant.images && restaurant.images.length > 0 ? (
        <img
          src={restaurant.images[restaurant.images.length - 1].Path}
          alt={restaurant.images[restaurant.images.length - 1].AltDesc}
        />
      ) : null;

    return (
      <article className="article--restaurant">
        <Link
          className="homeToRestaurant"
          onClick={() => {
            this.handlers.onRestaurantClick(restaurant);
          }}
          to={'/restaurants/' + restaurant.BranchID + '/menus'}
        >
          <div className="overlay overlay--black" />
          {lastImage}

          <footer className="restaurant--footer grid">
            <div className="col-2-3">
              <h3>{restaurant.CompanyName}</h3>
              <h4 className="small-text">{restaurant.Address + ', ' + restaurant.City}</h4>
            </div>
            <div className="col-1-3 push-right distance">
              <p className="small-text">{restaurant.Distance} km</p>
            </div>
          </footer>
        </Link>
      </article>
    );
  }
}

ArticleRestaurant.propTypes = {
  restaurant: PropTypes.object,
};

export default ArticleRestaurant;
