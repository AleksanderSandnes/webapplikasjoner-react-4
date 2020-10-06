import React, {useState} from 'react';

const Todos = ({todos, removeTodo, completeTodo, completedTodos}) => {
    return (
        <>
            <TodoCardList todos={todos} removeTodo={removeTodo} completeTodo={completeTodo} />
            <CompletedList completedTodos={completedTodos}/>
        </>
    );
}
const CompletedListItem = ({t="Title", d="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis ex in augue consectetur egestas nec in justo. Integer dictum tortor nec tincidunt dapibus. Nunc quis nisl quis nibh vehicula elementum.", a="Author author", time="22.12.20"}) => {
    return (
        <article class="sortList">
            <Title title={t}/>
            <p class="author">{a}</p>
            <p class="description">{d}</p>
            <p class="completedDate">{time}</p>
        </article>
    );
}
const Title = ({title}) => {
    return (
        <p class="title">{title}</p>
    );
}
const TodoCard = ({completeTodo, removeTodo, i=-1, t="Title", d="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis ex in augue consectetur egestas nec in justo. Integer dictum tortor nec tincidunt dapibus. Nunc quis nisl quis nibh vehicula elementum.", a="Author author"}) => {
    return (
        <article>
            <Title title={t}/>
            <p class="descriptionForTodo">{d}</p>
            <div>
                <button key={i} onClick={() => removeTodo(i)} class="deleteTodo">Delete</button>
                <button onClick={() => completeTodo(i)} class="completeTodo">Complete</button>
            </div>
            <p style={{display: 'none'}} class="authorForTodo">{a}</p>
        </article>
    );
}
const TodoCardList = ({todos, removeTodo, completeTodo}) => {
    return (
        <section id="todoList">
            {todos.length == 0 ? "Jippi! Ingen todos i dag" :
                todos && todos.length > 0 &&
                todos.map((todo) => (
                    <TodoCard 
                        removeTodo={removeTodo}
                        completeTodo={completeTodo}
                        i={todo.id}
                        t={todo.title}
                        d={todo.desc}
                        a={todo.author}
                    />
                ))
            }
        </section>
    );
}
const CompletedList = ({completedTodos}) => {
    const [titleSearch, setTitleSearch] = useState("")
    const updateTitleSearch = event => {
        setTitleSearch(event.target.value);
        console.log(titleSearch);
    }
    return (
        <section id="completedTodos">
            <p>Completed todos</p>
            <Search titleSearch={titleSearch} updateTitleSearch={updateTitleSearch}/>
            <div id="listOfCompletedTodos">
                <article class="firstLineOnListOfCompletedTodos">
                    <p class="title">Title</p>
                    <p class="author">Author</p>
                    <p class="description">Description</p>
                    <p class="completedDate">Completed date</p>
                </article>
                {completedTodos && completedTodos.length > 0 &&
                    completedTodos.filter((todo) => todo.title.includes(titleSearch)).map(filtrertTodo => (
                        <CompletedListItem
                        t={filtrertTodo.title}
                        d={filtrertTodo.desc}
                        a={filtrertTodo.author}
                        time={filtrertTodo.time}
                    />
                    ))
            }
            </div>
        </section>
    );
}
const Search = ({titleSearch, updateTitleSearch}) => {
    return (
        <div>
            <div>
                <label for="checkbox_FilterByDate">Search on title: </label>
                <input value={titleSearch} onChange={updateTitleSearch} type="text" id="checkbox_FilterByDate" />
            </div>
        </div>
    );
}
export default Todos;