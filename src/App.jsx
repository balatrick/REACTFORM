import React, { useEffect, useState } from 'react';
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false)
  const fetchData = async () => {
    try {
      const data = await fetch('https://dummyjson.com/recipes/search?q=' + input);
      const json = await data.json();
      setRecipes(json?.recipes || []);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) {
        fetchData();
      } else {
        setRecipes([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className='App'>
      <h1>Auto Complete</h1>
      <input
        type="text" onBlur={()=> setShow(false) } onFocus={()=> setShow(true)}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text"
        className="searchInput"
      />

      { show && <div className="text_field">
        {recipes.map((r) => {
          const name = r.name;
          const index = name.toLowerCase().indexOf(input.toLowerCase());

          if (index === -1 || input === "") {
            return (
              <span key={r.id} className="result">
                {name}
              </span>
            );
          }

          const before = name.slice(0, index);
          const match = name.slice(index, index + input.length);
          const after = name.slice(index + input.length);

          return (
            <span key={r.id} className="result">
              {before}
              <span className="highlight">{match}</span>
              {after}
            </span>
          );
        })}
      </div>}
    </div>
  );
};

export default App;
