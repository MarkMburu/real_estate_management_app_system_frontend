import axios from "axios"
// const uri = "http://localhost:8080"
const uri = "https://equity-premier.el.r.appspot.com"
export async function getConducter(id){
    if(id){
        try {
          const response = await axios.get(`${uri}/get/conducter/${id}`);
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

  export  function insertConducter(data,id){
    try{
        console.log(data)
      axios.post(`${uri}/project/add/conducter`,JSON.stringify({...data,id}),{headers: headers})
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
 export function updateConducter(data){
   try{
     axios.put(`${uri}/update/conducter/${data._id}`,JSON.stringify({...data}),{headers: headers})
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

export function deleteConducter(id){
 try{
   axios.delete(`${uri}/delete/conducter/${id}`)
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