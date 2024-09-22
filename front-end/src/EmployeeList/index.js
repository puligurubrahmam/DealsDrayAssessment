import {useEffect,useState} from 'react';
import Cookies from 'js-cookie';
import './index.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const EmployeeList =(props)=>
{
    const [employersList,setEmployersList] = useState([])
   const id = Cookies.get("id");
   useEffect(()=>
    {
        async function fetchData() {
            const option={
                method:"POST",
                body:JSON.stringify({id}),
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response  = await fetch("http://localhost:5000/emplist",option);
            const result = await response.json();
            
            setEmployersList(result)
        }
            fetchData();         
    },[])
    console.log(employersList)
    let i=0;
   const deleteFunction=(event)=>
    {
        const employeeId = event.target.value;
        async function deleteItem()
        {
            const option = {
                method:'DELETE',
                body:JSON.stringify({user:id,employeeId}),
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response = await fetch("http://localhost:5000/delete",option);
            const result = await response.json();
            const {history}=props;
            history.push("/");
        }
        deleteItem()
    }
    const updateFunction=(event)=>
    {
        const emp = event.target.value
        const {history}=props;
        history.push(`/updateemp/${emp}`);
    }
    return (
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
            <h1 className='head'>Employee List</h1>
            <div className='table-container'>
            <table>
                <tr>
                    <td>Unique Id</td>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Mobile No</td>
                    <td>Designation</td>
                    <td>Gender</td>
                    <td>Course</td>
                    <td>Create date</td>
                    <td>Action</td>
                </tr>
                {
                employersList.map((item)=>{
                    const createdAtdate = new Date(item.createdAt);
                    i=i+1;
                    return (
                        <tr>
                            <td>{i}</td>
                            <td><img src={item.image} alt="profile"/></td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td>{item.designation}</td>
                            <td>{item.gender}</td>
                            <td>{item.course}</td>
                            <td>{createdAtdate.toLocaleDateString()}</td>
                            <td><button value={item._id} onClick={updateFunction}>Edit</button><button value={item._id} onClick={deleteFunction}>Delete</button></td>
                        </tr>
                    )
                })
            }
            </table>
            </div>
        </div>
    )
}
export default EmployeeList