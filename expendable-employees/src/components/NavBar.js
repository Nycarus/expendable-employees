import {Link} from 'react-router-dom';

function NavBar() {
    return (
        <ul>
            <li><Link to="/">Landing</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
            <li><Link to="/finances">Finances</Link></li>
            <li><Link to="/employerregister">EmployerRegister</Link></li>
            <li><Link to="/employees">Employees</Link></li>
            <li><Link to="/employeeregister">EmployeeRegister</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/account">Account</Link></li>
        </ul>
    )
}

export default NavBar;