import React from 'react'
import {Drawer as MUIDrawer,List,ListItem,ListItemText,ListItemIcon,AppBar,Toolbar,Typography,IconButton} from "@material-ui/core";
import { makeStyles,Grid,Badge } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PhotoIcon from '@material-ui/icons/Photo';
import GroupIcon from '@material-ui/icons/Group';
import {withRouter} from "react-router-dom";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatIcon from '@material-ui/icons/Chat';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
      },
      appBar: {
        width: `calc(100% - 170px)`,
        marginLeft: "260px",
      },
      drawerColor:{
         backgroundColor:"#fff",
         color:"rgb(179, 0, 0)"
      },
      paper: {
        background: "rgb(64, 54, 8)",
        color:"#fff"
      },
  drawer:{
    width:"200px",
    flexShrink: 0,
    height: "100%",
   
  },
  drawerPaper: {
    width: 270,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}))
function Drawer(props) {
    const {history} = props;
    const classes = useStyles()
    const itemList = [
        {
            text:"Dashboard",
            icon:<HomeIcon color="primary"/>,
            onClick: () => history.push("/")
        },
        {
            text:"Projects",
            icon:<FormatListBulletedIcon color="primary"/>,
            onClick: () => history.push("/projects")
        },
        {
            text:"Users",
            icon:<GroupAddIcon color="primary"/>,
            onClick: () => history.push("/Users")
        },
        {
            text:"Plots",
            icon:<CollectionsBookmarkIcon color="primary"/>,
            onClick: () => history.push("/Plots")
        },{
          text:"Gallery",
          icon:< PhotoIcon color="primary"/>,
          onClick: () => history.push("/Gallery")
        }
    ]
    return (
        <div  className={classes.root}>
        <AppBar position="fixed" className={classes.appBar} classes={{root:classes.drawerColor}}>
        <Toolbar>
          <Grid container alignItems="center">
                        <Grid item  >
                        <Typography variant="h6" noWrap>
                             Anchor Premier Land Solution App Management
                           </Typography>
                         </Grid>
                         <Grid item sm></Grid>
                     <Grid item  >
                         <IconButton>
                       <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon fontSize="small"/>
                             </Badge>
                       </IconButton>
                             <IconButton>
                             <Badge badgeContent={3} color="primary">
                                <ChatIcon/>
                             </Badge>
                             </IconButton>

                             <IconButton>
                             <PowerSettingsNewIcon/>
                         </IconButton>
                         </Grid>
                    </Grid>
        </Toolbar>
      </AppBar>
        
        <MUIDrawer variant="permanent" className={classes.drawer}  classes={{
          paper: classes.drawerPaper,paper: classes.paper
        }}>
            <div className={classes.toolbar} />
           <List>
               {itemList.map((item,index)=>{
                   const {text,icon,onClick} = item;
                   return(
                       <ListItem button key={text} onClick={onClick}>
                           {icon && <ListItemIcon>{icon}</ListItemIcon>}
                           <ListItemText primary={text}/>
                       </ListItem>
                   )
               })}
           </List>
        </MUIDrawer>
        </div>
    )
}

export default withRouter(Drawer)