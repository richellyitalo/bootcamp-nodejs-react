const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, { ...action.product, amount: 1 }];
    default:
      return state;
  }
}
