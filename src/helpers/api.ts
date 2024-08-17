import axios from 'axios'
import { IResponse, IUser, PartialUser } from './types'

export const Axios = axios.create({
    baseURL:"http://localhost:4002",
    withCredentials:true    
})

export const handleSignup = async (user:IUser):Promise<IResponse> => {
    const response = await Axios.post('/signup', user)
    return response.data
}   
export const handleLogin = async (user:PartialUser):Promise<IResponse> => {
    const response = await Axios.post('/login', user)
    return response.data
}

export const verifyUser = async ():Promise<IResponse> => {
    const response = await Axios.get('/verify')
    return response.data
}

export const handleLogout = async ():Promise<IResponse> => {
    const response = await Axios.post('/logout')
    return response.data
}

export const handleUpload = async (form:FormData):Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload", form)
    return response.data
}

export const handlePostUpload = async (form:FormData):Promise<IResponse> => {
    const response = await Axios.post("/posts", form)
    return response.data
}

export const getAllPosts = async ():Promise<IResponse> => {
    const response = await Axios.get("/posts")
    return response.data
}

export const changeStatus = async ():Promise<IResponse> => {
    const response = await Axios.patch("/account/set")
    return response.data
}

export const changeLogin = async (login: string, password: string): Promise<IResponse> => {
    const response = await Axios.patch("/update/login", { login, password });
    return response.data;
}

export const changePassword = async (oldPassword: string, newPassword: string) => {

    const response = await Axios.patch('/update/password', { old: oldPassword, newpwd: newPassword });
    return response.data;

};