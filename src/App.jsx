import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
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

  useEffect(() => {
    // Obtener los datos de la base de datos cuando se monta el componente
    axios.get('http://localhost:3000/users')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    if (formData.nombre.length < 5) {
      setError('El nombre debe tener al menos 5 caracteres.');
      return;
    }

    if (formData.nombre.split('').some(char => '0123456789'.includes(char))) {
      setError('El nombre no debe contener números.');
      return;
    }
    if (formData.apellido.split('').some(char => '0123456789'.includes(char))) {
      setError('El apellido no debe contener números.');
      return;
    }

    const edadNumber = Number(formData.edad);
    if (isNaN(edadNumber) || edadNumber >= 150) {
      setError('La edad debe ser un número menor a 150.');
      return;
    }

    const phonePattern = /^\+\d{2} \d{5,}$/;
    if (!phonePattern.test(formData.telefono)) {
      setError('El teléfono debe estar en el formato +XX XXXXX.');
      return;
    }

    // Enviar datos a la base de datos
    axios.post('http://localhost:3000/users', formData)
      .then(response => {
        setData([...data, response.data]);
        setFormData({ nombre: '', apellido: '', edad: '', telefono: '' });
        setError('');
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el dato:', error);
      });
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
