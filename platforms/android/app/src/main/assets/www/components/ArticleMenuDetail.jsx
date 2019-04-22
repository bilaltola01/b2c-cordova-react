import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';
import ArticleMeal from './ArticleMeal';

class ArticleMenuDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { category, currency, companyId, language } = this.props;
    const meals = category.meals.sort((a, b) => {
      if (a.Order && b.Order) {
        return a.Order - b.Order;
      }

      return a.MealID - b.MealID;
    });
    const mealsComponent =
      category && meals && meals.length > 0
        ? meals.map((meal, index) => {
            return (
              <ArticleMeal
                companyId={companyId}
                meal={meal}
                currency={currency}
                currentLanguage={language}
                index={index}
                key={index}
              />
            );
          })
        : null;

    return <article className="menu--category">{mealsComponent}</article>;
  }
}

ArticleMenuDetail.propTypes = {
  category: PropTypes.object,
  currency: PropTypes.object,
  language: PropTypes.object,
};

export default ArticleMenuDetail;
