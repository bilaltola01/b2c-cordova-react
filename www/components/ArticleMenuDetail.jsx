import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';
import ArticleMeal from './ArticleMeal';

class ArticleMenuDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		const { category, currency, language } = this.props;

    const mealsComponent = (category && category.meals && category.meals.length > 0) ? category.meals.map((meal, index) => {
      return <ArticleMeal meal={meal} currrency={currency} currentLanguage={language} index={index} key={index} />
    }) : null;

		return (
      <article className="menu--category">
        {mealsComponent}
      </article>
    )
	}
};

ArticleMenuDetail.propTypes = {
	category: PropTypes.object,
  currency: PropTypes.object,
  language: PropTypes.object
};

export default ArticleMenuDetail;