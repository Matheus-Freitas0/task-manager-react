import React from "react";

function Tarefa({ nome, concluida, onToggle, onRemover }) {
  return (
    <li
      style={{
        textDecoration: concluida ? "line-through" : "none",
        color: concluida ? "#888" : "#333",
        backgroundColor: concluida ? "#e0e0e0" : "#f0f0f0",
      }}
    >
      {nome}
      <button onClick={onToggle} style={{ marginLeft: "10px" }}>
        {concluida ? "Desmarcar" : "Concluir"}
      </button>
      <button onClick={onRemover} style={{ marginLeft: "10px", color: "red" }}>
        Remover
      </button>
    </li>
  );
}

export default Tarefa;
