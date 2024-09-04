import React from "react";
import "./Tarefa.css";

function Tarefa({ nome, concluida, importante, onToggle, onRemover, onEditar, onMarcarImportante }) {
  return (
    <li className={`tarefa-item ${concluida ? "concluida" : "nao-concluida"} ${importante ? "importante" : ""}`}>
      <span>{nome}</span>
      <div className="tarefa-buttons">
        <button
          onClick={onMarcarImportante}
          className={`tarefa-button importante ${importante ? "marcada" : ""}`}
        >
          {importante ? "Remover Importância" : "Marcar Importante"}
        </button>
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