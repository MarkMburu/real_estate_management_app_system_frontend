import axios from "axios";
const uri = "http://localhost:4000/api/plot/"
export async function getAllPlots() {

    try {
        const response = await axios.get(`${uri}`);
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

  export function insertplot(plot){
    console.log(plot)
     try{
       axios.post(`${uri}`,JSON.stringify({...plot}),{headers: headers})
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
 
  export function updateplot(data){
    console.log("put ..................")
    try{
      axios.put(`${uri}/update/plot/${data._id}`,JSON.stringify({...data}),{headers: headers})
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

export function deleteplot(id){
  try{
    axios.delete(`${uri}/delete/plot/${id}`)
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