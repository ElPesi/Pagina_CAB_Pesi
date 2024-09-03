import Actions from "./Actions";

function Table({ data, onDelete }) {
  return (
    <table>
      <colgroup span="5" className="columns"></colgroup>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.edad}</td>
            <td>{item.telefono}</td>
            <td>
              <button onClick={() => onDelete(item.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
