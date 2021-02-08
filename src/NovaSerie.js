import {useState, useEffect} from 'react'
import axios from 'axios'
import{Redirect} from 'react-router-dom'

function NovaSerie() {
    const[sucess, setSucess] = useState(false)
    const[name, setName] = useState('')
    const[generos, setGeneros] = useState([])
    const[form, setForm] = useState({})
    const[genreId, setGenreId] = useState('')


    useEffect(()=>{
     
      axios.get('/api/genres').then(res => {setGeneros(res.data.data)
       } )
    },[])

    const onChange = campo=> evt => {
        setForm({...form,[campo]: evt.target.value}) 
        
    }

    const save = () =>{
        console.log('entrou')
        axios.post('/api/series' , form).then(res => {setSucess(res)})
    }

     if(sucess){
       return  <Redirect to='/series'/>
     }
  return(

     <div className='container'>
       <form action="">
            <div className='form-group'>
            <label htmlFor='name'>Nome</label>
            <input id='name'  onChange={onChange('name')}  className='form-control' placeholder='Nome da série' />
            <div class="form-group">
            <label htmlFor="exampleFormControlSelect1">Gêneros</label>
            <select className="form-control" onChange={onChange('genre_id')} >
            {generos.map(genero => { <option key={genero.id} value={genero.id} >{genero.name}</option>})}
            </select>
        </div>
            <button type='button'  onClick={save} className='btn btn-primary'>Salvar</button>
            </div>
        </form>


     </div>
     
  )
}

export default NovaSerie