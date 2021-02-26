import './App.css';
import Landing from './Landing';
import {Route} from "react-router-dom";
import Login from "./Login";
import Inbox from "./Inbox";
import Finances from "./Finances";
import Dashboard from "./Dashboard";
import EmployerRegister from "./EmployerRegister";
import Employees from "./Employees";
import EmployeeRegister from "./EmployeeRegister";
import Calendar from "./Calendar";
import Account from "./Account";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/inbox" component={Inbox}/>
            <Route exact path="/finances" component={Finances}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/employerregister" component={EmployerRegister}/>
            <Route exact path="/employees" component={Employees}/>
            <Route exact path="/employeeregister" component={EmployeeRegister}/>
            <Route exact path="/calendar" component={Calendar}/>
            <Route exact path="/account" component={Account}/>
        </div>
    );
}

export default App;
