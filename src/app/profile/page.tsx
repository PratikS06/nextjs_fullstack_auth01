"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import {Toaster} from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";


export default function ProfilePage() {

    const [data,setData] = useState("nothing")

    const router = useRouter()

    const logout = async() =>{
        try {
            
            await axios.get('/api/users/logout')
            toast.success("Logout Success")
            
            router.push("/login")

        } catch (error:any) {
            console.log(error);
            toast.error(error.message)

            
        }
    }

    const getUserDetails = async()=>{
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)

        
    }
    
    return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <Toaster position="top-right" reverseOrder={false}/>
        <div>Profile</div>
        <hr/>
        <div>Profile Page</div>
        <hr/>
        <h2 className="p-3 rounded  bg-yellow-500">{data === "nothing" ? "Nothing.." : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr/>
        <button 
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-lg mb-4 mt-4">
        Signout
        </button>
        <button 
        onClick={getUserDetails}
        className="bg-green-700 hover:bg-blue-700 text-white font-bold p-2 rounded-lg mb-4 mt-4">
        user Details
        </button>
    </div>    
    )
}


