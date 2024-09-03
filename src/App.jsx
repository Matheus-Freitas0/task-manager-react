import "./App.css";
import React from "react";
import Tarefa from "./components/Tarefa";
import Titulo from "./components/Titulo";
function App() {
  const tarefas = [
    { id: 1, nome: "Estudar React" },
    { id: 2, nome: "Fazer exercícios" },
    { id: 3, nome: "Ler um livro" },
  ];
  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <Titulo texto="Lista de Tarefas" />
      <ul>
        {tarefas.map((tarefa) => (
          <Tarefa key={tarefa.id} nome={tarefa.nome} />
        ))}
      </ul>
    </div>
  );
}
export default App;
