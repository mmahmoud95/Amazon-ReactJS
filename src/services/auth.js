import toast from "react-hot-toast";
import { instance } from "./axios/instance"


export const login = (data) => {
  return instance.post('/api/user/checkEmail', data)
    .catch(error => {
      if (error.response.status === 404) {
       toast.error("Email not found. Please sign up", { position: "top-center" });
      }
      throw error; 
    });
};

// export const login=(data)=>{
// return instance.post('/api/user/checkEmail',data)
// }
export const registerr=(data)=>{
 return instance.post('/api/user/signup',data)
 }