import Realm from 'realm';
import {setting} from './schemas';

let settingRepository = new Realm({
  schema: [setting],
});

class SettingModel {
  id: string;
  name: any;
  value: any;
  constructor(name: any, value: any) {
    this.id = Utils.guid();
    this.name = name;
    this.value = value;
  }
}

let SettingService = {
  save: function (name: any, value: any) {
    if (
      settingRepository.objects('Setting').filtered("name = '" + name + "'")
        .length
    ) {
      return false;
    }

    settingRepository.write(() => {
      settingRepository.create('Setting', new SettingModel(name, value));
    });
  },
  find: (name: any) => {
    return settingRepository.objects('Setting').filtered('name == $0', name)[0];
  },
  update: (settings: SettingModel) => {
    settingRepository.write(() => {
      settingRepository.create('Setting', settings, Realm.UpdateMode.Modified);
    });
  },
};

let Utils = {
  guid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  },

  move: function (array: any, fromIndex: any, toIndex: any) {
    return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  },
};

export {settingRepository, SettingModel, SettingService};
