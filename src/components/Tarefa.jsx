function Tarefa({ nome, concluida, descricao, onConcluir }) {
  return (
    <li style={{ textDecoration: concluida ? "line-through" : "none" }}>
      <span>{nome} - </span>
      <span>{descricao}</span>
      <button onClick={onConcluir}>Concluir</button>
    </li>
  );
}
export default Tarefa;
