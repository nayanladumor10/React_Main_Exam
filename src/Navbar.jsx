import React from 'react'
import { Link, Outlet } from 'react-router'

export default function Navbar() {
  return (
    <div className='w-100 bg-dark px-2 d-flex justify-content-center gap-4'>
        <h4 className='text-danger'>NYN MOVIES</h4>
        <Link className='text-decoration-none text-light' to='/'>Movie-Details</Link>
        <Link className='text-decoration-none text-light' to='/Movielist'>Movie-List</Link>
        <Link className='text-decoration-none text-light' to='/Moviesearch'>Movie-Search</Link>
        <Outlet/>
    </div>
  )
}
