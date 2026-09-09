export const ROUTES = {
  notFound: {
    url: '404.html',
  },
  main: {
    url: 'inventory.html',
  },
  login: {
    url: '',
  },
  productPattern: {
    url: 'inventory-item.html?id=',
  },
  shoppingCart: {
    url: 'cart.html',
  },
  checkout: {
    url: 'checkout-step-one.html',
  },
  checkoutOverview: {
    url: 'checkout-step-two.html',
  },
  completeOrder: {
    url: 'checkout-complete.html',
  },
} as const;
