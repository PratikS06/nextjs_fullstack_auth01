"use client"
import React, { useEffect, useState } from 'react'
import Link  from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Toaster} from "react-hot-toast"




export default function LoginPage(){
    const router = useRouter()

    const [user,setUser] = React.useState({
        username: "",
        email:"",
        password:""
    })

    const [buttonDisabled,setButtonDisabled] = React.useState(false) 
    const [loading,setLoading] = React.useState(false)

    

    const onLogin= async()=> {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login Successfully",response.data);
            router.push("/profile")
            
            toast.success('Login Successfully')
            
        } catch (error:any) {
            console.log("Login Failed!!! ", error);
            toast.error("Login Failed!!!")
            

        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user])

    return(
        <div className='bg-slate-950 '>
            <Toaster position="top-right" reverseOrder={false}/>
        <div className=" flex flex-col items-center justify-center min-h-screen py-2 text-white ">
            <h1 >{loading ? "Processing..." : "Please Login"}</h1>
            <hr/>
            <label htmlFor='email'>Email</label>
            <input type="text"
            className=' text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 '
            id='email'   
            value={user.email}
            onChange={e=> setUser({...user,email: e.target.value})}
            placeholder='Email ID'
            />
            <label htmlFor='password'>Password</label>
            <input type="password"
            className='text-black  p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 '
            id='password'   
            value={user.password}
            onChange={e=> setUser({...user,password: e.target.value})}
            placeholder='Password'
            />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            onClick={onLogin}
            
            >{buttonDisabled ? "": "Login"}</button>
            <h3>Click Here</h3>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-lg mb-4 '>
            <Link href="/signup">Create Your Account</Link>
            </button>
        </div>
        </div>
    )
}