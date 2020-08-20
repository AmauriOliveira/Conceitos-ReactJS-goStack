import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const result = repositories.filter(repository => repository.id !== id);

    setRepositories(result);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          const { id, title } = repository;

          return (
            <li key={id} >
              {title}
              < button onClick={() => handleRemoveRepository(id)}>
                Remover
            </button>
            </li>
          )
        }
        )
        }
      </ul >

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
