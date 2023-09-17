import Realm from 'realm';
import {todos} from './schemas';

let todoRepository = new Realm({
  schema: [todos],
});

let TodoService = {
  findAll: function (sortBy?: any) {
    if (!sortBy) {
      sortBy = [
        ['completed', false],
        ['updatedAt', true],
      ];
    }
    return todoRepository.objects('Todo').sorted(sortBy);
  },

  find: (name: any) => {
    return todoRepository.objects('Todo').filtered('title == $0', name);
  },

  remove: (name: any) => {
    todoRepository.write(() => {
      todoRepository.delete(TodoService.find(name));
    });
  },

  save: function (todo: TodoModel) {
    if (
      todoRepository.objects('Todo').filtered("title = '" + todo.title + "'")
        .length
    ) {
      return;
    }

    todoRepository.write(() => {
      todo.createdAt = new Date();
      todo.updatedAt = new Date();
      todoRepository.create('Todo', todo);
    });
  },

  update: function (todo: any, callback: any) {
    if (!callback) {
      return;
    }
    todoRepository.write(() => {
      callback();
      todo.updatedAt = new Date();
    });
  },
};

class TodoModel {
  id: string;
  title: any;
  completed: any;
  createdAt: Date;
  updatedAt: Date;
  constructor(title: any, completed: any) {
    this.id = Utils.guid();
    this.title = title;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

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

export {todoRepository, TodoService, TodoModel};
