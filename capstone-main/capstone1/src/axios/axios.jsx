import React from 'react'
import axios from 'axios'
import { API } from '../loginandsignup/global'

export const signuppost=(data)=>
{
    return axios.post(`${API}/user/signup`,data)
     
}
export const getuserbyid=(id)=>{
    return axios.get(`${API}/user/users/${id}`)
}

  

