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
            offCanvasOpened: (this.props.offCanvas) ? this.props.offCanvas.isOpened : false,
            footer: (this.props.footer) ? this.props.footer : null
        };
    }

  	render () {
  		const { sections, navigation, footer, title, offCanvasSettings } = this.props;

    	const offCanvasComponent = (offCanvasSettings && offCanvasSettings.isVisible && this.props.offCanvas) ? (
            <OffCanvas isOpened={this.props.offCanvas.isOpened} type={this.props.offCanvas.type || offCanvasSettings.type} offCanvasSettingstransition={this.props.offCanvas.transition || offCanvasSettings.transition || null} component={this.props.offCanvas.component} />
        ) : null;

        console.log(this.props.offCanvas);
        console.log(offCanvasSettings);

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
	            {offCanvasComponent}

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
    offCanvasSettings: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        offCanvas: state._offCanvas.offCanvas
    };
};

export default connect(mapStateToProps)(PageContent);
