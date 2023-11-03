import { instance } from "./axios/instance"

export const login=(data)=>{
return instance.post('/api/user/login',data)
}
export const registerr=(data)=>{
 return instance.post('/api/user/signup',data)
 }