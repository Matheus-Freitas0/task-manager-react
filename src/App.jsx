import "./App.css";
import React, { useState } from "react";
import Tarefa from "./components/Tarefa";
import Titulo from "./components/Titulo";

function ContagemTarefas({ tarefas }) {
  const tarefasNaoConcluidas = tarefas.filter((tarefa) => !tarefa.concluida).length;
  return <p>Tarefas restantes: {tarefasNaoConcluidas}</p>;
}

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, nome: "Estudar React", concluida: false, importante: false },
    { id: 2, nome: "Fazer exercícios", concluida: false, importante: false },
    { id: 3, nome: "Ler um livro", concluida: false, importante: false },
  ]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [filtro, setFiltro] = useState("todos");

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      const nova = { id: tarefas.length + 1, nome: novaTarefa, concluida: false, importante: false };
      setTarefas([...tarefas, nova]);
      setNovaTarefa("");
    }
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  const editarTarefa = (id, novoNome) => {
    setTarefas(tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, nome: novoNome } : tarefa
    ));
  };

  const marcarComoConcluida = (id) => {
    setTarefas(tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  const marcarComoImportante = (id) => {
    setTarefas(tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, importante: !tarefa.importante } : tarefa
    ));
  };

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "concluidas") return tarefa.concluida;
    if (filtro === "nao-concluidas") return !tarefa.concluida;
    return true; 
  });

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <ContagemTarefas tarefas={tarefas} />
      <Titulo texto="Lista de Tarefas" />
      <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
        <option value="todos">Todas</option>
        <option value="concluidas">Concluídas</option>
        <option value="nao-concluidas">Não Concluídas</option>
      </select>
      <ul>
        {tarefasFiltradas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            nome={tarefa.nome}
            concluida={tarefa.concluida}
            importante={tarefa.importante}
            onToggle={() => marcarComoConcluida(tarefa.id)}
            onRemover={() => removerTarefa(tarefa.id)}
            onEditar={() => {
              const novoNome = prompt("Edite o nome da tarefa:", tarefa.nome);
              if (novoNome) editarTarefa(tarefa.id, novoNome);
            }}
            onMarcarImportante={() => marcarComoImportante(tarefa.id)}
          />
        ))}
      </ul>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Adicionar nova tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
    </div>
  );
}

export default App;
