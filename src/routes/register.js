import express from "express";
import bcrypt from "bcrypt";
import db from "../database/mysql.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {

        const { name, email, phone, username, password } = req.body;

        if(!username || !name || !email || !password || !phone){
            return util.buildResponse(491, {
                message: 'All fields are required'
            })
        }
        const user = await getUser(username);

        if(user && user.user_name){
            res.status(200).json({
                success: true,
                message: 'User Name already exists in our database, please  choose a different username'
            });
           
        }else{
            // Insert new user here...
            const encryptpwd = await bcrypt.hash(password.trim(), 10);

            await db.query(
                "INSERT INTO users (user_name, password, name, email, phone) VALUES (?, ?, ?, ?, ?)",
                [username, encryptpwd, name, email, phone]
            );

            res.status(200).json({
                success: true,
                data: {username: username},
                message: 'User created successfully.'
            });
        }
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
