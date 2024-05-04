import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart, useDispatchCart } from '../components/contextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();


  const handleOrder = async()=>{
    const orderItems = data.map((food) => ({
      name: food.name,
      qnt: food.qnt,
      size: food.size,
      amount: food.price // Assuming 'price' represents the amount
    }));

    let geo={}
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        geo = { latitude, longitude };
      },
      error => {
        console.error("Error getting location:", error.message);
      }
    );

    const currentDate = new Date();
    const Dateobject = {
      year : currentDate.getFullYear(),
      month : currentDate.getMonth() + 1,
      day : currentDate.getDate(),
      hours : currentDate.getHours(),
      minutes : currentDate.getMinutes(),
      seconds : currentDate.getSeconds()

    }
    const email=localStorage.getItem("userEmail")

    console.log(typeof(geo));
    console.log(typeof(email));
    console.log(typeof(currentDate));
    console.log(typeof(orderItems));

    await fetch('http://localhost:4000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // You might need additional headers like authorization token
      },
      body:JSON.stringify({location:geo,email:email,date:Dateobject,orders:orderItems}) // Replace { key: 'value' } with your actual data
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    
    
    // await fetch('http://localhost:4000/api/order',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({location:geo,email:email,date:Dateobject,orders:orderItems})
    //     });
    //     const json=await response.json();
        
    //   console.log(json);
    await dispatch({ type: "DROP"});
  }


  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' style={{ height: '400px', overflowY: 'scroll' }}>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qnt}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><FontAwesomeIcon icon={faTrash} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleOrder}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
