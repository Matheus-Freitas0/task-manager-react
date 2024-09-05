import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tarefa from "./components/Tarefa";
import Titulo from "./components/Titulo";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [descricao, setDescricao] = useState("");
  
  const buscarTarefas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tarefas");
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };
  
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") return;
    try {
      await axios.post("http://localhost:3000/tarefas", {
        titulo: novaTarefa,
        descricao,
        concluida: false,
      });
      buscarTarefas();
      setNovaTarefa("");
      setDescricao("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };
  
  useEffect(() => {
    buscarTarefas();
  }, []);
  
  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <Titulo texto="Lista de Tarefas" />
      <ul>
        {tarefas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            nome={tarefa.titulo}
            descricao={tarefa.descricao}
          />
        ))}
      </ul>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Adicionar nova tarefa"
      />
      <input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descricao"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
    </div>
  );
}
export default App;
