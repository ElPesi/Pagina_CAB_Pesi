import { useState } from 'react';
import './index.css';
import '@picocss/pico/css/pico.min.css'; 
import imagen from './assets/belgrano.png';
import Footer from './components/Footer'; 
import Table from './components/Table';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    telefono: ''
  });

  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState(1); // Inicializar el ID

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación del nombre
    if (formData.nombre.length < 5) {
      setError('El nombre debe tener al menos 5 caracteres.');
      return;
    }

    // Validación de que nombre y apellido no contengan números
    if (formData.nombre.split('').some(char => '0123456789'.includes(char))) {
      setError('El nombre no debe contener números.');
      return;
    }
    if (formData.apellido.split('').some(char => '0123456789'.includes(char))) {
      setError('El apellido no debe contener números.');
      return;
    }

    // Validación de que en la edad no haya letras y sea menor a 150
    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const edadNumber = Number(formData.edad);
    const edadStr = formData.edad;

    if (abc.some(letter => edadStr.includes(letter))) {
      setError('La edad no debe contener letras.');
      return;
    }
  
    if (edadNumber >= 150) {
      setError('La edad debe ser un número menor a 150.');
      return;
    }

    // Validación del teléfono usando expresión regular
    const phonePattern = /^\+\d{2} \d{5,}$/;
    if (!phonePattern.test(formData.telefono)) {
      setError('El teléfono debe estar en el formato +XX XXXXX.');
      return;
    }

    // Si pasa todas las validaciones, borra el error y agrega los datos a la tabla
    const newItem = { ...formData, id: nextId };
    setData([...data, newItem]);
    setFormData({ nombre: '', apellido: '', edad: '', telefono: '' }); // Limpiar formulario
    setError('');
    setNextId(nextId + 1); // Actualizar el próximo ID
    console.log('Datos enviados:', newItem);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="App-header">
      <h1 className="titulo-principal">Hacete socio de Belgrano</h1>
      <img src={imagen} alt="Logo" />
      <h2 className='registro'>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input 
            type="text" 
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>

        <div className="camposEnLinea">
          <div className="campos">
            <label htmlFor="edad">Edad:</label>
            <input 
              type="text" 
              id="edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
            />
          </div>
          <div className="campos">
            <label htmlFor="telefono">Teléfono:</label>
            <input 
              type="text" 
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Enviar</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <Table data={data} onDelete={handleDelete} />
      
      <Footer /> 
    </div>
  );
}

export default App;
