import React, {useState, useEffect} from 'react'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import axios from './axios' // here axios is the "instance" object in axios.js since it is 
// exported as default
import './Row.css'
function Row(props) {
    const baseURL = "https://image.tmdb.org/t/p/original/"
    const [movies,setMovies] = useState([]);
    const[trailerUrl,setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(props.fetchUrl);
            setMovies(request.data.results)
            // console.log(request.data.results);
            return request
        }
        fetchData()
    }, [props.fetchUrl]);

    const handleClick = (movie) =>{
        if(trailerUrl) setTrailerUrl('')
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
            .then(url=>{
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"));
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }
    return (
        <div className="row">
            <h1>{props.title}</h1>
            <div className="row-posters">
                {movies.map(movie => {
                   return(
                        props.isLargeRow ? 
                        <img 
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className="row-poster-large" 
                            src={`${baseURL}${movie.poster_path}`} 
                            alt={movie.name}/>
                        :
                        <img 
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className="row-poster" 
                            src={`${baseURL}${movie.backdrop_path}`} 
                            alt={movie.name}/>)
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
