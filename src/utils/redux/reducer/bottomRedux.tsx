const types = {
  SHOT_BOTTOM: 'SHOT_BOTTOM',
};

export const actions = {
  changeBottom: (dispatch: any, pages: any, show: any) =>
    dispatch({type: types.SHOT_BOTTOM, pages, show}),
};

const initialState = {
  show: false,
  pages: 0,
};

export const reducer = (state = initialState, action: any) => {
  const {type, pages, show} = action;
  switch (type) {
    case types.SHOT_BOTTOM:
      return {...state, show, pages};

    default:
      return state;
  }
};
