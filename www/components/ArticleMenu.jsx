import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';
import { MAP_CONSTANTS } from  '../shared/mapping.utils';
import pushAnalytics from './Analytics/analytics.service';

let createHandlers = (ctx) => {
  let onMenuClick = (menu, companyId) => {
    pushAnalytics({
      'event': 'restaurantDetailMenu',
      'menuID': menu.MenuID,
      'branchID': menu.BranchID,
      'menuPrice': menu.Price,
      'menuTitle': menu.Title,
      'menuDescription': menu.Description
    }, {
      event: 'restaurantDetailMenuClick',
			type: 'Menu',
			id: menu.MenuID,
      title: menu.Title,
      companyId: companyId,
    });
  };

  return {
    onMenuClick
  };
};

class ArticleMenu extends Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this);
  }

  render() {
		const { menu, companyId, currency, languages } = this.props;

    const symbol = (currency && currency.Currency) ? currency.Currency.Symbol : MAP_CONSTANTS.DEFAULT_LANGUAGE_SYMBOL;

    const languagesComponent = (languages && languages.length > 0) ? languages.map((lang, index) => {
      return (lang.Language.Flag && lang.Language.Flag.Path)
        ? (
          <span className="restaurant-details--language" key={index}>
          <img src={lang.Language.Flag.Path} alt={lang.Language.Flag.AltDescription} />
        </span>
      ) : (index < languages.length - 1)
          ? (
          <span className="restaurant-details--language" key={index}>
            {lang.Language.Name}
            ,&nbsp;
          </span>
        ) : (
          <span className="restaurant-details--language" key={index}>
            {lang.Language.Name}
          </span>
        )
    }) : null;

    const menuComponent = (menu.categories && menu.categories.length > 0) ? (
      <section className="meal">

        <Link onClick={() => {this.handlers.onMenuClick(menu, companyId)}} to={"/restaurant/" + menu.BranchID + "/menu/" + menu.MenuID} className="menu--link restaurantDetailToMenu meal--container">
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
          <div className="restaurant-details--item">
            <h3>
              {languagesComponent}
            </h3>
          </div>
        </Link>
      </section>
    ) : null;

		return menuComponent;
	}
};

ArticleMenu.propTypes = {
	menu: PropTypes.object,
  currency: PropTypes.object,
  languages: PropTypes.array
};

export default ArticleMenu;