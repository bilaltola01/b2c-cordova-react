import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import PageHeader from './PageHeader';
import MapDetail from './MapDetail';

const classNames = require('classnames');

let createHandlers = (ctx) => {
    let openOffCanvas = () => {
        ctx.setState({
            opened: true
        });
    };

    let closeOffCanvas = () => {
        console.log('popup is about to close!!!');

        let newPopup = {
            isOpened: false,
            type: ctx.props.type,
            component: ctx.props.component,
            text: ctx.props.text,
            actions: ctx.props.actions
        };

        ctx.props.dispatch(actionCreators.setOffCanvas(newPopup, () => {
            ctx.setState({
                opened: false
            });
        }));
    };

    let onButtonClick = (action, component) => {
        closeOffCanvas();
        action.fn(component);
    };

    return {
        onButtonClick
    };
};

class OffCanvas extends Component {
	constructor(props) {
        super(props);
        this.state = {
            opened: props.isOpened || false
        };
        this.handlers = createHandlers(this);
    }

  	render () {
  		const { isOpened, component } = this.props;

  		/*
  		const profile = (this.props.profile && this.props.profile.length > 0 ) ? (

  		) : null;
		*/

  		const headerComponent = (component) ? (
  			switch (component.type) {
  				case: 'MapDetail':
  					return null;
  			}
	    ) : null;

  		const sectionsComponent = (component) ? (
  			switch (component.type) {
  				case: 'MapDetail':
  					return <MapDetail />;
  			}
  		) : null;

		return (
			<div id="popup" className="popup off-canvas">
				{headerComponent}

	            <main id="main" className="main">
	            	{sectionsComponent}
	            </main>
			</div>
		)
	}
};


OffCanvas.propTypes = {
    isOpened: PropTypes.bool,
    component: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        profile: state._profile.profile
    };
};

export default connect(mapStateToProps)(OffCanvas);


