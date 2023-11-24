"use client"
import React, { useEffect, useState } from 'react'
import Link  from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Toaster} from "react-hot-toast"




export default function SignupPage(){

    const router = useRouter()
    const [user,setUser] = React.useState({
        username: "",
        email:"",
        password:""
    })

    const [buttonDisabled,setButtonDisabled] = React.useState(false) 
    const [loading,setLoading] = React.useState(false)

    

    const onSignup= async()=> {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Successfully",response.data);
            router.push("/login")
            
            toast.success('Successfully toasted!')
            
        } catch (error:any) {
            console.log("Signup Failed!!! ", error);
            toast.error("Please Use Another Email ... Email ID Already Exists!! ")
            

        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user])

    return(
        
        <div className='bg-slate-950'>
            <Toaster position="top-right" reverseOrder={false}/>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white ">
            <h1 >{loading ? "Processing..." : "Signup Page"}</h1>
            <hr/>
            <label htmlFor='username'>UserName</label>
            <input type="text"
            className=' text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 '
            id='username'   
            value={user.username}
            onChange={e=> setUser({...user,username: e.target.value})}
            placeholder='username'
            />
            <label htmlFor='email'>Email</label>
            <input type="text"
            className='p-2  text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 '
            id='email'   
            value={user.email}
            onChange={e=> setUser({...user,email: e.target.value})}
            placeholder='Email ID'
            />
            <label htmlFor='password'>Password</label>
            <input type="password"
            className='p-2  text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 '
            id='password'   
            value={user.password}
            onChange={e=> setUser({...user,password: e.target.value})}
            placeholder='Password'
            />
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 '
            onClick={onSignup}
            >{buttonDisabled ? "": "Signup"}</button>
            <h3>Already Have Account </h3>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-lg mb-4 '>
            <Link href="/login">Login In</Link>
            </button>
        </div>
        </div>
    )
}