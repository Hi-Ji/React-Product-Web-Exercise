import axios from "axios"
import { addSetupInterceptorsTo } from "./addInterceptor"
import { BaseUrl } from "./environment"

const axiosInstance = addSetupInterceptorsTo(axios.create())

export const addApiGet = async (path) => axiosInstance.get(`${BaseUrl}${path}`)

export const addApiPost = async (path, data, header) =>{
  // console.log('Request data:', data);
  // for (let pair of data.entries()) {
  //   console.log(pair[0] + ': ' + pair[1]);
  // }
  
  return axiosInstance.post(`${BaseUrl}${path}`, data, header)}