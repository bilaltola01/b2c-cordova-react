import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

class ArticleMenu extends Component {
  render() {
<<<<<<< HEAD
		const { menu, currency, languages } = this.props;

    const symbol = (currency && currency.Currency) ? currency.Currency.Symbol : '£';

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

=======
		const { menu, currency } = this.props;

    const symbol = (currency && currency.Currency) ? currency.Currency.Symbol : '£';

>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
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
<<<<<<< HEAD
          <div className="restaurant-details--item">
            <h3>
              {languagesComponent}
            </h3>
          </div>
=======
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
        </Link>
      </section>
    ) : null;

		return menuComponent;
	}
};

ArticleMenu.propTypes = {
	menu: PropTypes.object,
<<<<<<< HEAD
  currency: PropTypes.object,
  languages: PropTypes.array
=======
  currency: PropTypes.object
>>>>>>> 527bce22db10fb800e6664a521e2dcd562506bd8
};

export default ArticleMenu;