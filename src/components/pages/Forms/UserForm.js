import React,{useEffect} from 'react'
import {useForm,Form} from "../../useForm";
import {Grid,Typography} from "@material-ui/core";
import {Controls} from "../../controls/Controls";

const initialFvalues = {
    projectName:"",
    projectNumber: "",
    numberOfUnits: "",
    from:new Date(),
    to: new Date(),
    }

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function UserForm(props) {

    const {addOrEdit, recordForEdit} = props;

    const validate =(fieldvalues = values)=> {
        let temp = {...errors}
        if('projectName' in fieldvalues){
             temp.projectName = fieldvalues.projectName  ? "" : "This Field is required"
        }
        if('projectNumber' in fieldvalues)     
             temp.projectNumber = fieldvalues.projectNumber ? "" : "Enter a Number"
        if('numberOfUnits' in fieldvalues)
             temp.numberOfUnits = fieldvalues.numberOfUnits  ? "" : "Enter a Number"
        
        setErrors({
            ...temp
        })
        if(fieldvalues === values)
         return Object.values(temp).every(x => x === "" )
    }
    const {values,setValues,errors,setErrors,handleInputChange,resetForm} = useForm(initialFvalues,true,validate);
    
    
    useEffect(()=>{
        if(recordForEdit !== null)
          setValues({
              ...recordForEdit
          })
     },[recordForEdit])

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validate())
            console.log(values,"values")
            addOrEdit(values,resetForm)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                 <Grid item xs={4}>
                     <Controls.Input label="Project Name" name="projectName" value={values.projectName} onChange={handleInputChange} error={errors.projectName}/>
                     </Grid>

                     <Grid item xs={4}>
                     <Controls.Input label="Project Number" name="projectNumber" type="number"value={values.projectNumber} onChange={handleInputChange} error={errors.projectNumber}/>
                     </Grid>
                     <Grid item xs={4}>
                     <Controls.Input label="Number Of Units" name="numberOfUnits"type="number" value={values.numberOfUnits} onChange={handleInputChange} error={errors.numberOfUnits}/>
                 </Grid>
            </Grid>
            
            <Grid container>
            <Grid item xs={4}>
                <Controls.DatePickers name="from" label="Start Date" value={values.from} onChange={handleInputChange}/>
            </Grid>
            <Grid item xs={4}>
                    <Controls.DatePickers name="to" label="End Date" value={values.to} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={4}>
            <Controls.Input label="Duration" name="duration" value={dateDiffInDays(new Date(values.from), new Date(values.to))}/>
            </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={4}>
                <div>
                 <Controls.Button text="Submit" type="submit"/>
                 <Controls.Button text="Reset" onClick={resetForm} color="default"/>
            </div>
                </Grid>
            </Grid>
        </Form>
    )
}

export default UserForm