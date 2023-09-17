const todos = {
  name: 'Todo',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    title: 'string',
    description: 'string',
    completed: 'bool',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

const setting = {
  name: 'Setting',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    name: 'string',
    value: 'string',
  },
};

export {todos, setting};
