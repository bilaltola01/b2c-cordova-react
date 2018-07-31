export let Pages = {
  pages: new Map([
    ['Home', {
      title: 'Restaurants',
      navigation: {
        leftButtons: [
          {
            title: 'Location',
            position: 'left',
            action: {
              type: 'menu',
              component: {}
            }
          }
        ],
        rightButtons: []
      },
      footer: {},
      offCanvas: {}
    }],
    ['Map', {
      title: 'Map',
      navigation: {
        leftButtons: [
          {
            title: 'Back',
            position: 'left',
            action: {
              type: 'menu',
              component: {}
            }
          }
        ],
        rightButtons: []
      },
      footer: {},
      offCanvas: {
        isVisible: true,
        type: 'MapDetail'
      }
    }],
    ['Restaurant', {
      title: 'Restaurant',
      navigation: {
        leftButtons: [
          {
            title: 'Back to Map',
            position: 'left',
            action: {
              type: 'menu',
              component: {}
            }
          }
        ],
        rightButtons: []
      },
      footer: {},
      offCanvas: {}
    }],
    ['Menu', {
      title: 'Menu',
      navigation: {
        leftButtons: [
          {
            title: 'Back to Restaurant',
            position: 'left',
            action: {
              type: 'menu',
              component: {}
            }
          }
        ],
        rightButtons: [
          {
            title: 'Choose your Language',
            position: 'right',
            action: {
              type: 'pick-language',
              component: {}
            }
          }
        ]
      },
      footer: {},
      offCanvas: {
        isVisible: true,
        type: 'PickLanguage'
      }
    }]
  ]),
};

Pages.getPageAttribute = (page, attr) => {
  return Pages.pages.get(page)[attr];
}