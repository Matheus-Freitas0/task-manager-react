import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tarefa from "./components/Tarefa";
import Titulo from "./components/Titulo";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState(null);

  const buscarTarefas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tarefas");
      setTarefas(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setError("Erro ao buscar tarefas");
    }
  };

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "" || descricao.trim() === "") return;
    try {
      await axios.post("http://localhost:3000/tarefas", {
        titulo: novaTarefa,
        descricao,
        concluida: false,
      });
      buscarTarefas();
      setNovaTarefa("");
      setDescricao("");
      setError(null);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setError("Erro ao adicionar tarefa");
    }
  };

  const concluirTarefa = async (id) => {
    try {
      await axios.put(`http://localhost:3000/tarefas/concluida/${id}`, {
        concluida: true,
      });
      buscarTarefas();
      setError(null);
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
      setError("Erro ao concluir tarefa");
    }
  };

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <Titulo texto="Lista de Tarefas" />
      {error && <p style={{ color: "red" }}>{error}</p>} {}
      <ul>
        {tarefas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            nome={tarefa.titulo}
            descricao={tarefa.descricao}
            concluida={tarefa.concluida}
            onConcluir={() => concluirTarefa(tarefa.id)}
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
        placeholder="Descrição"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
    </div>
  );
}

export default App;
