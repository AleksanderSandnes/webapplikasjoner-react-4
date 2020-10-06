import React, {useState} from 'react';

const Modal = ({closeForm, addTodo, formData, setFormData}) => {
    const [descLength, setDescLength] = useState(50);

    const handleSubmit = (eventHandleSubmit) => {
        eventHandleSubmit.preventDefault();
        {descLength >= 0 ? addTodo() : alert("Maks 50 char på 'beskrivelsen'")}
        setFormData({title: "", desc: "", author: ""});
        closeForm(false);
    }

    const updateFormData = (eventFormdata, name) => {
        setFormData({...formData, [name]: eventFormdata.target.value });
        name == "desc" && setDescLength(50 - eventFormdata.target.value.length);
    }

    return (
        <div id="beforeCreateTodo">
            <section id="createTodo">
                <div id="notExitable">
                    <div>
                        <p>New todo</p>
                        <p onClick={() => closeForm(false)} id="exitCreateTodo" class="exit">X</p>
                    </div>
                    <p id="feilmelding"></p>
                    <form onSubmit={handleSubmit}>
                        <label for="titleOnNewTodo">Title</label>
                        <input value={formData.title} onChange={(e) => updateFormData(e, 'title')} type="text" id="titleOnNewTodo" required/>
                        <label for="descriptionOnNewTodo">Description (<span>{descLength}</span> characters left)</label>
                        <input value={formData.desc} onChange={(e) => updateFormData(e, 'desc')} type="text" id="descriptionOnNewTodo" required/>
                        <label for="authorOnNewTodo">Author</label>
                        <input value={formData.author} onChange={(e) => updateFormData(e, 'author')} type="text" id="authorOnNewTodo" required/>
                        <input type="submit" id="addTodoToTodos" value="Create" />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Modal;