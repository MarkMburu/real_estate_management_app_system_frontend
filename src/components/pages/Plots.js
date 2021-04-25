import React,{useState,useEffect} from 'react'
import PageHeader from "../PageHeader";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ProjectForm from "./Forms/ProjectForm";
import * as Plotservices from "../Services/Plotservice"
import Popup from "../Popup";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {Controls} from "../controls/Controls";
import{Toolbar,Paper,makeStyles,TableCell,TableBody, TableRow, InputAdornment} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useTable from "../useTable";
import {Search} from "@material-ui/icons";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import ReactLoading from "react-loading";
import {dateDiffInDays} from "../convertTime";

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin: theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput:{
        width: '75%'
    },
    newButton:{
        position: "absolute",
        right:"10px"
    }
}))
const headCells=[
    {id:"projectName",label:"Plots Name"},
    {id:"NumberOf Plots",label:"Number Of plots"},
    {id:"PlotsDetails",label:"Project Details"},
    {id:"updatedat",label:"updated _at"},
    {id:"actions",label:"Actions",disableSorting:true}


]


function Plots(props) {
    const {history} = props;
    const classes =  useStyles();
    // const fetchedPlots = Plotservices.getAllPlots().then(data => data)
     const [records,setRecords] = useState([])
     const [notify,setNotify] = useState({isOpen:false,message:"",type:""})
     const [filterFn, setFilterFn] = useState({fn:items=>{return items}})
     const [openPopup, setOpenPopup] = useState(false);
     const [isLoading,setIsLoading] = useState(false)
     const [recordForEdit,setRecordForEdit] = useState(null);
     const [confirmDialog,setConfirmDialog] = useState({isOpen:false, title:"",subTitle:""});
     const {TblContainer,TblHead,TblPagination,recordsAfterPagingAndSorting} = useTable(records,headCells,filterFn,isLoading);
   
   useEffect(()=>{

        fetchedPlots()
     
},[notify])

async function fetchedPlots(){
    const response = await Plotservices.getAllPlots();
    console.log(response)
         setRecords(response)
         setIsLoading(true)
    }   
  
    const addOrEdit = (project, resetForm) => {
        if (project.id){
            console.log(project)
            Plotservices.updateplot(project)
        } 
        else{
            Plotservices.insertplot(project)
        }
            
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }
   
     const handleSearch=(e)=>{
        let target = e.target
        setFilterFn({
            fn : items =>{
                if(target.value === "") return items
                else
                 return items.filter(x => x.projectName.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
      }

      const openInPopUp =(item)=>{
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const onDelete = (id) =>{ 
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        console.log("delete")
        Plotservices.deleteplot(id)
        setNotify({
            isOpen:true,
            message:"Deleted Successfully",
            type:"error"
           })  

}

    return (
     <>
     
      <PageHeader title="Plots" subtitle="Plots" icon={<FormatListBulletedIcon/>}/>  
      <Paper className={classes.pageContent}>
          <Toolbar>
          <Controls.Input label="Search Plots" className={classes.searchInput}
           InputProps={{startAdornment:(<InputAdornment position="start"><Search/></InputAdornment>)}}  onChange={handleSearch}/>
           <Controls.Button text="Add Plots" variant="outlined" startIcon={<AddIcon/> }
            className={classes.newButton}   onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}/>
          </Toolbar>
          { isLoading ? <div>
          <TblContainer>
            <TblHead/>
             <TableBody>
                 
                 {recordsAfterPagingAndSorting().map((item)=>(
                      <TableRow key={item._id} >
                          <TableCell onClick={ () => history.push("/Plots/"+item._id)}>{item.projectname}</TableCell>
                         <TableCell onClick={ () => history.push("/Plots/"+item._id)}>{item.numberofplots}</TableCell>
                         <TableCell onClick={ () => history.push("/Plots/"+item._id)}>{item.projectname}</TableCell>
                         <TableCell onClick={ () => history.push("/Plots/"+item._id)}>{new Date(item.updated_at).toLocaleDateString()}</TableCell>
                         <TableCell>
                             <Controls.ActionButton color="primary" onClick={()=>{openInPopUp(item);}}>
                                 <EditOutlinedIcon fontSize="small" />
                             </Controls.ActionButton>
                             <Controls.ActionButton color="secondary"
                              onClick={()=>{
                                  setConfirmDialog({
                                      isOpen:true,
                                      title:"You are about to delete this Plots",
                                      subTitle:"You cant reverse this process",
                                      onConfirm :() => {onDelete(item._id)}
                                  })}
                                  }>
                                 <CloseIcon fontSize="small"/>
                             </Controls.ActionButton>
                         </TableCell>
                     </TableRow> 
                   
                 ))
                 }
             </TableBody>
        </TblContainer>
        </div> : <ReactLoading type={"bars"} color={"white"} /> }
        <TblPagination/>
      </Paper>
     
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Plots Form">
             <ProjectForm addOrEdit={addOrEdit} recordForEdit={recordForEdit}/>
       </Popup>
       <Notification notify={notify} setNotify={setNotify}/>
       <ConfirmDialog confirm={confirmDialog} setConfirmDialog={setConfirmDialog}/>
       
     </>
     
    )
}

export default Plots
