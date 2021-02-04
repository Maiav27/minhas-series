import {useState, useEffect}  from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Badge} from 'reactstrap'

function InfoSerie({match}) {

    const[sucess, setSucess] = useState(false)
    const[form, setForm] = useState({})
    const[data, setData] = useState({})
    const[mode, setMode] = useState(false)
    const[text, setText] = useState('Editar')
    const[genres, setGenres] = useState([])
    const[genreId, setGenreId] = useState('')
    useEffect(()=>{
      if(match.params.id){
        axios.get('/api/series/'+ match.params.id)
        .then(res => {
        setData(res.data)
        setForm(res.data)
         })
        }  
         
    }, [match.params.id])

    useEffect(()=>{
        axios.get('/api/genres').then(res =>{ setGenres(res.data.data)
        const genres = res.data.data
       const encontrado= genres.find(value=> data.genre === value.name )  
       if(encontrado){
           setGenreId(encontrado.id)
       }
        }) 
    },[data])

   function Button(props){
       return(
           <button onClick={props.onClick} className={props.className} >{props.nome}</button>
       )
   }
   
   const Click = () =>{
       setMode(!mode)
       
      
       mode ? setText('Editar') : setText('Cancelar Edição')
  
   }
  //custom header
  const masterHeader = {
     
      height : '50hv',
      minHeight : '500px',
      backgroundImage : `url(${data.background})`,
      backgroundSize : 'cover',
      backgroundPosition : 'center',
      backgroundRepeat : 'no-repeat'
      
  }
    const onChange = field => evt=> {
       setForm({...form, [field] :evt.target.value}) 
    }

    const onChangeGenre = evt =>{
        setGenreId(evt.target.value)
    }

    

    const seleciona = (value) => () => {
        setForm({...form, status : value})
    }

    const save = () =>{
        console.log('entrou')
        axios.put('/api/series/' + match.params.id , {
            ...form, genre_id : genreId
        }
        ).then(res => {setSucess(res)})
    }

     if(sucess){
       return  <Redirect to='/series'/>
     }

    
     
  return(
     <div>
       <header style = {masterHeader}>

            <div className='h-100'  >

                <div className='h-100 container'>

                    <div className='row h-100 align-items-center'> 

                        <div className='col-3' style={{marginTop : '50px'}} >
                            <img  alt={data.name} className='img-fluid img-thumbnail ' src={data.poster} alt=""/>
                        </div>
                        <div className='col-8'>

                           <h1 className='font-weight-light text-white'>{data.name}</h1>
                           <div className='lead text-white'>

                          { data.status ==='Assistido' && <Badge color='success'>Assistido</Badge> }
                         { data.status ==='Para assistir' &&  <Badge color='warning'>Para Assistir</Badge> }
                            Gênero: {data.genre}
                           </div>

                        </div>
                    
                    </div>

                </div>
            </div>  
       
       </header>
       <div>
        <Button onClick={Click} nome ={text} className='btn btn-primary'/>
       </div>
       {mode &&
       
            <div className='container'>
           
                <h1>Nova Série</h1>
               <pre>{JSON.stringify(form)}</pre>
                <form action="">

                    <div className='form-group'>

                        <label htmlFor='name'>Nome</label>
                        <input id='name' value ={form.name} onChange={onChange('name')}  className='form-control' placeholder='Nome da série' />
                      

                    </div>
                    <div className='form-group'>

                    <label htmlFor='name'>Comentário</label>
                    <input id='name' value ={form.comments} onChange={onChange('comments')}  className='form-control' placeholder='Comentário sobre a série' />
                  

                </div>
                <div class="form-group">
                    <label htmlFor="exampleFormControlSelect1">Gêneros</label>
                    <select class="form-control" onChange={onChangeGenre} defaultValue={genreId}>
                    {genres.map(genre => <option key={genre.id} value={genre.id} >{genre.name}</option>)}
                    </select>
                </div>
                <div class="form-check">

                        <input className='form-check-input' type='radio' name='status' id='assistido' value='Assistido' onClick={seleciona(('Assistido'))}/>
                        <label className='form-check-label' htmlFor='assistido'>
                            Assistido
                        </label>

               </div>
                <div className='form-check'>

                    <input className='form-check-input' type='radio' name='status' id='paraAssistir'  value='Para assistir' onClick={seleciona('Para assistir')}/>
                    <label className='form-check-label' htmlFor='paraAssistir'>
                        Para assistir
                    </label>

                </div>
                <Button type='button'  onClick={save} className='btn btn-primary' nome ='Salvar' />
                </form>

            </div>
        }

     </div>
     
  )
}

export default InfoSerie

  

