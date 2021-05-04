import {useState,useEffect} from 'react'
// import data from './exampleresponse.json'
import '@fortawesome/free-solid-svg-icons'
import YoutubeVideo from './YoutubeVideo';
import axios from 'axios'
var youtubeUrl = require('youtube-url');



const LoadVideos = ()=>{
    const [show,setShow] = useState(false);
    const [videos,setVideos] = useState([])
    const [newVids,setNewVids] = useState([])
    const [search,setSearch] = useState('');
const[oneVideo,setOneVideo] = useState({
    title:"",
    vurl:""
})
    useEffect(() => {
      fetch('https://video-rec.herokuapp.com/')
          .then(res => res.json())
          .then(data => {setVideos(data)
        setNewVids(data)})
      },[]);
  

function deleteVideo(e,id){    
    e.preventDefault();
    const filtered = videos.filter(video=>{return video.id!==id})
    setVideos(filtered)
axios.delete(`https://video-rec.herokuapp.com/${id}`)
.then(res=>{
if(res.status===200){
  
}
})
  
    }

function incVotes(e,index,id){
    e.preventDefault();
const newVideos = [...videos];
newVideos[index].rating++;
let data = {rating:newVideos[index].rating}
setVideos(newVideos)
axios.put(`https://video-rec.herokuapp.com/${id}`,data )

}    

function decVotes(e,index,id){
    e.preventDefault();
    const newVideos =[...videos];
    newVideos[index].rating--;
    let data = {rating:newVideos[index].rating}
    setVideos(newVideos);
    axios.put(`https://video-rec.herokuapp.com/${id}`,data )

}

function handleChange(e) {
    e.preventDefault();
    const newVideo={...oneVideo};
newVideo[e.target.name] = e.target.value;
setOneVideo(newVideo);
}

// if( youtubeUrl.valid(oneVideo.url)){
//     const newVids = [...videos]
//         newVids.push(oneVideo);
//         setVideos(newVids);
//         console.log(oneVideo)   
//    }
//    else{
//        alert('Invalid URL')
//    }

function addVideo(e){
     e.preventDefault();
     if( youtubeUrl.valid(oneVideo.vurl)){
    const newVids = [...videos]
    newVids.push(oneVideo);
    setVideos(newVids);
  
axios.post('https://video-rec.herokuapp.com/',{
    title:oneVideo.title,
    vurl:oneVideo.vurl
})
.then(res=>{console.log(res.data)})
console.log(oneVideo)
}
else{
   alert('Invalid Youtube URL')
}  
    
}

function handleSearch(e){
    e.preventDefault();
    let key =e.target.value.toLocaleLowerCase();
    setSearch(key);
    console.log(search)
    let filtered = newVids.filter(video=>{return video.title.toLocaleLowerCase().includes(key)})
    setVideos(filtered);
}

return(
<div >
    <div className='addVideo'  style={{display:'flex'} }>
        <div style={{width:'30%', margin:'1rem'} }>
    <a href='#0'  onClick={()=>{setShow(true)}} style={{fontStyle:'normal',textDecoration:'none',fontSize:'1.2rem'}}>Add video</a>


{show?
<form id='form' onSubmit={e=>addVideo(e)}>
<div>
<label>Title</label>
    <input onChange={e=>handleChange(e)} className='input' name='title' type='text' required/>   
</div>
<div>
<label>URL</label>
    <input onChange={e=>handleChange(e)} className='input' name='vurl' type='text' required/>
</div>
<div>
<button className="btn btn-warning input" type='cancel' onClick = {()=>{setShow(false)}}>Cancel</button>

<button className="btn btn-danger input" type='submit'>ADD</button>

</div>
 </form>:null}
</div>


<div style={{width:'40%', 'margin-top':'2rem'} }>
<label>Search</label>
    <input onChange={e=>{handleSearch(e)}} value={search} className='search' name='search' type='text'/> 

</div>

</div>
 

<div className='allVidContainer'>

    {videos.map((video,index)=>{
    return <div key={index} className='vidContainer'>
        <h5 id='vidTitle'>{video.title}</h5>
       
       <div id='votes'> <i className="fas fa-thumbs-up vote" onClick={e=>{incVotes(e,index,video.id)}}></i> <h5>{video.rating} votes</h5><i className="fas fa-thumbs-down vote" onClick={e=>{decVotes(e,index,video.id)}}></i></div>
<YoutubeVideo video={video}/>

       {/* <iframe className='vid' allowFullScreen src= {`${video.url}`.replace('watch?v=','embed/')} title="YouTube video player" >
</iframe> */}
            <div>
            <button className="btn btn-danger" onClick={(e)=>{deleteVideo(e,video.id)}}>Delete</button>   
            </div>         
             </div>
})} 

</div>
</div>
)
}

export default LoadVideos;