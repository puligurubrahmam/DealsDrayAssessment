import './index.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'
const Register =()=>
{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const registerClicked =async (event) =>
    {
        event.preventDefault();
        const option = {
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{
                'Content-Type':'application/json'
            }
        }
        const response = await fetch("http://localhost:5000/register",option);
        const result = await response.json();
        console.log(result);
        
    }
    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={registerClicked}>
                <div className='container'>
                    <label>Username:</label>
                    <input placeholder='Enter UserName' onChange={(event)=>{setUsername(event.target.value)}}/>
                </div>
                <div className='container'>
                    <label>Password:</label>
                    <input placeholder='Enter Password' onChange={(event)=>{setPassword(event.target.value)}}/>
                </div>
                
                <button onClick={registerClicked}><Link to="/login">Register</Link></button>
            </form>
        </div>
    )
}
export default Register