import axios from "axios"
import { editSetupInterceptorsTo } from "./editInterceptor"
import { BaseUrl } from "./environment"

const axiosInstance = editSetupInterceptorsTo(axios.create())

export const editApiGet = async (path) => axiosInstance.get(`${BaseUrl}${path}`)

export const editApiPost = async (path, data) =>{
  // console.log('Request data:', data);
  return axiosInstance.post(`${BaseUrl}${path}`, data)}