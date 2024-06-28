import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Users () {

    //permite traer los datos que se tienen almacenados
    // en la base de datos haciendo uso de
    // axios y las promesas para poder consumir los datos

    const [users, setUsers] = useState([])
    useEffect(() =>{
        axios.get('http://localhost:3001')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))

    }, [])

    //permite eliminar a un usuario en la base de datos
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(errr => console.log(errr))
    }
    return(
        // las diferentes clases son simplemente estilos traidos desde las librerias de bootstrap
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-75 bg-white rounded p-3">
                {/* creamos un boton en el cual nos llevara a la ventana de agregar usuario */}
                <Link to={'/create'} className="btn btn-success"> Agregar +</Link>
                {/* creamos la cabecera de la tabla */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Numero de control</th>
                            <th>Unidad</th>
                            <th>Calificación</th>
                            <th>Acción</th>  
                        </tr>
                    </thead>
                    {/* creamos el cuerpo de la tabla */}
                    <tbody>
                        {
                            users.map((user) => {
                                return <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.nControl}</td>
                                    <td>{user.unidad}</td>
                                    <td>{user.cali}</td>
                                    <td>
                                        {/* El siguiente boton para editar nos manda a la ventana para editar */}
                                        <Link to={`/update/${user._id}`} className="btn btn-success">Editar</Link>

                                        {/* el siguiente boton permite eliminar los datos que aparecen en la tabla mediante la funcion de onclick*/}
                                        <button to={'/delete'} className="btn btn-danger" 
                                        onClick={(e) => handleDelete(user._id)}> 
                                             Eliminar
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Users;