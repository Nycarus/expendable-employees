import './App.css';
import Landing from './pages/Landing';
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./pages/Login";
import Inbox from "./pages/Inbox";
import Finances from "./pages/Finances";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Calendar from "./pages/Calendar";
import Account from "./pages/Account";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";

// Custom Theme
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

export default function App() {
    /*
    Applies theme and sets up routing to all pages across app.
     */
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <BrowserRouter forceRefresh={true}>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/inbox" component={Inbox}/>
                    <Route exact path="/finances" component={Finances}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/employees" component={Employees}/>
                    <Route exact path="/addemployee" component={AddEmployee}/>
                    <Route exact path="/calendar" component={Calendar}/>
                    <Route exact path="/account" component={Account}/>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

