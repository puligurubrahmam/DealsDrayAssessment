import { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './index.css'
const Home =(props)=>
{
    return (
        <div>
            <h1>Logo</h1>
    <nav>
        <Link>Home</Link>
        <Link to="/addemp">Create Employee</Link>
        <Link to="/emplist">Employee List</Link>
        <Link><button onClick={()=>{
            const {history}=props;
            Cookies.remove("id")
            history.replace("/login")
            }}>Logout</button></Link>
    </nav>
    <h1 className='head'>DashBoard</h1>
    <div className="admin-container">
        <p>Welcome Admin Panel</p>
    </div>
        </div>
    )
}
export default Home