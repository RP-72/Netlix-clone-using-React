import React, {useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

function Banner() {
    const [movie,setMovie] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            // let rand = Math.floor(Math.random() * requests.data.results.length - 1)
            // console.log(requests.data.results[rand])
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
                )
        }
        fetchData();
    },[])
    console.log(movie)
    const baseURL = "https://image.tmdb.org/t/p/original/"
    function truncate(str,n){
        if(str?.length > n){
            let s = str.substr(0,n-1)
            console.log(s)
            s+="..."
            return s
        }
        else return str
    }
    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                        "${baseURL}${movie?.backdrop_path}"
                    )`,
                backgroundPosition: "center",
            }}
        >
            <div className="banner-contents">
                <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name} </h1>

                <div className="banner-buttons">
                    <button className="banner-button">
                        Play
                    </button>
                    <button className="banner-button">
                        My List
                    </button>
                    <h1 className="banner-description">{truncate(movie?.overview,150)}</h1>
                </div>
            </div>
            <div className="banner-fadeBottom"/>
        </header>
    )
}

export default Banner
