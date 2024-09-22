import { useState } from 'react'
import './index.css'
import  Cookies  from 'js-cookie'
import { Redirect,Link } from 'react-router-dom/cjs/react-router-dom.min'
const AddEmployer =(props)=>
{
    const [name,updateName] = useState('')
    const [email,updateEmail] = useState('')
    const [mobile,updateMobile] = useState('')
    const [designation,updateDesignation] = useState('HR')
    const [gender,updateGender] = useState('male')
    const [course,updateCourse] = useState('')
    const [image,updateImage] = useState('')

    const submitForm = async (event)=>
    {
        event.preventDefault();
        const option ={
            method:'POST',
            body:JSON.stringify({
                name,email,mobile,designation,gender,course,image,user:loginned
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }
        const response =await fetch("http://localhost:5000/addemp",option);
        const result =await response.json();
        console.warn(result);
        updateName('');
        updateMobile('');
        updateImage('');
        updateGender('male');
        updateEmail('');
        updateDesignation('HR');
        updateCourse('');
        const {history}=props;
        history.push("/emplist");
    }
    const loginned=Cookies.get("id");
    console.log(loginned)
        return (
            (loginned===undefined)?(<Redirect to="/login"/>):
            <div>
                <h1>Logo</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/addemp">Create Employee</Link>
                    <Link to="/emplist">Employee List</Link>
                    <Link><button onClick={()=>{
                        const {history}=props;
                        Cookies.remove("id")
                        history.replace("/login")
                        }}>Logout</button></Link>
                </nav>
                <div>
                <h1 className='head'>Create Employee</h1>
                <form className='form-item' onSubmit={submitForm}>
                    <div className='container'>
                        <label>Name</label>
                        <input placeholder='Enter name' onChange={(event)=>{updateName(event.target.value)}}/>
                    </div>
                    <div className='container'>
                        <label>Email</label>
                        <input placeholder='Enter email' onChange={(event)=>{updateEmail(event.target.value)}}/>
                    </div>
                    <div className='container'>
                        <label>Mobile No</label>
                        <input placeholder='Enter Mobile No' onChange={(event)=>{updateMobile(event.target.value)}}/>
                    </div>
                    <div className='container'>
                        <label>Designation</label>
                        <select value={designation} onChange={(event)=>{updateDesignation(event.target.value)}}>
                            <option value="HR" selected>HR</option>
                            <option value="Manager">Manager</option>
                            <option value="sales">Sales</option>
                        </select>
                    </div>
                    <div className='container'>
                        <label>Gender</label>
                        <input id="male" type="radio" name="gender" value="M" onChange={(event)=>{updateGender(event.target.value)}}/>
                        <label htmlFor='male'>male</label>
                        <input id="female" name="gender" type="radio" value="F" onChange={(event)=>{updateGender(event.target.value)}}/>
                        <label htmlFor='female'>female</label>
                    </div>
                    <div className='container'>
                        <label>Course</label>
                        <input id="MCA" type="checkbox" value="MCA" onChange={(event)=>{updateCourse(event.target.value)}}/>
                        <label htmlFor='MCA'>MCA</label>
                        <input id="BCA" type="checkbox" value="BCA" onChange={(event)=>{updateCourse(event.target.value)}}/>
                        <label htmlFor='BCA'>BCA</label>
                        <input id="BSC" type="checkbox" value="BSC" onChange={(event)=>{updateCourse(event.target.value)}}/>
                        <label htmlFor='BSC'>BSC</label>
                    </div>
                    <div className='container'>
                        <label>Img Upload</label>
                        <input placeholder='Upload File' type="file" onChange={(event)=>{updateImage(event.target.value)}}/>
                    </div>
                    <button className='create-btn' onClick={submitForm}>Submit</button>
                </form>
                </div>
            </div>
        )
}
export default AddEmployer