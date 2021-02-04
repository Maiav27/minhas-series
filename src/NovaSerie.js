import {useState} from 'react'
import axios from 'axios'
import{Redirect} from 'react-router-dom'

function NovaSerie() {
    const[sucess, setSucess] = useState(false)
    const[name, setName] = useState('')

    const onChange = evt=> {
        setName(evt.target.value) 
        
    }

    const save = () =>{
        console.log('entrou')
        axios.post('/api/series' ,{
            name : name
        }).then(res => {setSucess(res)})
    }

     if(sucess){
       return  <Redirect to='/series'/>
     }
  return(

     <div className='container'>
       <form action="">
            <div className='form-group'>
            <label htmlFor='name'>Nome</label>
            <input id='name'  onChange={onChange}  className='form-control' placeholder='Nome da série' />
            <button type='button'  onClick={save} className='btn btn-primary'>Salvar</button>
            </div>
        </form>


     </div>
     
  )
}

export default NovaSerie