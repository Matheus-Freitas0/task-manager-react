import React, { useState } from "react";
import Tarefa from "./components/Tarefa";

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, nome: "Estudar React", concluida: false },
    { id: 2, nome: "Fazer exercícios", concluida: false },
    { id: 3, nome: "Ler um livro", concluida: false },
  ]);

  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === "") return;
    const nova = { id: tarefas.length + 1, nome: novaTarefa, concluida: false };
    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
  };

  const alternarConclusao = (id) => {
    const tarefasAtualizadas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(tarefasAtualizadas);
  };

  const removerTarefa = (id) => {
    const tarefasAtualizadas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(tarefasAtualizadas);
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <ul>
        {tarefas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            nome={tarefa.nome}
            concluida={tarefa.concluida}
            onToggle={() => alternarConclusao(tarefa.id)}
            onRemover={() => removerTarefa(tarefa.id)}
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
