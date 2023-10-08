import React from 'react'

export default function Corousel() {
    return ( 
        <div>
            <div id="carouselExample" style={{objectFit:"contain !important"}} className="carousel slide">

                <div className="carousel-inner" id="cor">
                    <div className='carousel-caption' style={{zIndex:"10",filter:"brightness(80%)"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-light" type="submit" >Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." style={{filter:"brightness(20%)"}} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." style={{filter:"brightness(20%)"}}/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?biryani" className="d-block w-100" alt="..." style={{filter:"brightness(20%)"}}/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
