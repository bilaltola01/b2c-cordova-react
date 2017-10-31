import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';
import ArticleMeal from './ArticleMeal';

class ArticleMenuDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		const { category, currency, language } = this.props;

    console.log(category);
    console.log(language);

    const mealsComponent = (category && category.meals && category.meals.length > 0) ? category.meals.map((meal, index) => {
      return <ArticleMeal meal={meal} currrency={currency} currentLanguage={language} key={index} />
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