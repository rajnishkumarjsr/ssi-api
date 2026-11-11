import express from "express";
import verifyToken  from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {username, token} = req.body;
        if(!username || !token){
            res.status(401).json({
                verified: false,
                message: 'Incorrect requist body'
            });
        }

        const varification = verifyToken(username, token);

         if(!varification.verified){
            res.status(401).json({
                verified: false,
                message: varification.message
            });
        }
        
        res.status(200).json({
            verified: true,
            message: 'success',
            user: username,
            token: token
        });

    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;