import axios from "axios";
// const uri = "http://localhost:8080"
const uri = "https://equity-premier.el.r.appspot.com"
export async function getFuel(id){
    if(id){
        try {
          const response = await axios.get(`${uri}/get/fuel/${id}`);
          let {data} = response;
          console.log("getone.....",data)
          return data
        } catch (error) {
          console.error(error);
        }
      }
      else{
        console.log("id not selected")
      }
}
var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  }

export  function insertFuel(data,id){
  try{
    axios.post(`${uri}/project/add/fuel`,JSON.stringify({...data,id}),{headers: headers})
    .then((response) => {
     console.log(response.data);
   }, (error) => {
     console.log(error);
   });
  }
  catch(error){
    console.error(error)
  }
}

export function deleteFuel(id){
  try{
    axios.delete(`${uri}/delete/fuel/${id}`)
    .then((response) => {
      console.log(response.data);
    }, (error) => {
      console.log(error);
    });
   }
   catch(error){
     console.error(error)
  }
}
export function updateFuel(data){
  console.log(data)
  try{
    axios.put(`${uri}/update/fuel/${data._id}`,JSON.stringify({...data}),{headers: headers})
    .then((response) => {
      console.log(response.data);
    }, (error) => {
      console.log(error);
    });
   }
   catch(error){
     console.error(error)
  }
  }