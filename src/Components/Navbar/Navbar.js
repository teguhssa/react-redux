import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='container'>
        <h4>Redux Management</h4>
        <nav>
            <Link to="/barang">Barang</Link>
        </nav>
    </div>
  )
}
