import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function verifyToken(username, token){
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if(error){
            return{
                verified: false,
                message: 'invalid token'
            }
        }

        if(response.username !== username){
            return{
                verified: false,
                message: 'invalid user'
            }
        }

        return{
            verified: true,
                message: 'Verified'
        }

    })
}