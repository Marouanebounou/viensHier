const router = require("express").Router();
const { User } = require("../models/user.js");
const sendEmail = require("./utils/sendEmail.js");

router.post("/" , async (req , res)=>{
    try{
        let user = await User.findOne({email : req.body.email});
        if(user)
            return res
                .status(409)
                .send("You are already registered");
        const { fullName, email, number } = req.body;
        user = new User({ fullName, email, number });
        await user.save();
        return res
            .status(201).send("User registered successfully")
            .send({message : "We sent you email with the invitation"});

        const message = `Type message here that will go to the user email`
        await sendEmail(user.email, "Invitation" , message);


    }catch(error){
        console.log(error)
        res.status(500).send({message: "Internal server error"})
    }
}
)