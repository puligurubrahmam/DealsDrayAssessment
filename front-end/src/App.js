import './App.css';
import AddEmployer from './AddEmployer/index'
import Register  from './Register/index';
import Login from './Login/index'
import Home from './Home';
import UpdateEmployer from './UpdateEmployer';
import EmployeeList from './EmployeeList';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
const App =()=>
{
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/addemp" component={AddEmployer}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/emplist" component={EmployeeList}/>
          <Route exact path="/updateemp/:emp" component={UpdateEmployer}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App;