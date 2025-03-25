const initialUser = {};

export const userReducer = (state = initialUser, action) => {
    switch (action.type) {
      case "SET_USER": {
        state = {...action.payload}
        return state
      }
      default: return state
    }
};
