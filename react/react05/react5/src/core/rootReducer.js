// Quản lý State
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "counter/increment": {
      return { ...state, count: state.count + 1 };
    }
    case "counter/decrement": {
      return { ...state, count: state.count - 1 };
    }
    case "chat/add": {
      const message = [...state.message];
      message.push(action.payload);
      return { ...state, message };
    }
    case "chat/fetch": {
      return { ...state, message: action.payload };
    }
    default: {
      return state;
    }
  }
};
