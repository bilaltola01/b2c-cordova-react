import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

class ArticleMenuDetail extends Component {
  render() {
		const { menu } = this.props;

    const categoryNavigation = menu.cate

		return (
      <article className="article--restaurant">

        <Link to={"/restaurant/" + restaurant.BranchID + "/menus"}>
          {firstImage}

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

ArticleMenuDetail.propTypes = {
	menu: PropTypes.object
};

export default ArticleMenuDetail;