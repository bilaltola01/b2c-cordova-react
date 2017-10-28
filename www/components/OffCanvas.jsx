import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import PageHeader from './PageHeader';
import ArticleRestaurantMapDetail from './ArticleRestaurantMapDetail';

const classNames = require('classnames');

let createHandlers = (ctx) => {
    let openOffCanvas = () => {
        ctx.setState({
            isOpened: true
        });
    };

    let onCloseOffCanvas = () => {
        console.log('popup is about to close!!!');

        let newPopup = {
            isOpened: false,
            type: ctx.props.type,
            component: ctx.props.component,
            transition: ctx.props.transition
        };

        ctx.props.dispatch(actionCreators.setOffCanvas(newPopup, () => {
          ctx.setState({
            isOpened: false
          });
        }));
    };

    let onButtonClick = (action, component) => {
        closeOffCanvas();
        action.fn(component);
    };

    return {
        onButtonClick,
        onCloseOffCanvas
    };
};

class OffCanvas extends Component {
	constructor(props) {
    super(props);
    this.state = {
        isOpened: props.isOpened || false
    };
    this.handlers = createHandlers(this);
  }

	render () {
		const { isOpened, type, transition, component } = this.props;

    console.log(this.props);

    const offCanvasClasses = classNames(
      'popup',
      'off-canvas',
      (this.props.offCanvas.isOpened) ? 'opened' : ''
    );

		const headerComponent = (type) ? ((t) => {
			switch (t) {
				case 'MapDetail':
					return null;
			}
    })(type) : null;

		const sectionsComponent = (type) ? ((t) => {
			switch (t) {
				case 'MapDetail':
					return <ArticleRestaurantMapDetail component={component} onClose={this.handlers.onCloseOffCanvas} />;
			}
		})(type) : null;

	  return (
			<div id="popup" className={offCanvasClasses}>
				{headerComponent}

        <div>
        	{sectionsComponent}
        </div>
			</div>
	  )
  }
};


OffCanvas.propTypes = {
    isOpened: PropTypes.bool,
    type: PropTypes.string,
    transition: PropTypes.object,
    component: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        offCanvas: state._offCanvas.offCanvas
    };
};

export default connect(mapStateToProps)(OffCanvas);


