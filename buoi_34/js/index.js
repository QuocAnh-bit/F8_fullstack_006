const urlApi = `https://35y4ks-8080.csb.app/todos`;

// Lấy dữ liệu từ API về
const getTodos = async () => {
  const response = await fetch(urlApi);
  const json = await response.json();
  return json;
};

//Thêm dữ liệu
// tham số chuyền vào là 1 Oj
const postTodo = async (options) => {
  const response = await fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const json = await response.json();
  return json;
};

//Edit todo
const patchTodos = async (id, title, completed) => {
  const response = await fetch(urlApi + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed }),
  });
  const json = await response.json();
  return json;
};
const deleteTodos = async (id) => {
  const response = await fetch(urlApi + "/" + id, {
    method: "DELETE",
  });
  const json = await response.json();
  return json;
};
const getTodo = async (id) => {
  const response = await fetch(urlApi + "/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};
const container = document.querySelector(".container");
const todoList = document.querySelector(".todo-list");

const renderItemTodo = async () => {
  let count = 0;

  data = await getTodos();
  todoList.innerHTML = "";
  const btnCompleted = document.createElement("button");
  btnCompleted.className = "btn-completed";
  btnCompleted.innerText = " Completed Todos";
  const countCompleted = document.createElement("span");
  countCompleted.className = "count-todo";
  btnCompleted.append(countCompleted);
  todoList.append(btnCompleted);

  if (data.length) {
    data.map(({ id, title, completed }) => {
      html = `
      <div class="item-todo ${
        completed ? "completed" : ""
      }" data-index = "${id}">
     <span class="name-todo">${title}</span>
     <div class="item-control">
       <button class="btn-del">Del</button>
       <button class="btn-edit">Edit</button>
       <button class="done">done</button>
     </div>
   </div> 
     `;
      if (completed) {
        count++;
        btnCompleted.insertAdjacentHTML("afterend", html);
        // console.log(count);
      } else {
        todoList.insertAdjacentHTML("afterbegin", html);
      }
    });
  }
  await handleAdd();

  // console.log(data);
  // xử lý đếm
  // const countCompleted = btnCompleted.querySelector(".count-todo");
  // console.log(countCompleted);

  countCompleted.innerText = `  ${count}`;

  // Completed
  const doneList = document.querySelectorAll(".done");
  doneList.forEach((btnDone) => {
    btnDone.addEventListener("click", () => {
      const todoId = btnDone.parentElement.parentElement.dataset.index;
      handleDone(todoId);
    });
  });

  //Del
  const delList = document.querySelectorAll(".btn-del");
  delList.forEach((btnDel) => {
    btnDel.addEventListener("click", () => {
      const todoId = btnDel.parentElement.parentElement.dataset.index;
      handleDel(todoId);
    });
  });
  const editList = document.querySelectorAll(".btn-edit");
  editList.forEach((btnEdit) => {
    btnDel.addEventListener("click", () => {
      const todoId = btnEdit.parentElement.parentElement.dataset.index;
    });
  });
};

renderItemTodo();

const handleAdd = async () => {
  const overLayAdd = document.createElement("div");
  overLayAdd.className = "overlay-add";
  const html = `
        <form class="form-add">
           <input
             type="text"
             class="add-todo-input"
             placeholder="Add Todo"
             required
           />
           <hr />
           <div class="control-add">
             <button type="submit" class="btn-save">Save</button>
             <button type="button" class="btn-cancel">Cancel</button>
           </div>
         </form>`;
  overLayAdd.innerHTML = html;

  const btnAdd = document.querySelector(".btn-add");
  btnAdd.addEventListener("click", () => {
    container.append(overLayAdd);
    const cancel = document.querySelector(".btn-cancel");
    cancel.addEventListener("click", () => {
      container.removeChild(container.lastChild);
    });
    const formAdd = document.querySelector(".form-add");
    formAdd.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputValue = formAdd.querySelector(".add-todo-input").value;
      const options = { title: inputValue, completed: false };
      await postTodo(options);
      inputValue.value = "";
      renderItemTodo();
      container.removeChild(container.lastChild);
    });
  });
};

const handleDone = async (todoId) => {
  const { id, title, completed } = await getTodo(todoId);
  if (completed === true) {
    await patchTodos(id, title, false);
  } else {
    await patchTodos(id, title, true);
  }
  renderItemTodo();
};
const handleEdit = async (todoId) => {};
const handleDel = async (todoId) => {
  await deleteTodos(todoId);
  renderItemTodo();
};
