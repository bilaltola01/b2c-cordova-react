import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import PageHeader from './PageHeader';
import ArticleRestaurantMapDetail from './ArticleRestaurantMapDetail';
import ArticlePickLanguage from './ArticlePickLanguage';

const classNames = require('classnames');

let createHandlers = (ctx) => {
    let openOffCanvas = () => {
        ctx.setState({
            isOpened: true
        });
    };

    let onCloseOffCanvas = () => {
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
    const { isOpened, type, transition, companyId, component } = this.props;
    
    console.log('offcanvas');
    console.log(this.props);

    const finalComponent = (type) ? ((t, c) => {
      switch (t) {
        case 'PickLanguage':
          // Retrieve dynamically component from store
          let languages = (this.props.branchLanguages && this.props.branchLanguages.length > 0) ? this.props.branchLanguages : null;
          return {
            languages
          };
        default:
          return c;
      }
    })(type, component) : component;

    const offCanvasClasses = classNames(
      'popup',
      'off-canvas',
      (this.props.type) ? 'popup--' + this.props.type : '',
      (this.props.offCanvas.isOpened) ? 'opened' : ''
    );

		const headerComponent = (type) ? ((t) => {
			switch (t) {
				case 'MapDetail':
					return null;
        case 'PickLanguage':
          let leftButtons = [
            {
              title: 'Back',
              position: 'left',
              action: {
                type: 'click',
                component: {
                  fn: this.handlers.onCloseOffCanvas
                }
              }
            }
          ];
          return <PageHeader title="Pick a Language" leftButtons={leftButtons} rightButtons={[]} />;
			}
    })(type) : null;

		const sectionsComponent = (type) ? ((t) => {
			switch (t) {
				case 'MapDetail':
					return <ArticleRestaurantMapDetail component={finalComponent} onClose={this.handlers.onCloseOffCanvas} />;
        case 'PickLanguage':
          return <ArticlePickLanguage companyId={companyId} component={finalComponent} onClose={this.handlers.onCloseOffCanvas} />;
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
    return {
        offCanvas: state._offCanvas.offCanvas,
        branchLanguages: state._branchLanguages.branchLanguages
    };
};

export default connect(mapStateToProps)(OffCanvas);


