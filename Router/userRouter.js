import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../Models/userModel.js';
import { generateToken } from '../utils/utils.js';



const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res)=> {
    // await User.remove({});
    const createdUser = await User.insertMany(data.users)
    res.send({createdUser})
}))

userRouter.post('/signin', expressAsyncHandler(async(req, res)=> {
    const user = await User.findOne({email: req.body.email});
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                password: user.password,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
        }
    }
    else {
        res.status(401).send({message: "Invalid Email or Password"})
    }

}))

export default userRouter;