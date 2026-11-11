import express from "express";
import bcrypt from "bcrypt";
import generateToken  from "../utils/auth.js";
import db from "../database/mysql.js";


// import {
//     DynamoDBClient
// } from "@aws-sdk/client-dynamodb";

// import {
//     DynamoDBDocumentClient,
//     GetCommand,
// } from "@aws-sdk/lib-dynamodb";


const router = express.Router();

// =====================================================
// DynamoDB Client
// =====================================================
// const AWS_REGION = process.env.AWS_REGION || "us-east-1";

// const client = new DynamoDBClient({
//     region: AWS_REGION
// });

// const dynamoDB = DynamoDBDocumentClient.from(client);

// const userTable = process.env.TABLE_NAME || 'users';

router.post("/", async (req, res) => {
    try {

        const { username, password } = req.body;
        
        // Check if username and password are provided
        if(!username || !password){
            res.status(401).json({
                message: 'username and password are required'
            });
        }

        // Check if user exists in DynamoDB
        const user = await getUser(username.toLowerCase().trim());
        if(!user || !user.user_name){
            res.status(403).json({
                message: 'user does not exist'
            }); 
        }else if(!bcrypt.compareSync(password, user.password)){
            // Check if password is correct
            res.status(403).json({
                message: 'password is incorrect'
            });
        }else{
            const userInfo = {
            username: user.user_name,
            name: user.name,
            email: user.email,
            mobile: user.mphoneobile
            }

            const token = generateToken(userInfo)

            const response = {
                user: userInfo,
                token: token
            }

            res.status(200).json({
                success: true,
                data: response
            });
        }

        // Check if password is correct
        // if(!bcrypt.compareSync(password, user.password)){
        //     res.status(403).json({
        //         message: 'password is incorrect'
        //     });
        // }

        
        

    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(username){
   try{
        const [rows] = await db.query(
            `CALL get_user(
                ?
            )`,
            [
                username
            ]
        );

         return rows[0][0];

    }catch (err) {
        return err.message;
        
    }
}
export default router;

