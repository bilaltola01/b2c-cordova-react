import React, { Component, PropTypes } from 'react';

import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import PageSection from './PageSection';
import OffCanvas from './OffCanvas';

class PageContent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            offCanvas: (this.props.offCanvas) ? this.props.offCanvas : false,
            footer: (this.props.footer) ? this.props.footer : null
        };
    }

    component

  	render () {
  		const { sections, navigation, footer, title, offCanvas } = this.props;
  		const offCanvasOpened = (this.state.offCanvasOpened) ? this.state.offCanvasOpened : false;

    	const OffCanvasComponent = (offCanvas) ? (
        	<OffCanvas isOpened={offCanvas.isOpened} transition={offCanvas.transition} component={offCanvas.component} />
    	) : null;

    	const headerComponent = (navigation) ? (
    		<PageHeader title={title} leftButtons={navigation.leftButtons} rightButtons={navigation.rightButtons} />
	    ) : null;

	    const footerComponent = (footer) ? (
	    	<PageFooter title={footer.title} action={footer.action} />
	    ) : null;

	    const sectionComponents = sections.map((section, index) => {
	        return <PageSection type={section.type} title={section.title} component={section.component} key={index} />;
	    });

	    return (
	        <div>
	            {OffCanvasComponent}

	            {headerComponent}

	            <main id="main" className="main">
	            	{sectionComponents}
	            </main>

	            {footerComponent}
	        </div>
    	)
	}
};

PageContent.propTypes = {
    sections: PropTypes.array,
    navigation: PropTypes.object,
    footer: PropTypes.object,
    title: PropTypes.string,
    offCanvas: PropTypes.object
};

/*
const mapStateToProps = (state) => {
    console.log(state);
    return {
        offCanvas: state._offCanvas.offCanvas,
        footer: state._footer.footer
    };
};
*/

export default PageContent;
