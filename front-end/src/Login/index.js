import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import './index.css'
import  Cookies  from 'js-cookie';
import {useState} from 'react'
const Login =(props)=>
{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const loginClicked = async (event) =>
    {
        event.preventDefault();
        const option = {
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{
                'Content-Type':'application/json'
            }
        }
        const response = await fetch("http://localhost:5000/login",option);
        const result = await response.json();
        console.log(response);
        if(response.ok)
            {
                Cookies.set("id",result._id,{expires:1});
                const {history} = props;
                history.replace("/");
            }
            else
            {
                setError(true);
                console.log("Error Occured");
    
            }
    }
    const loggedin = Cookies.get("id");
    return(
        (loggedin!==undefined)?(<Redirect to="/"/>):
        <div>
            <h1>Login</h1>
            <form onSubmit={loginClicked}>
                <div className='container'>
                    <label>Username:</label>
                    <input placeholder='Enter UserName' onChange={(event)=>{setUsername(event.target.value)}}/>
                </div>
                <div className='container'>
                    <label>Password:</label>
                    <input placeholder='Enter Password' onChange={(event)=>{setPassword(event.target.value)}}/>
                </div>
                <p className='error'>{error&&"* Invalid User"}</p>
                <button onClick={loginClicked}>Login</button>
                <Link to="/register">Sign Up</Link>
            </form>
        </div>
    )
}
export default Login