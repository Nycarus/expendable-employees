import './App.css';
import Landing from './Landing';
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./Login";
import Inbox from "./Inbox";
import Finances from "./Finances";
import Dashboard from "./Dashboard";
import EmployerRegister from "./EmployerRegister";
import Employees from "./Employees";
import EmployeeRegister from "./EmployeeRegister";
import Calendar from "./Calendar";
import Account from "./Account";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#404040',
        },
        secondary: {
            main: '#c7c7c7',
        }
    }
})


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <BrowserRouter>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/inbox" component={Inbox}/>
                    <Route exact path="/finances" component={Finances}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/register" component={EmployerRegister}/>
                    <Route exact path="/employees" component={Employees}/>
                    <Route exact path="/employeeregister" component={EmployeeRegister}/>
                    <Route exact path="/calendar" component={Calendar}/>
                    <Route exact path="/account" component={Account}/>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
