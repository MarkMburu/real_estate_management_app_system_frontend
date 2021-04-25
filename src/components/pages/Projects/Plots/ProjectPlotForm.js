import React,{useEffect} from 'react'
import {Grid,Typography} from "@material-ui/core";
import {Controls} from "../../../controls/Controls";
import {useForm,Form} from "../../../useForm";

const initialFvalues = {
    projectId:"",
    size:null,
    description:"",
    plotnumber:null,
    price:null,
    isAvailabe:null,
    isBooked:null,
   }
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
function ProjectPlotForm(props) {
    const {addOrEdit, recordForEdit} = props;

    const validate =(fieldvalues = values)=> {
        let temp = {...errors}
        if('from' in fieldvalues){
             temp.from = fieldvalues.from  ? "" : "This Field is required"
        }
        if('to' in fieldvalues)     
             temp.to = fieldvalues.to ? "" : "This Field is required"
        if('duration' in fieldvalues)
             temp.duration = fieldvalues.duration  ? "" : "This Field is required"
        
        setErrors({
            ...temp
        })
        if(fieldvalues === values)
         return Object.values(temp).every(x => x === "" )
    }
    const {values,setValues,errors,setErrors,handleInputChange,resetForm} = useForm(initialFvalues,true,validate);
    
    
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validate())
            console.log(values,"values")
            addOrEdit(values,resetForm)
    }
    return (
        <Form onSubmit={handleSubmit}>
        <Grid container>
             <Grid item xs={6}>
             <Controls.DatePickers name="from" label="Start Date" value={values.from} onChange={handleInputChange} error={errors.from}/>
                 </Grid>

                 <Grid item xs={6}>
                 <Controls.DatePickers name="to" label="Final Date" value={values.to} onChange={handleInputChange} error={errors.to}/>
                 </Grid>
        </Grid>
        <Grid container>
        <Grid item xs={6}>
         <Controls.Input label="Amount" name="amount" value={values.amount} onChange={handleInputChange} error={errors.amount}/>
         <Controls.Input label="Comments" name="comments" value={values.comments} onChange={handleInputChange}/>
        </Grid>
        <Grid item xs={6}>
         <Controls.Input label="Duration" name="duration" value={dateDiffInDays(new Date(values.from), new Date(values.to))}/>
        </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={6}>
            <Controls.Button text="Reset" onClick={resetForm} color="default"/>
            </Grid>
            <Grid item xs={6}>
             <Controls.Button text="Submit" type="submit"/>
            </Grid>
        </Grid>
    </Form>
    )
}

export default ProjectPlotForm