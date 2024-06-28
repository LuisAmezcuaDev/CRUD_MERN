import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UpdateUser() {
    // creamos las variables de estado para guardar los datos que se van a guardar
  const {id} = useParams()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [nControl, setNControl] = useState()
  const [unidad, setUnidad] = useState()
  const [cali, setCali] = useState()
  const navigate = useNavigate()

  // se crea el use effect para poder poner los datos dentro del formulario
    useEffect(() =>{
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {
          console.log(result)
          setName(result.data.name)
          setEmail(result.data.email)
          setNControl(result.data.nControl)
          setUnidad(result.data.unidad)
          setCali(result.data.cali)
        })
        .catch(err => console.log(err))

    }, [])

    // Permite mandar los nuevos datos que se agregaro dentro del formulario
    const Update = (e) => {
      e.preventDefault();
      axios.put('http://localhost:3001/updateUser/'+id, {name, email, nControl, unidad, cali})
      .then(result => {
        console.log(result)
        console.log('hola' + cali)
        navigate('/')
      })
      .catch(err => console.log(err))
    }

  return (
// los nombres de las clases permiten darle estilos mediante el uso de bootstrap
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        {/* aqui es donde se manda llamar a la funcion para poder editar los datos */}
        <form onSubmit={Update}>
          <h2>Editar datos</h2>
        {/* Es el formulario que nos permite ingresar los datos que se almacenaran en la base de datos */}
          <div className='mb-2'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' id='name' placeholder='Nombre' className='form-control' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Correo</label>
            <input type='text' id='email' placeholder='Correo' className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='nc'>Número de control</label>
            <input maxLength={8} type='text' id='nc' placeholder='Ingresa número de control' className='form-control' 
            value={nControl}
            onChange={(e) => setNControl(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='unidad'>Unidad</label>
            <input maxLength={1} type='text' id='unidad' placeholder='Unidad' className='form-control' 
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='calif'>Calificación</label>
            <input maxLength={3} type='text' id='calif' placeholder='Ingresa la calificación' className='form-control' 
            value={cali}
            onChange={(e) => setCali(e.target.value)}
            />
          </div>
          <button className='btn btn-primary'>Update</button>
          <button className='btn btn-secondary'>Cancelar</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser