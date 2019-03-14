import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import pushAnalytics from './Analytics/analytics.service';

let createHandlers = (ctx) => {
  let onClosePopup = () => {
    if (ctx.props.onClose) {
      ctx.props.onClose();
    }
  };

  let onLanguageClick = (e, lang, companyId) => {
    pushAnalytics({
      'event': 'menuChooseLanguageItemClick',
      'languageID': lang.LanguageID,
      'branchID': lang.BranchID,
      'languageCode': lang.Code,
      'languageCodeFull': lang.CodeFull,
      'languageTitle': lang.Title,
      'languageName': lang.Name
    }, {
      event: 'menuChooseLanguageItemClick',
			type: 'Language',
			id: lang.LanguageID,
      title: lang.Title,
      companyId: companyId,
    });
    ctx.props.dispatch(actionCreators.setCurrentLanguage(lang, (res) => {
      onClosePopup();
    }));
  };

  return {
    onClosePopup,
    onLanguageClick
  };
};

class ArticlePickLanguage extends Component {
  constructor(props) {
    super(props);

    this.handlers = createHandlers(this);
  }

  render() {
    const { component, companyId, onClose } = this.props;

    //
    // replace concat currentlanguage by english for now ( will be default)
    //
    const defaultLanguage = {
      LanguageID: 23,
      Language: {
        Code: "en",
        CodeFull: "en-GB",
        Flag: {
          FlagID: 23,
          AltDescription: "English",
          Title: "English",
          Path: "https://res.cloudinary.com/one-menu/image/upload/v1509377412/United_Kingdom_vix6gw.svg",
          Date: "2017-10-30T00:00:00.000Z",
          DateUpdated: "2017-07-17T23:00:00.000Z"
        },
        FlagID: 23,
        LanguageID: 23,
        Name: "English",
        Title: "English"
      }
    };

    const finalLanguages = (this.props.currentLanguage && component && component.languages && component.languages.length > 0) ?
      ((component.languages.find(lang => lang.LanguageID === defaultLanguage.LanguageID)) ?
        component.languages : component.languages.concat([
          {
            LanguageID: defaultLanguage.LanguageID,
            Language: defaultLanguage.Language
          }
        ])
      ) : component.languages;

    const languagesComponent = (finalLanguages && finalLanguages.length > 0) ? finalLanguages.map((language, index) => {
      let lang = language.Language;
      return <article className="language clearfix" key={index}>
          <div className="language--item" id="chooseLanguageItemClick" onClick={(e) => this.handlers.onLanguageClick(e, lang, companyId)}>
            {lang && lang.Flag && lang.Flag.Path &&
              <img src={lang.Flag.Path} alt={lang.Flag.AltDescription} />
            }

            {lang && lang.Name &&
              <p>
              {lang.Name}
             </p>
            }
          </div>
        </article>;
    }) : null;

    return (
      <section className="section section--languages">
        {languagesComponent}
      </section>
    )
  }
};

ArticlePickLanguage.propTypes = {
  component: PropTypes.object,
  onClose: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    offCanvas: state._offCanvas.offCanvas,
    currentLanguage: state._currentLanguage.currentLanguage
  };
};

export default connect(mapStateToProps)(ArticlePickLanguage);