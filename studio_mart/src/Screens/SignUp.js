import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
export default function SignUp() {

    const navigate=useNavigate();

    const [credentials, setcredentials] = useState({name:"",password:"",email:"",geolocation:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
           navigate("/login"); 
        }
        if(!json.success){
            alert("enter valid credentials");
        }

        
        
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
        <>
        <div className='container text-light bg-dark'>
            <form onSubmit={handleSubmit}>

                <div className="form-outline mb-4 text-light bg-dark" >
                    <input type="text" id="form2Example1" className="form-control text-light bg-dark" name='name' value={credentials.name} onChange={onChange}/>
                    <label className="form-label" htmlFor="form2Example1" >UserName</label>
                </div>

                <div className="form-outline mb-4 text-light bg-dark">
                    <input type="text" id="form2Example4" className="form-control text-light bg-dark" name='email' value={credentials.email} onChange={onChange}/>
                    <label className="form-label" htmlFor="form2Example4" >Email address</label>
                </div>

        
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control text-light bg-dark" name='password' value={credentials.password} onChange={onChange}/>
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                </div>

                <div className="form-outline mb-4 text-light bg-dark">
                    <input type="text" id="form2Example3" className="form-control text-light bg-dark" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
                    <label className="form-label" htmlFor="form2Example3" >address</label>
                </div>

                
                <div className="row mb-4">

                    <div className="col">
                        
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="submit" className="btn btn-success btn-block mb-4 m-3">submit</button>
                <Link to='/login' className="btn btn-danger btn-block mb-4 m-3">Sign in</Link>

                <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-secondary btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-secondary btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-secondary btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-secondary btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button>
                </div>
            </form>
            </div>
        </>
    )
}
