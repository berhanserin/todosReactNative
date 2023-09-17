import {SettingModel, SettingService} from '@/models/setting';

const types = {
  DARK_THEME: 'DARK_THEME',
};

export const actions = {
  setDarkTheme: (dispatch: any, status: any) =>
    dispatch({type: types.DARK_THEME, isDark: status}),
};

const initialState = {
  isDark: false,
};

export const reducer = (state = initialState, action: any) => {
  const {type, isDark} = action;
  switch (type) {
    case types.DARK_THEME:
      let data: {id: string; name: string; value: string} =
        SettingService.find('theme').toJSON();
      let theme: SettingModel = {
        id: data.id,
        name: data.name,
        value: data.value,
      };
      theme.value = isDark;
      SettingService.update(theme);
      return {...state, isDark: isDark === 'dark'};

    default:
      return state;
  }
};
