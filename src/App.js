import React, { useState} from 'react';
import './css/createTodo.css';
import './css/startPage.css';
import Modal from './jsx/Modal.jsx';
import Todos from './jsx/Todos.jsx';

export default function App() {
  return (
    <>
      <Nav/>
      <Main/>
    </>
  );
}

const Nav = () => {
  return (
    <nav>
      <img alt="Image of fake HIOF logo" src="./images/hiof.png"/>
      <p>User user</p>
    </nav>
  );
}

const Main = () => {
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [todosToShow, setTodosToShow] = useState([])
  const [formData, setFormData] = useState({id: 0, title: "", desc: "", author: ""});
  let idTodo = 0;

  const addTodo = () => {
    setTodos((prev) => [{id:idTodo, ...formData}, ...prev])
    idTodo++;
    //console.log("length:"+todos.length,"title:"+formData.title, "desc:"+formData.desc, "author:"+formData.author)
  }

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const completeTodo = (id) => {
    const updatedTodos = todos.find((todo) => todo.id === id)
    const date = new Date();
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    const dateString = date.toLocaleDateString('de-DE', options);
    setCompletedTodos((prev) => [{...updatedTodos, time: dateString}, ...prev])
    removeTodo(id);
  }

  const searchTitle = (title) => {
    const searchToShow = title != "" && (completedTodos.filter((todo) => todo.title.includes(title)));
    setTodosToShow((prev) => [{...searchToShow}])
  }

  return (
    <main>
      <TodoButton
        addTodo={addTodo}
        formData={formData}
        setFormData={setFormData}
      />
      <Todos
        todos={todos}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
        completedTodos={completedTodos}
        searchTitle={searchTitle}
        todosToShow={todosToShow}
      />
    </main>
  );
}

const TodoButton = ({addTodo, formData, setFormData}) => {
  const [addTodoShow, setAddTodoShow] = useState(false);
  
  return (
    <div>
      <button onClick={() => setAddTodoShow(!addTodoShow)} id="addTodoBtn">+ TODO</button>
      {addTodoShow && <Modal closeForm={setAddTodoShow} addTodo={addTodo} formData={formData} setFormData={setFormData}/>}
    </div>
  );
}