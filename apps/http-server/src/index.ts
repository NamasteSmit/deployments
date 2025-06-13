import express , {Request,Response} from "express"
import { client } from "@repo/db/client";

const app = express();
const PORT = 3005;

app.use(express.json())

app.get('/' , (req , res)=>{
    res.send({
        msg : "hi there welcome from server"
    })
})

app.post("/signup" , async(req : Request ,res:Response) : Promise<any> =>{
    const {username , password} = req.body;

    const user = await client.user.create({
        data : {
            username : username,
            password : password
        }
    })

    return res.status(200).json({
        msg : 'user created',
        user : user.username,
        userId : user.id
    })
})


app.listen(PORT,()=>{
    console.log("server is up")
})