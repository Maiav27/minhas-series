import {useEffect, useState} from   'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Series = () =>{
    const [data,setData] = useState([])

    useEffect(()=>{
        axios.get('/api/series').then(resp => setData(resp.data.data))

    
    }, [])
    
    const renderizaLinha = (record) => {
        return(
  
          <tr key={record.id}>
  
              <th>{record.id}</th>
              <td>{record.name}</td>
              <td><button type="button" className="btn btn-danger" onClick={ () => deleteSerie(record.id)}>Excluir</button>
              <Link to={'/series/' + record.id} className='btn btn-warning' >Info</Link>
              </td>
  
          </tr>
        )
      }
    
    const deleteSerie = (id) =>{
        axios.delete('/api/series/' + id).then(resp => {
            const filtrado = data.filter(item => item.id !== id )
            setData(filtrado)
        })
    }

    if(data.length === 0){
        return(

            <div className='container'>

                <Link to='/series/novo'>Nova Série</Link>
                <div className='alert alert-warning'>
                   Não possui séries cadastradas
                </div>

            </div>
        )
    }
     
  return(
      <div className='container'>
            <h1>Séries</h1>
            <Link to={'/series/novo'} className='btn btn-primary'>Nova série</Link>
            <table className='table table-dark'>
                <thead>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Nome</th>
                            <th scope='col'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                   {data.map(renderizaLinha)}
                   </tbody> 
            </table>
            
      </div>
  )
}

export default Series