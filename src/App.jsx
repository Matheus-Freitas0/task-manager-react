import "./App.css";
function App() {
  const tarefas = [
    { id: 1, nome: "Estudar React" },
    { id: 2, nome: "Fazer exercícios" },
    { id: 3, nome: "Ler um livro" },
  ];
  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.nome}</li>
        ))}
      </ul>
    </div>
  )
}
export default App;
