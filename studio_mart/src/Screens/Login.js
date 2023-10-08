import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
export default function Login() {
  const [credentials, setcredentials] = useState({password:"",email:""})
  let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/loginuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        console.log(json);
        if(!json.success){
            alert("enter valid credentials");
        }
        if(json.success){
          localStorage.setItem("userEmail",credentials.email);
          localStorage.setItem("authtoken",json.authtoken);
          console.log(localStorage.getItem("authtoken"));
          navigate("/")
        }
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
       <div className='container text-light bg-dark'>
            <form onSubmit={handleSubmit}>

                <div className="form-outline mb-4 text-light bg-dark">
                    <input type="text" id="form2Example4" className="form-control text-light bg-dark" name='email' value={credentials.email} onChange={onChange}/>
                    <label className="form-label" htmlFor="form2Example4" >Email address</label>
                </div>

        
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control text-light bg-dark" name='password' value={credentials.password} onChange={onChange}/>
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                </div>
  
                <div className="row mb-4">

                    <div className="col">
                        
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="submit" className="btn btn-success btn-block mb-4 m-3">submit</button>
                <Link to='/createuser' className="btn btn-danger btn-block mb-4 m-3">new user</Link>

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
    </div>
  )
}
