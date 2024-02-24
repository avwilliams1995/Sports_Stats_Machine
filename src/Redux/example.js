
let store = {
  userInfo: {
    userInfoReducer: {
      state: {
        username: '',
        password: ''
      },
      login: {
        edit: ['username', 'password'],
        method: 'replace',
        influence: 'String'
      },
      editUsername: {
        edit: ['username'],
        method: 'replace',
        influence: 'String'
      }
    }
  },
  totalItems: {
    totalItemsReducer: {
      state: {
        items: 0,
        favorites: []
      },
      addItem: {
        edit: ['items'],
        method: 'add',
        influence: 1

      },
      deleteItem: {
        edit: ['items'],
        method: 'subtract',
        influence: 1

      },
      addFavorite: {
        edit: ['favorites'],
        method: 'add',
        influence: 'String'
      }
    }
  }

}
