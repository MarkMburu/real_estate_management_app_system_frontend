import React,{useState,useEffect} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import{Toolbar,Paper,makeStyles,TableCell,TableBody, TableRow, InputAdornment} from "@material-ui/core";
import {Controls} from "../../../controls/Controls";
import * as ProjectPlotServices from "../../../Services/projectService";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../Popup";
import ReactLoading from "react-loading";
import ConfirmDialog from "../../../ConfirmDialog";
import Notification from "../../../Notification";
import useTable from "../../../useTable";
import ProjectPlotForm from "./ProjectPlotForm";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

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
    {id:"from",label:"Start Date"},
    {id:"to",label:"End Date"},
    {id:"duration",label:"Duration"},
    {id:"amount",label:"Amount"},
    {id:"comments",label:"Comments"},
    {id:"actions",label:"Actions",disableSorting:true}
]

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function ProjectPlot(props) {
    const classes = useStyles();
    const {id} = props
    const [records, setRecords] = useState([])
    const [notify,setNotify] = useState({isOpen:false,message:"",type:""})
    const [filterFn, setFilterFn] = useState({fn:items=>{return items}})
    const [openPopup, setOpenPopup] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
    const [recordForEdit,setRecordForEdit] = useState(null);
    const [confirmDialog,setConfirmDialog] = useState({isOpen:false, title:"",subTitle:""});
    const {TblContainer,TblHead,TblPagination,recordsAfterPagingAndSorting} = useTable(records,headCells,filterFn,isLoading);

    useEffect(()=>{

        fetchProjectPlot()
     
},[notify])

async function fetchProjectPlot(){
    const response = await ProjectPlotServices.getOneProject(id);
        console.log(response)  
         setRecords([])
         setIsLoading(true)
    } 
 const addOrEdit = (ProjectPlot,resetForm) => {
        if(!ProjectPlot._id){
            ProjectPlotServices.insertProject(ProjectPlot,id)
        }
        else{
            ProjectPlotServices.updateProject(ProjectPlot)
        }
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            setNotify({
                isOpen:true,
                message:"Submitted Successfully",
                type:"success"
            })
       }
       const openInPopUp =(item)=>{
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const onDelete = (itemid) =>{ 
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        console.log("delete")
        ProjectPlotServices.deleteProject(itemid)
        setNotify({
            isOpen:true,
            message:"Deleted Successfully",
            type:"error"
           })       
}
    return (
        <>
        <Paper className={classes.pageContent}>
          <Toolbar>
           <Controls.Button text="Add ProjectPlot" variant="outlined" startIcon={<AddIcon/> }
            className={classes.newButton}onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}/>
          </Toolbar>
          { isLoading ? <div>
          <TblContainer>
            <TblHead/>
             <TableBody>
                 
                 {recordsAfterPagingAndSorting().map((item)=>(
                      <TableRow key={item._id}>
                        <TableCell>{new Date(item.from).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(item.to).toLocaleDateString()}</TableCell>
                        <TableCell>{dateDiffInDays(new Date(item.from), new Date(item.to)) ? dateDiffInDays(new Date(item.from), new Date(item.to)) + "Days": ""}</TableCell>
                         <TableCell>{item.amount}</TableCell>
                         <TableCell>{item.Comments}</TableCell>
                         <TableCell>
                             <Controls.ActionButton color="primary" onClick={()=>{openInPopUp(item);}}>
                                 <EditOutlinedIcon fontSize="small" />
                             </Controls.ActionButton>
                             <Controls.ActionButton color="secondary"
                              onClick={()=>{
                                  setConfirmDialog({
                                      isOpen:true,
                                      title:"You are about to delete this clerk",
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
     
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="ProjectPlot Form">
             <ProjectPlotForm addOrEdit={addOrEdit} recordForEdit={recordForEdit}/>
       </Popup>
       <Notification notify={notify} setNotify={setNotify}/>
       <ConfirmDialog confirm={confirmDialog} setConfirmDialog={setConfirmDialog}/>
       
     </>
    )
}

export default ProjectPlot