import {combineReducers} from 'redux';

import {reducer as ThemeReducer} from './ThemeRedux';
import {reducer as BottomRedux} from './bottomRedux';

export default combineReducers({
  theme: ThemeReducer,
  bottom: BottomRedux,
});
