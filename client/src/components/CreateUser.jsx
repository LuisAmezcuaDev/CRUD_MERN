import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function CreateUser() {

  // creamos las variables de estado para guardar los datos que se van a guardar
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [nControl, setNControl] = useState()
  const [unidad, setUnidad] = useState()
  const [cali, setCali] = useState()
  const navigate = useNavigate()

  //la siguiente permite guardar los datos que contengan las variables de estado anteriores

  const Submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createUser', {name, email, nControl, unidad, cali})
    .then(result => {
      console.log('hola' + cali)
      console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
// los nombres de las clases permiten darle estilos mediante el uso de bootstrap
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        {/* aqui es donde se manda llamar a la funcion para poder guardar los datos */}
        <form onSubmit={Submit}> 
        {/* Es el formulario que nos permite ingresar los datos que se almacenaran en la base de datos */}
          <h2>Agregar nuevo Alumno</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' id='name' placeholder='Ingresa tu nombre' className='form-control' 
            onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Correo</label>
            <input type='email' id='email' placeholder='Correo' className='form-control' 
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor='nc'>Número de control</label>
            <input maxLength={8} type='text' id='nc' placeholder='Número de control' className='form-control' 
            onChange={(e) => setNControl(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor='unidad'>Unidad</label>
            <input  maxLength={1} type='text' id='unidad' placeholder='Unidad' className='form-control' 
            onChange={(e) => setUnidad(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor='cali'>Calificación</label>
            <input maxLength={3} type='text' id='cali' placeholder='Calificación' className='form-control' 
            onChange={(e) => setCali(e.target.value)}/>
          </div>
          {/* los botnes que permiten crear o cancelar la accion */}
          <button className='btn btn-primary'>Crear usuario</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;