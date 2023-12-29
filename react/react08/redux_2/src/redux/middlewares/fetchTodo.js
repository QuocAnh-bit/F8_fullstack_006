// Thunk middleware là 1 func trong 1 func khác
export const fetchTodo = () => {
  return async (dispatch) => {
    // console.log(getState());
    // dispatch({ type: "counter/increment", payload: 100 });
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(data);
    dispatch({ type: "todo/fetch", payload: data });
  };
};
