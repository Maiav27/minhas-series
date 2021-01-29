
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Generos = () =>{
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get('/api/genres').then(resp => {
            setData(resp.data.data)
           
         } )        
    },[])

    const renderizaLinha = (record) => {
      return(
        <tr key={record.id}>
            <th>{record.id}</th>
            <td>{record.name}</td>
            <td><button type="button" className="btn btn-danger" onClick={ () => deleteGenero(record.id)}>Excluir</button>
            <Link to={'/generos/' + record.id} className='btn btn-warning'>Editar</Link>
            </td>

        </tr>
      )
    }

    const deleteGenero = id =>{
        axios.delete('api/genres/' + id)
.then(res =>{
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
       
    }

    if(data.length === 0){
        return(
            <div className='container'>
            <h1>Generos</h1>
            <Link to = '/generos/novo' >Novo Genêro</Link>
            <div className="alert alert-warning" role="alert">
                Você não possui genêros criados
            </div>
            </div>
        )
    }

   console.log(data)
    return(
        <div className='container'>
        <h1> Generos</h1>
      <Link to={'/generos/novo'} className='btn btn-primary' >Novo Genêro</Link>
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>   
                    <th>Ações</th>          
                </tr>
            </thead>
            <tbody>
               {data.map(renderizaLinha) }
    
            </tbody>
         </table>
 
        </div>
        )
}

export default Generos