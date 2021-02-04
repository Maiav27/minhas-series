import{useState, useEffect} from 'react'
import axios from  'axios'
import {Redirect} from 'react-router-dom'

const EditarGenero = ({match}) => {
const[name, setName] = useState('')
const[sucess, setSucess] = useState(false)
console.log(match)
useEffect(()=>{
    axios.get('/api/genres/' + match.params.id)
    .then(res => setName(res.data.name))
}, [match.params.id ])

const onChange = evt => {
    setName(evt.target.value)
}

const save = () =>{
    axios.put('/api/genres/' + match.params.id, {
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
           <button type='button' onClick={save} className='btn btn-primary'>Editar</button> 
        </div>
     </form>
     </div>
    )
}

export default EditarGenero