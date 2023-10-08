import React from 'react'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top text-light ">
        <div className="col-md-4 d-flex align-items-center text-light ">
          <Link to="/" className="mb-3 me-2 mb-md-0  text-decoration-none lh-1 text-light ">
          </Link>
          <span >© 2021 Company, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex text-light ">
          
        </ul>
      </footer>
    </div>
  )
}
