import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../Screens/Cart";
import { useCart } from "./contextReducer"; 

export default function Navbar() {
  let data = useCart();
  const navigate=useNavigate();
  const [cartview,setcartview]=useState(false);

  const handleLogout=()=>{
    localStorage.removeItem("authtoken");
    navigate("/login");
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            studio mart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              {/* <Link className="nav-link" to="/feature">
                Features
              </Link> */}

              {(localStorage.getItem("authtoken")) ?
                <Link className="nav-link active" aria-current="page" to="/">
                  menu
                </Link> :
                ""
              }
            </div>
          </div>
          <div className="d-flex">
            {(!localStorage.getItem("authtoken")) ?
              <div>
                <Link className="btn bg-light text-success me-3 fs-6" to="/login">
                  login
                </Link>
                <Link
                  className="btn bg-light text-success me-3 fs-6"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div> :
              <div> 
                {/* <Link className="btn bg-light text-success me-3 fs-6" onClick={setcartview(true)}> */}
                <Link className="btn bg-light text-success me-3 fs-6" onClick={()=>setcartview(true)}>
                  MyCart

                  {data.length===0?<div></div>:<Badge pill className="bg-danger ms-2">{data.length}</Badge>}
                </Link>
                {cartview?<Modal onClose={()=>setcartview(false)}><Cart/></Modal>:null}
                <Link className="btn bg-light text-danger me-3 fs-6" onClick={handleLogout}>
                  logout
                </Link>
              </div>

            }

          </div>
        </div>
      </nav>
    </div>
  );
}
