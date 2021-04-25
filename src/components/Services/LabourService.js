import axios from "axios";
const uri = "https://equity-premier.el.r.appspot.com/"
// const uri = "http://localhost:8080"
export async function getAllLabours() {

    try {
        const response = await axios.get(`${uri}/get/labour`);
        let {data} = response;
        return data
      } catch (error) {
        console.error(error);
      }
  }
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    }

  export function insertLabour(labour){
     try{
       axios.post(`${uri}/project/add/labour`,JSON.stringify({...labour}),{headers: headers})
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
  export function updateLabour(data){
    console.log("put ..................")
    try{
      axios.put(`${uri}/update/labour/${data._id}`,JSON.stringify({...data}),{headers: headers})
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

export function deleteLabour(id){
  try{
    axios.delete(`${uri}/delete/labour/${id}`)
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