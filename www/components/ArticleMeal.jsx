import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';
import { MAP_CONSTANTS } from  '../shared/mapping.utils';

let createHandlers = (ctx) => {
  let onMealClick = (meal) => {
    window.dataLayer.push({
      'event': 'menuMealClick',
      'menuID': meal.MenuCategoryID,
      'mealDetailID': meal.MealDetailID,
      'mealID': meal.MealID,
      'mealTitle': meal.Title,
      'mealPrice': meal.Price,
      'mealEnableDetails': meal.EnableDetails,
      'mealDescription': meal.Description
    });
  };

  return {
    onMealClick
  };
};

class ArticleMeal extends Component {
 	constructor(props) {
    	super(props);

      this.handlers = createHandlers(this);
  	}

  	getTranslatedMeal(lang, translations) {
    	if (!lang || !translations || translations.length <= 0) {
      		return null;
    	}

    	const langTranslations = translations.filter(t => {
      		return (t.BranchLanguageID === lang.BranchLanguageID) || (t.BranchLanguageName === lang.Title);
    	});

    	const title = (langTranslations && langTranslations.length > 0) ? langTranslations.find(lang => lang.PropKey === 'title').Text : null;
    	const description = (langTranslations && langTranslations.length > 0) ? langTranslations.find(lang => lang.PropKey === 'description').Text : null;

    	if (!title && !description) {
    		return null;
    	}

    	return {
    		title: title,
    		description: description
    	};
  	}

  	isCurrentLanguageDefault(language) {
  		return language.LanguageID === 23;
  	}

	render() {
		const { meal, currency, index, currentLanguage } = this.props;

		const symbol = (currency && currency.Currency) ? currency.Currency.Symbol : MAP_CONSTANTS.DEFAULT_LANGUAGE_SYMBOL;

		const translatedMeal = this.getTranslatedMeal(currentLanguage, meal.translations);

		const titleComponent = (translatedMeal && !this.isCurrentLanguageDefault(currentLanguage)) ? (
    	<h2>{translatedMeal.title}<br />
      		<em>({meal.Title})</em>
    	</h2>
  	) : (
      <h2>{meal.Title}</h2>
    );

  	const descriptionComponent = (translatedMeal && !this.isCurrentLanguageDefault(currentLanguage)) ? (
  		<p className="meal--desc">
  			{translatedMeal.description}
  		</p>
  	) : (
  		<p className="meal--desc">
  			{meal.Description}
  		</p>
  	);

    const reviewComponent = (index === 0) ? (
  		<div className="reviews">
  			<header>
  				<h3>How was your meal?</h3>
  				<p>
  					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut nisl ac justo dapibus molestie at ac nibh.
  				</p>
  			</header>
    		<ul className="reviews-menu">
    			<li><img src="assets/images/icon_drawn_heart.png" alt="" /></li>
    			<li><img src="assets/images/icon_drawn_heart.png" alt="" /></li>
    			<li><img src="assets/images/icon_drawn_heart.png" alt="" /></li>
    			<li><img src="assets/images/icon_drawn_heart.png" alt="" /></li>
    			<li><img src="assets/images/icon_drawn_heart.png" alt="" /></li>
    		</ul>
  		</div>
  	) : null;

  	return (
    	<section className="meal">
        <div className="meal--container" onClick={() => {this.handlers.onMealClick(meal)}}>
	        <div className="meal--header">
	            <div className="price">
	            	{symbol} {meal.Price}
	            </div>
	            <header>
	            	{titleComponent}
	        	</header>
	        </div>
      		<div className="meal--content">
      			{descriptionComponent}
      		</div>

          {/*
        		<div className="meal--review">
        			{reviewComponent}
        		</div>
            */
          }
        </div>
    	</section>
  	);
	}
};

ArticleMeal.propTypes = {
	meal: PropTypes.object,
  	currency: PropTypes.object,
  	currentLanguage: PropTypes.object
};

export default ArticleMeal;