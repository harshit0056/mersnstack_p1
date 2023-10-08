import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './contextReducer';
import addToCartAudio from './clips/dbz.mp3'; 


export default function Card(props) {
    let data=useCart();
    let dispatch=useDispatchCart();
    let priceref=useRef();
    let option = props.options ?? {};
    const[qnt,setqnt]=useState(1);
    const[size,setsize]=useState("");
    let priceOptions = Object.keys(option);
    let finalPrice = parseInt(qnt) * parseInt(option[size])

    global.len = data.length;


    useEffect(()=>{
        setsize(priceref.current.value);
    },[])

    const handleaddtocart = async () => {
        if (!localStorage.getItem("authtoken")) {
          alert("Phle signup/login to kr gadhe");
        } else {
          const audio = new Audio(addToCartAudio);
          audio.play();
    
          let food = [];
          for (const item of data) {
            if (item.id === props.foodItem._id) {
              food = item;
              break;
            }
          }
    
          if (food.length !== 0) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qnt: qnt });
              return;
            } else if (food.size !== size) {
              await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qnt: qnt, size: size });
              return;
            }
            return;
          }
    
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qnt: qnt, size: size });
          console.log(data);
        }
      };


    return (
        <div style={{ objectFit: "contain !important" }}>
            <div className="card mt-5 border border-light border-1 text-light bg-dark" style={{ "width": "18rem", "maxHeight": "420px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">first product</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setqnt(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceref} onChange={(e)=>setsize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        {/* div is not by default inline so we need to include class inline */}
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success' onClick={handleaddtocart}>add to cart</button>
                </div>
            </div>
        </div>
    )
}
