import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');

let createHandlers = (ctx) => {
	let onContactButtonToggled = () => {
		ctx.setState((prevState) => {
			return {
				contactsOpened: !prevState.contactsOpened
			};
		});
	};

	return {
		onContactButtonToggled
	};
};

class ArticleRestaurantDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contactsOpened: false
		};

		this.handlers = createHandlers(this);
	}

	render() {
		const { restaurant } = this.props;

		console.log(restaurant);

		const lastImage = (restaurant.images && restaurant.images.length > 0) ? (
	      <img src={restaurant.images[restaurant.images.length - 1].Path} alt={restaurant.images[restaurant.images.length - 1].AltDesc} />
	    ) : null;

	    const logoComponent = (restaurant.CompanyLogoPath) ? (
	    	<div className="restaurant-details--logo">
	    		<div className="restaurant-logo-container">
	    			<img src={restaurant.CompanyLogoPath} alt={restaurant.CompanyLogoAltDesc} />
	    		</div>
			</div>
	    ) : null;

	    const firstContact = (restaurant.contacts && restaurant.contacts.length > 0)
	    	? {
	    		image: {
	    			path: restaurant.contacts[0].ImagePath,
	    			altDesc: restaurant.contacts[0].ImageAltDesc
	    		},
	    		name: restaurant.contacts[0].Firstname + ' ' + restaurant.contacts[0].Lastname,
	    		email: restaurant.contacts[0].Email || restaurant.Email || restaurant.CompanyEmail || '',
	    		tel: restaurant.contacts[0].Tel || restaurant.CompanyTel || '',
	    		website: restaurant.CompanyWebsite || ''
	    	} : {
	    		email: restaurant.Email || restaurant.CompanyEmail,
	    		tel: restaurant.CompanyTel || '',
	    		website: restaurant.CompanyWebsite || ''
	    	};

	    const contactImage = (firstContact.image) ? (
	    	<img src={firstContact.image.path} alt={firstContact.image.altDesc} />
	    ) : (
	    	<img src="../assets/images/icon-person.svg" alt="" />
	    );

	    const contactName = (firstContact.name) ? firstContact.name : 'Contact';

	    const contactClasses = classNames(
	    	"restaurant-details--contact",
	    	(this.state.contactsOpened) ? 'opened' : ''
	    );

	    const contactButtonText = (this.state.contactsOpened) ? 'Hide Contacts': 'Show Contacts';

	    const contactComponent = (firstContact.email && firstContact.tel && firstContact.website) ? (
	    	<div className={contactClasses}>
	    		<div className="contact--image">
	    			{contactImage}
	    		</div>
		    	<div className="contact--details">
					<h4>
						{contactName}
					</h4>

					<div className="contact-blocks">
						{firstContact.email &&
							<div className="contact-block contact-block--email">
								<p>
									Email: <br />
									<a href={"mailto:" + firstContact.email}><span>{firstContact.email}</span></a>
								</p>
							</div>
		                }

		                {firstContact.tel &&
							<div className="contact-block contact-block--tel">
								<p>
									Tel: <br />
									<a href={"tel:" + firstContact.tel}><span>{firstContact.tel}</span></a>
								</p>
							</div>
		                }

		                {firstContact.website &&
							<div className="contact-block contact-block--website">
								<p>
									Website: <br />
									<a href={firstContact.website}><span>{firstContact.website}</span></a>
								</p>
							</div>
		                }
					</div>
				</div>
			</div>
	    ) : null;

	    const cuisinesComponent = (restaurant.cuisines && restaurant.cuisines.length > 0) ? restaurant.cuisines.map((cuisine, index) => {
	    	return (index < restaurant.cuisines.length - 1)
	    		? (
	    			<span className="restaurant-details--cuisine" key={index}>
						{cuisine.Cuisine.Title}
						,&nbsp;
					</span>
				) : (
					<span className="restaurant-details--cuisine" key={index}>
						{cuisine.Cuisine.Title}
					</span>
				)
	    }) : null;

	    const languagesComponent = (restaurant.languages && restaurant.languages.length > 0) ? restaurant.languages.map((lang, index) => {
	    	return (lang.Language.Flag.Path)
	    		? (
	    			<span className="restaurant-details--language" key={index}>
						<img src={lang.Language.Flag.Path} alt={lang.Language.Flag.AltDescription} />
					</span>
				) : (index < restaurant.languages.length - 1)
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

		return (
			<article id="section-restaurant-details" className="section-restaurant-details">
				<div className="restaurant-details--image">
					{lastImage}
				</div>

				{logoComponent}

				<section className="restaurant-details--contacts">
					<header>
						<h1 className="main-title">{restaurant.CompanyName}</h1>
						<h2 className="main-subtitle">
							{restaurant.Address} <br />
							{restaurant.City}, {restaurant.Country}
						</h2>
					</header>

					<div className="">
						<div className="restaurant-details--extra">
							<div className="restaurant-details--item">
								<h3>
									Cuisines: <br />
									{cuisinesComponent}
								</h3>
							</div>
							<div className="restaurant-details--item">
								<h3>
									Languages: <br />
									{languagesComponent}
								</h3>
							</div>
						</div>

						{contactComponent}

						<button className="button--contact" onClick={this.handlers.onContactButtonToggled}>{contactButtonText}</button>
					</div>
				</section>
			</article>
		)
	}
};

ArticleRestaurantDetail.propTypes = {
    restaurant: PropTypes.object
};

export default ArticleRestaurantDetail;