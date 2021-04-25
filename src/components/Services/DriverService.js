import axios from "axios"
// const uri = "http://localhost:8080"
const uri = "https://equity-premier.el.r.appspot.com"
export async function getDriver(id){
    if(id){
        try {
          const response = await axios.get(`${uri}/get/driver/${id}`);
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

  export  function insertDriver(data,id){
    try{
      axios.post(`${uri}/project/add/driver`,JSON.stringify({...data,id}),{headers: headers})
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
 export function updateDriver(data){
   try{
     axios.put(`${uri}/update/driver/${data._id}`,JSON.stringify({...data}),{headers: headers})
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

export function deleteDriver(id){
 try{
   axios.delete(`${uri}/delete/driver/${id}`)
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