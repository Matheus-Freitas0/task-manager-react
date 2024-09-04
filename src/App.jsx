import "./App.css";
import React, { useState } from "react";
import Tarefa from "./components/Tarefa";
import Titulo from "./components/Titulo";

function ContagemTarefas({ tarefas }) {
  const tarefasNaoConcluidas = tarefas.filter(
    (tarefa) => !tarefa.concluida
  ).length;
  return <p>Tarefas restantes: {tarefasNaoConcluidas}</p>;
}

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, nome: "Estudar React", concluida: false },
    { id: 2, nome: "Fazer exercícios", concluida: false },
    { id: 3, nome: "Ler um livro", concluida: false },
  ]);
  
  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      const nova = {
        id: tarefas.length + 1,
        nome: novaTarefa,
        concluida: false,
      };
      setTarefas([...tarefas, nova]);
      setNovaTarefa("");
    }
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  const editarTarefa = (id, novoNome) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, nome: novoNome } : tarefa
      )
    );
  };

  const marcarComoConcluida = (id) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <ContagemTarefas tarefas={tarefas} />
      <Titulo texto="Lista de Tarefas" />
      <ul>
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            style={{
              textDecoration: tarefa.concluida ? "line-through" : "none",
            }}
          >
            <Tarefa nome={tarefa.nome} />
            <button onClick={() => marcarComoConcluida(tarefa.id)}>
              {tarefa.concluida ? "Desmarcar" : "Concluir"}
            </button>
            <button
              onClick={() => {
                const novoNome = prompt("Edite o nome da tarefa:", tarefa.nome);
                if (novoNome) editarTarefa(tarefa.id, novoNome);
              }}
            >
              Editar
            </button>
            <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
          </li>
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
