import React from 'react'
import {FormControl,FormHelperText,InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";

function UnitSelect(props) {
    const {name,label,value,onChange,error=null, options} = props;
    console.log(options)
    return (
        <FormControl variant="outlined" {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect  label={label} name={name} value={value} onChange={onChange}>
                <MenuItem value="">None</MenuItem> 
                {
                    options.map((item)=>(
                      <MenuItem value={item._id} key={item._id}>{item.unitName}</MenuItem>)
                    )
                }
            </MuiSelect>
            {Error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default UnitSelect
