import * as Immutable from 'seamless-immutable';

const mockData = {
  numberOfClothes: 30
};

export const clothesReducer = (state = Immutable.from(mockData), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
