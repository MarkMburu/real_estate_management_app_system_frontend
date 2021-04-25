import axios from "axios";
const uri = "http://localhost:4000/api/project/"
// const uri = "http://localhost:8080"
export async function getAllProjects() {

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
 export async function getOneProject(id){
   if(id){
    try {
      const response = await axios.get(`${uri}/${id}`);
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
   
 

  export function insertProject(project){
     try{
       axios.post(`${uri}`,JSON.stringify({...project}),{headers: headers})
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
  export function updateProject(data){
    try{
      axios.put(`${uri}/update/${data._id}`,JSON.stringify({...data}),{headers: headers})
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

export function deleteProject(id){
  try{
    axios.delete(`${uri}/${id}`)
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