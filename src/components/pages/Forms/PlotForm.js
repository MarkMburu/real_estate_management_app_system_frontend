import React,{useEffect,useState} from 'react'
import {useForm,Form} from "../../useForm";
import {Grid,Typography} from "@material-ui/core";
import {Controls} from "../../controls/Controls";

const initialFvalues = {
    projectname:"",
    projectDetails: "",
    numberofplots:null,
    }

function PlotForm(props) {
    const {addOrEdit, recordForEdit} = props;
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

    const validate =(fieldvalues = values)=> {
        let temp = {...errors}
        if('projectname' in fieldvalues){
             temp.projectname = fieldvalues.projectname  ? "" : "This Field is required"
        }
        if('projectDetails' in fieldvalues)     
             temp.projectDetails = fieldvalues.projectDetails ? "" : "This Field is required"
        if('numberofplots' in fieldvalues)
             temp.numberofplots = fieldvalues.numberofplots  ? "" : "Enter a Number"
        
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
        const formData = new FormData();
        
        if(validate())
        formData.append("files", selectedFile);
        formData.append("projectname",values.projectname)
        formData.append("projectDetails",values.projectDetails)
        formData.append("numberofplots",values.numberofplots)
        // console.log(formData,"values")
        addOrEdit(formData,resetForm)
        fetch(
			'http://localhost:4000/api/project',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

    }
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                 <Grid item xs={4}>
                     <Controls.Input label="Project Name" name="projectname" value={values.projectname} onChange={handleInputChange} error={errors.projectname}/>
                     </Grid>

                     <Grid item xs={4}>
                     <Controls.Input label="Project Details" name="projectDetails" value={values.projectDetails} onChange={handleInputChange} error={errors.projectDetails}/>
                     </Grid>
                     <Grid item xs={4}>
                     <Controls.Input label="Number Of Units" name="numberofplots"type="number" value={values.numberofplots} onChange={handleInputChange} error={errors.numberofplots}/>
                 </Grid>
            </Grid>
            
            <Grid container>
            <Grid item xs={4}>
            <input type="file" name="file" onChange={changeHandler} />
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

export default PlotForm