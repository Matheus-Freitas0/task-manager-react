import { useState } from "react";

function Tarefa({ id, nome, concluida, descricao, onToggleConcluir, onExcluir, onEditar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [novoNome, setNovoNome] = useState(nome);
  const [novaDescricao, setNovaDescricao] = useState(descricao);

  const handleEdit = () => {
    if (isEditing) {
      onEditar(id, novoNome, novaDescricao); 
    }
    setIsEditing(!isEditing); 
  };

  return (
    <li style={{ textDecoration: concluida ? "line-through" : "none" }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
          <input
            type="text"
            value={novaDescricao}
            onChange={(e) => setNovaDescricao(e.target.value)}
          />
        </>
      ) : (
        <>
          <span>{nome} - </span>
          <span>{descricao}</span>
        </>
      )}

      <button onClick={onToggleConcluir}>
        {concluida ? "Desmarcar" : "Concluir"}
      </button>

      <button onClick={handleEdit}>{isEditing ? "Salvar" : "Editar"}</button>
      <button onClick={() => onExcluir(id)}>Excluir</button>
    </li>
  );
}

export default Tarefa;
