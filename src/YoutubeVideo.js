
const YoutubeVideo =({video})=>{
return(
<div>
<iframe className='vid' src={video.vurl.replace('watch?v=','embed/')}  allowFullScreen title="YouTube video player" ></iframe>
</div>
)
}
export default YoutubeVideo