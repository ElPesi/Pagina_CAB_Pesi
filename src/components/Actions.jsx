function Actions({ itemId, onDelete }) {
    return (
      <button onClick={() => onDelete(itemId)}>Eliminar</button>
    );
  }
  
  export default Actions;
  