import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Deletemovie, Editmovie, FetchMovies } from './Redux/Action';
import { addmovie} from './Redux/Action';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function MovieDetails() {
  const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [Movie,setmovie] = useState({  
        movie:'',
        Rate:'',
        url:''})

    useEffect(() => {
      dispatch(FetchMovies());
    }, [dispatch]);
  
    const posts = useSelector((state) => state.posts); 
  
    if (!posts) { 
      return <div>Loading...</div>; 
    }


    // Add-Move--
    function AddMovie(){
      if (Movie.movie && Movie.Rate && Movie.url) {
        dispatch(addmovie(Movie));
        setmovie({ movie: '', Rate: '' , url : ''}); // Clear the form after dispatch
        alert('Movie added successfully!');
    } else {
        alert('Please fill in all fields.');
    }
    }

    // ---
  
    const handleEdit = (post,i) => {
      const newName = prompt('Enter new name:', post.movie);
      const newRate = prompt('Enter new Rate number:', post.Rate);
      const newImg = prompt('Enter new image Url:', post.url);
  
      if (newName && newRate && newImg) {
        const updatedMovie = { ...post, movie: newName, Rate: newRate, url: newImg };
        axios.put(`http://localhost:3000/Movies/${post.id}`, updatedMovie)
          .then((response) => {
            console.log(response);
            dispatch(Editmovie(response.data)); // Dispatch the updated movie
            alert('Movie updated successfully!');
           window.location.reload();
          })
          .catch((error) => {
            console.error(error);
            alert('Failed to update movie!');
          });
      } else {
        alert('Both fields are required to update the student.');
      }
    };
  
  
    return (
        <>
      <div>
      </div>
       <div className='bg-gray w-50 d-flex flex-column gap-2 mx-auto ps-5 mt-5'>
       <input type="text" className='w-75' placeholder='enter movue Name' onChange={(e)=>{
         setmovie({
          ...Movie,
          movie:e.target.value
         })
         console.log(Movie.name);
       }}/>
       <input type="text" className='w-75'placeholder='enter Movie Ratting' onChange={(e)=>{
         setmovie({
          ...Movie,
          Rate:e.target.value
         })
         console.log(Movie.Rate);
       }}/>
      <input type="text" className='w-75'placeholder='enter Movie Pic Url' onChange={(e)=>{
         setmovie({
          ...Movie,
          url:e.target.value
         })
         console.log(Movie.url);
       }}/>
       <button className='w-75 bg-dark text-light' onClick={()=>AddMovie()}>Add student</button>
  </div>
  <ul className=' mx-auto listed d-flex flex-row px-5 mt-3 gap-2'>
  {posts.map((post, index) => (
            <li key={index} className='list-i p-1 d-flex flex-column justify-content-around align-items-center bg-dark text-light rounded-2'> 
            <img src={post.url} className='h-50 w-100' alt="" />
            <h2>{post.movie}</h2>
            <h4 className='bg-secondary w-50 py-2 rounded-2 text-light'>Rattings <span>{post.Rate}</span></h4>
            <button className='w-25 px-2 py-1 bg-danger  border-0 text-light rounded-2 ' onClick={() => dispatch(Deletemovie(post.id))}>Delete</button>
            <button className='w-25 px-2 py-1 bg-primary border-0 text-light rounded-2' onClick={() => handleEdit(post,index)}>Edit</button>
          </li>
         
        ))}
         </ul>
  </>
    );
}
