const router = require("express").Router();
const { User } = require("../models/user.js");

const saveUser = async (fullName, email, number) => {
    try{
        let user = await User.findOne({email : email});
        if(user)
            return res
                .status(409)
                .send("You are already registered");
        user = new User({ fullName, email, number });
        await user.save();
        return res
            .status(201).send("User registered successfully")
            .send({message : "We sent you email with the invitation"});
    }catch(error){
        console.log(error)
        res.status(500).send({message: "Internal server error"})
    }
}
export default saveUser;