import React, { useRef, useState } from "react";
import "../Todo.css";
import { MdDelete } from "react-icons/md";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { MdOutlineFavorite, MdFavorite } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [des, setDes] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'favorites', 'deleted'

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    setTodos([...todos, { list: todo, list_des: des, id: Date.now(), status: false, favorite: false, deleted: false }]);
    console.log(todos);
    setTodo("");
    setDes("");
  };

  const inputRef = useRef("null");

  useRef(() => {
    inputRef.current.focus(); //to focus input field
  });

  const onDelete = (id) => {
    let updatedTodos = todos.map((to) => {
      if (to.id === id) {
        return { ...to, deleted: true }; // Mark as deleted
      }
      return to;
    });
    setTodos(updatedTodos);
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  const onFavourite = (id) => {
    let favoriteList = todos.map((list) => {
      if (list.id === id) {
        return { ...list, favorite: !list.favorite };
      }
      return list;
    });
    setTodos(favoriteList);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") {
      return t.status && !t.deleted;
    } else if (filter === "favorites") {
      return t.favorite && !t.deleted;
    } else if (filter === "deleted") {
      return t.deleted;
    } else {
      return !t.deleted;
    }
  });

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit}>
        <h1>MY TODO LIST</h1>
        <br></br>
        <input
          type="text"
          value={todo}
          placeholder="Enter your todo here.."
          onChange={(event) => setTodo(event.target.value)}
        />
        <input
          type="text"
          value={des}
          placeholder="Todo description"
          onChange={(event) => setDes(event.target.value)}
          id="input2"
        />
        <br></br>
        <br></br>
        <button id="addtodo" onClick={addTodo}>
          ADD
        </button>
        <div className="filter-buttons">
          <button onClick={() => handleFilterChange("all")}>All</button>
          <button onClick={() => handleFilterChange("completed")}>Completed</button>
          <button onClick={() => handleFilterChange("favorites")}>Favorites</button>
          <button onClick={() => handleFilterChange("deleted")}>Deleted</button>
        </div>
        <div className="ullist">
          <ul>
            {filteredTodos.map((t, index) => (
              <li
                key={index}
                className={`${t.status ? "completed" : ""} ${t.favorite ? "favourite" : ""} ${t.deleted ? "deleted" : ""}`}
              >
                <strong>{t.list}</strong> <i>{t.list_des}</i>
                <span>
                  <MdDelete id="delete" title="Delete" onClick={() => onDelete(t.id)} />
                  <MdOutlineIncompleteCircle
                    id="complete"
                    title="Complete"
                    onClick={() => onComplete(t.id)}
                  />
                  {t.favorite ? (
                    <MdFavorite
                      id="favourite"
                      title="Favourite"
                      onClick={() => onFavourite(t.id)}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <MdOutlineFavorite
                      id="favourite"
                      title="Favourite"
                      onClick={() => onFavourite(t.id)}
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default Todo;
