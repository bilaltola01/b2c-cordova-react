import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');
const Flickity = require('flickity');
import * as DomUtils from '../shared/dom.utils';
import pushAnalytics from './Analytics/analytics.service';

const initNavigation = $el =>
  new Flickity($el, {
    cellAlign: 'left',
    freeScroll: true,
    prevNextButtons: false,
    pageDots: false,
    contain: true,
  });

const getInitialCategoryId = categories => (categories[0] || {}).CategoryID;
const getCategoryIdByIndex = (categories, index) => (categories[index] || {}).CategoryID;

const getMealsByCategoryId = (meals, categoryId) =>
  meals.filter(meal => meal.item.CategoryID === categoryId);

class SubNav extends Component {
  static propTypes = {
    categories: PropTypes.array,
    currentItem: PropTypes.number,
    onNavItemClick: PropTypes.func,
  };

  static defaultProps = {
    categories: [],
  };

  constructor(props) {
    super(props);
    this.onNavItemClick = this.onNavItemClick.bind(this);
    this.state = {
      selectedCategoryId: getInitialCategoryId(props.categories),
    };
  }

  componentDidMount() {
    const { companyId, categories } = this.props;
    const menuCategory = categories[0];
    this.nav = initNavigation(document.getElementById('navigation-scroll'));
    this.nav.on('staticClick', this.onNavItemClick);
    pushAnalytics(
      {
        event: 'menuFirstCategoryClick',
        menuID: menuCategory.MenuID,
        menuCategoryID: menuCategory.MenuCategoryID,
        categoryStandardID: menuCategory.Category.CategoryStandardID,
        menuCategoryTitle: menuCategory.Category.Title,
        menuCategoryDescription: menuCategory.Category.Description,
      },
      {
        event: 'menuFirstCategoryClick',
        type: 'MenuCategory',
        id: menuCategory.MenuCategoryID,
        title: menuCategory.Category.Title,
        companyId,
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menu) {
      this.setState({
        selectedCategoryId: getInitialCategoryId(nextProps.menu),
      });
    }
  }

  onNavItemClick(e, pointer, el, index) {
    const { onNavItemClick, categories } = this.props;
    if (e.target.parentNode.tagName === 'LI') {
      this.setState(
        {
          selectedCategoryId: getCategoryIdByIndex(categories, index) || 0,
        },
        () => {
          if (onNavItemClick) {
            onNavItemClick(index);
          }
        },
      );
    }
  }

  render() {
    const { categories, companyId, currentItem, onNavItemClick } = this.props;
    const { selectedCategoryId } = this.state;

    const classes = classNames(
      'navigation-scroll',
      categories.length <= 3 && categories.length > 1
        ? 'subnav-' + categories.length + '-items'
        : '',
    );

    return (
      <div id="navigation-scroll-container" className="subnav navigation-scroll-container">
        <nav>
          <ul id="navigation-scroll" className={classes}>
            {categories
              .sort((a, b) => a.Category.Order - b.Category.Order)
              .map((category, index) => {
                return currentItem === index ? (
                  <li key={index}>
                    <div className="subnav--item active">{category.Category.Title}</div>
                  </li>
                ) : (
                  <li key={index}>
                    <div className="subnav--item">{category.Category.Title}</div>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    );
  }
}

export default SubNav;
