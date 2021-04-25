import React,{useState} from "react";
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { makeStyles,ThemeProvider,createMuiTheme } from '@material-ui/core';
import Drawer from "./components/Drawer";
import Projects from "./components/pages/Projects";
import Plots from "./components/pages/Plots"
import Users from "./components/pages/Users";
import Dashboard from "./components/pages/Dashboard";
import Gallery from "./components/pages/Gallery";
import ProjectDetails from "./components/pages/ProjectDetails";
const useStyles = makeStyles(theme =>({
  container:{
    display:"flex"
  },
  content: {
    width:"100%",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    margin:theme.spacing(3)
  },
}))
const theme = createMuiTheme({
  palette:{
    primary:{
      // main:"#333996",
      main:"#bda000",
      light:"#fafad2",
      // light:"#3c44b126"
    },
    secondary:{
      main:"#f83245",
      light:"#f8324526"
    },
    background:{
      default: "#f4f5fd"
    },
    shape:{
      borderRadius: '12px'
    }
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:"translateZ(0)"
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})
function App() {
  const classess = useStyles();
  const [isLoggedIn,setIsLoggedIn] = useState(true);

  return (
    <>
    <ThemeProvider theme={theme}>
    <div className={classess.container}>
      <Router>
        <Drawer/>
        <Switch>
          <div className={classess.content}>
        <Route path="/" component={Dashboard} exact/>
        <Route path="/projects" component={Projects} exact/>
        <Route path="/projects/:id" component={ProjectDetails} exact/>
        <Route path="/plots" component={Plots} exact/>
        <Route path="/users" component={Users} exact/>
        <Route path="/gallery" component={Gallery} exact/>
        </div>
        </Switch>
      </Router>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;