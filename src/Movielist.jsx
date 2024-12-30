import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Movielist() {
  const [movies,setmovies] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/Movies')
    .then((Response)=>{
      const Data = Response.data;
      setmovies(Data);
      console.log(Data);
    })
  },[])

  return (
    <div>
      <ul className='movielists mt-3'>
      {
         
        movies.map((el,id)=>{
        
         return  <li className='d-flex align-items-center justify-content-around p-2 rounded-2 mt-1'>
               <img src={el.url} className='rounded-5' alt="" />
               <h4>{el.movie}</h4>
               <button className='px-4 rounded-2 border-0'>{el.Rate} Ratings</button>
               </li>
         
        })
       
      }
       </ul>
    </div>
  )
}
