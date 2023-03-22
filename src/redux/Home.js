import React, { useContext, useEffect, useRef, useState } from "react";
import {  useLocation, useParams } from "react-router-dom"
import { UserContent } from "../App";


const Home = () => {
    const { user } = useContext(UserContent)
    const [albums, setAlbums] = useState([])
    //  const [photoAppear, setPhototAppear] = useState([])
    const refSearch = useRef()

    const { slug } = useParams()

    const { search } = useLocation()

    useEffect(() => {
        if (user) {
            fetch("https://jsonplaceholder.typicode.com/albums")
                .then(res => res.json())
                .then(res => {
                    const alb = res.filter(
                        (item) => item?.userId?.toString() === user?.id?.toString
                    )
                    setAlbums([...alb])
                })
        }
    }, [user])

    console.log(albums);
    return (
        <div className="home">
            <div className="homeSearch">
                <input ref={refSearch} placeholder="Enter key to search ...." />
                <button>Search</button>
            </div>
            <div className="homeBody">
                <div className="homeLink">
                    <ul>
                        {albums.map( alb => 
                            <li>{alb.title}</li>
                        )}
                    </ul>
                </div>
                <div className="homeItem"></div>
            </div>
        </div>
    )
}

export default Home