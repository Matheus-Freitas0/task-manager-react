import React from "react";
import "./Tarefa.css";

function Tarefa({ nome, concluida, onToggle, onRemover, onEditar }) {
  return (
    <li className={`tarefa-item ${concluida ? "concluida" : "nao-concluida"}`}>
      <span>{nome}</span>
      <div className="tarefa-buttons">
        <button
          onClick={onToggle}
          className={`tarefa-button concluir ${concluida ? "concluida" : ""}`}
        >
          {concluida ? "Desmarcar" : "Concluir"}
        </button>
        <button
          onClick={onEditar}
          className="tarefa-button editar"
        >
          Editar
        </button>
        <button
          onClick={onRemover}
          className="tarefa-button remover"
        >
          Remover
        </button>
      </div>
    </li>
  );
}

export default Tarefa;
