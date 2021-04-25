import axios from "axios"
// const uri = "http://localhost:8080"
const uri = "https://equity-premier.el.r.appspot.com"
export async function getCounty(id){
    if(id){
        try {
          const response = await axios.get(`${uri}/get/county/${id}`);
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

  export  function insertCounty(data,id){
    try{
      axios.post(`${uri}/project/add/county`,JSON.stringify({...data,id}),{headers: headers})
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
 export function updateCounty(data){
   try{
     axios.put(`${uri}/update/county/${data._id}`,JSON.stringify({...data}),{headers: headers})
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

export function deleteCounty(id){
 try{
   axios.delete(`${uri}/delete/county/${id}`)
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