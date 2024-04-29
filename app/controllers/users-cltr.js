const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('../models/user-model');
const { validationResult } = require('express-validator');

const usersCltr = {};

usersCltr.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //     const body = req.body;

    // //     User.create(body)
    // //         .then((user) => {
    // //             res.status(201).json(user);
    // //         })
    // //         .catch((err) => {
    // //             res.status(500).json({ errors: "something went wrong" });
    // //         });
    // // };
    const body = req.body
    try {
        const salt = await bcryptjs.genSalt()
        const hashPassword = await bcryptjs.hash(body.password, salt)
        const user = new User(body)
        user.password = hashPassword
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ errors: 'something went wrong' })
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    try {
        const user = await User.findOne({ email: body.email })
        if (user) {
            const isAuth = await bcryptjs.compare(body.password,user.password)
            if (isAuth) {
                const tokenData = {
                    id: user._id,
                    role: user.role
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "7d" })
                return res.json({ token: token })
            }
            return res.status(404).json({ errors: "invalid email/ password" })
        }
    }
    catch (err) {
        res.status(500).json({ errors: "something went wrong" })
    }
}

usersCltr.account =async(req,res) =>{
    try{
        const user =await User.findById(req.user.id)
        res.json(user)
    }catch(err){
      res.status(500).json({errors:"something went wrong"})      
    }
}
module.exports = usersCltr 