import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function generateToken(userInfo) {
  if(!userInfo){
        return null;
    }

    return jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}
