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
              type: 'link',
              path: '/map'
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
              type: 'link',
              path: '/'
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
              type: 'link',
              path: '/map'
            }
          }
        ],
        rightButtons: []
      },
      footer: {},
      offCanvas: {}
    }]
  ]),
};

Pages.getPageAttribute = (page, attr) => {
  return Pages.pages.get(page)[attr];
}