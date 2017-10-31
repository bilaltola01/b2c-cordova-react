import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

class ArticleMenu extends Component {
  render() {
		const { menu, currency } = this.props;

    const symbol = (currency && currency.Currency) ? currency.Currency.Symbol : '£';

    const menuComponent = (menu.categories && menu.categories.length > 0) ? (
      <section className="meal">

        <Link to={"/restaurant/" + menu.BranchID + "/menu/" + menu.MenuID} className="menu--link">
          <div className="meal--header">
            <div className="price">
              {symbol} {menu.Price}
            </div>
            <header>
              <h2>{menu.Title}</h2>
            </header>
          </div>
          <div className="meal--content">
            <p className="meal--desc">
              {menu.Description}
            </p>
          </div>
        </Link>
      </section>
    ) : null;

		return menuComponent;
	}
};

ArticleMenu.propTypes = {
	menu: PropTypes.object,
  currency: PropTypes.object
};

export default ArticleMenu;