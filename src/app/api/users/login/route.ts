import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody);

        //check User Exist or Not

        const user = await User.findOne({email})
         if(!user) {
            return NextResponse.json({
                error:"User Does Not Exist"
            },{
                 status:400   
            })
         }

         // check Password Match Or Not

         const validPassword = await bcrypt.compare(password,user.password)
         
         if (!validPassword) {
            return NextResponse.json({
                error:"Invalid Password"
            },{
                status:400
            })
         }

         //Create Token DATA
         const tokenData = {
            id : user._id ,
            email : user.email,
            username : user.username
         }
         //create token

         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
 
         const response = NextResponse.json({
             message: "Login successful",
             success: true,
         })
         response.cookies.set("token", token, {
             httpOnly: true, 
             
         })
         return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
            )
    }
}