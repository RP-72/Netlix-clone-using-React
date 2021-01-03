import React, {useState, useEffect} from 'react'
import './Navbar.css'
function Navbar() {
    const [show,handleShow] = useState(false)
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 150){
                handleShow(true);
            }
            else handleShow(false);
        })
        return () => {
            window.removeEventListener("scroll");
        };
    },[])
    return (
        <div className={show?"nav-black" : "nav"}>
            <img 
            className="nav-logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="Netflix logo"
            />
            
            <img 
            className="nav-avatar"
            src="https://pbs.twimg.com/media/DmtcXxYUcAYshhQ.jpg"
            alt="user icon"
            />
        </div>
    )
}

export default Navbar
