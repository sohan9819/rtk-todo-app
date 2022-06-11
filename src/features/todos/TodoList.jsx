// add imports
import { FiTrash2, FiUpload } from 'react-icons/fi';
import { useState } from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../api/apiSlice';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    //addTodo
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor='new-todo'>Enter a new todo item</label>
      <div className='new-todo'>
        <input
          type='text'
          id='new-todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Enter new todo'
        />
      </div>
      <button className='submit'>
        <FiTrash2 />
      </button>
    </form>
  );

  let content;
  // Define conditional content
  if (isLoading) {
    content = <p>Loading ... </p>;
  } else if (isSuccess) {
    content = todos.map((todo) => (
      <article key={todo.id}>
        <div className='todo'>
          <input
            type='checkbox'
            checked={todo.completed}
            id={todo.id}
            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
            className="todo-checkbox"
          />
          <label htmlFor={todo.id} className="todo-label">{todo.title}</label>
        </div>
        <button className='trash' onClick={() => deleteTodo({ id: todo.id })}>
          <FiTrash2 />
        </button>
      </article>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
