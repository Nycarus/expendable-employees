import './App.css';
import Homepage from './pages/Homepage';
import { Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";
import UserLanding from "./pages/UserLanding";

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
        2nd level of the app hierarchy; child of 'index.js'
            Also shouldn't need to be touched.

        ThemeProvider applies a custom theme specified from 'const theme' above
        CssBaseLine applies Material UI's standard baseline for default styling

        Switch & Route sets up routing,
            Essentially a switch case to each route

     */
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <Switch>
                    <Route exact from="/" component={Homepage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/user" component={UserLanding}/>
                </Switch>
            </div>
        </ThemeProvider>
    );
}

