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
  const [filtro, setFiltro] = useState("todas");

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

  const toggleConcluirTarefa = async (id) => {
    const tarefa = tarefas.find((t) => t.id === id);
    try {
      await axios.put(`http://localhost:3000/tarefas/concluida/${id}`, {
        concluida: !tarefa.concluida,
      });
      buscarTarefas();
      setError(null);
    } catch (error) {
      console.error("Erro ao alternar conclusão da tarefa:", error);
      setError("Erro ao alternar conclusão da tarefa");
    }
  };

  const editarTarefa = async (id, novoNome, novaDescricao) => {
    try {
      await axios.put(`http://localhost:3000/tarefas/${id}`, {
        titulo: novoNome,
        descricao: novaDescricao,
      });
      buscarTarefas();
      setError(null);
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      setError("Erro ao editar tarefa");
    }
  };

  const excluirTarefa = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tarefas/${id}`);
      buscarTarefas();
      setError(null);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      setError("Erro ao excluir tarefa");
    }
  };

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "concluidas") return tarefa.concluida;
    if (filtro === "naoConcluidas") return !tarefa.concluida;
    return true;
  });

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <Titulo texto="Lista de Tarefas" />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="filtros">
        <button
          className={`filtro-btn ${filtro === "todas" ? "ativo" : ""}`}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          className={`filtro-btn ${filtro === "concluidas" ? "ativo" : ""}`}
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
        <button
          className={`filtro-btn ${filtro === "naoConcluidas" ? "ativo" : ""}`}
          onClick={() => setFiltro("naoConcluidas")}
        >
          Não Concluídas
        </button>
      </div>

      <ul>
        {tarefasFiltradas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            id={tarefa.id}
            nome={tarefa.titulo}
            descricao={tarefa.descricao}
            concluida={tarefa.concluida}
            onToggleConcluir={() => toggleConcluirTarefa(tarefa.id)}
            onExcluir={excluirTarefa}
            onEditar={editarTarefa}
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
