import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

class ArticleRestaurant extends Component {
  render() {
		const { restaurant } = this.props;

    const firstImage = (restaurant.images && restaurant.images.length > 0) ? (
      <img src={restaurant.images[0].Path} alt={restaurant.images[0].AltDesc} />
    ) : null;

    const lastImage = (restaurant.images && restaurant.images.length > 0) ? (
        <img src={restaurant.images[restaurant.images.length - 1].Path} alt={restaurant.images[restaurant.images.length - 1].AltDesc} />
      ) : null;

		return (
      <article className="article--restaurant">
        <Link to={"/restaurants/" + restaurant.BranchID + "/menus"}>
          <div className="overlay overlay--black"></div>
          {lastImage}

          <footer className="restaurant--footer grid">
            <div className="col-2-3">
              <h3>{restaurant.CompanyName}</h3>
              <h4 className="small-text">{restaurant.City}</h4>
            </div>
            <div className="col-1-3 push-right">
              <p className="small-text">
                {restaurant.Distance} km
              </p>
            </div>
          </footer>
        </Link>
      </article>
    )
	}
};

ArticleRestaurant.propTypes = {
	restaurant: PropTypes.object
};

export default ArticleRestaurant;