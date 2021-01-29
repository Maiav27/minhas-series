import{useState} from 'react'
import axios from  'axios'
import {Redirect} from 'react-router-dom'

const NovoGenero = () => {
const[name, setName] = useState('')
const[sucess, setSucess] = useState(false)

const onChange = evt => {
    setName(evt.target.value)
}

const save = () =>{
    axios.post('/api/genres', {
        name : name
    })
    .then(res =>{setSucess(res)})
}
   if(sucess) {
     return <Redirect to='/generos' />
   }
    return(
     <div className ='container'>
     <form action="">
        <div className='form-group'>
           <label htmlFor='name'>Nome </label>
           <input id ='name' type='text' value={name} onChange={onChange}  className='form-control'  placeholder='Nome do Gênero' />
           <button type='button' onClick={save} className='btn btn-primary'>Adicionar</button>
        </div>
     </form>
     </div>
    )
}

export default NovoGenero