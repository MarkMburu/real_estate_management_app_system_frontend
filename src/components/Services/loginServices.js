import axios from "axios";

export const responseSuccessGoogle=(response,props)=>{
   axios({
       method:"POST",
       url:"https://equity-premier.el.r.appspot.com/api/googlelogin",
       data:{tokenId: response.tokenId}
   }).then((response)=>{
      console.log(response)
   })
   .catch((err)=> console.log(err))
}
export const responseErrorGoogle =(response) => {
    console.log(response)
}