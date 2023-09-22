const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");

//Register
router.post('/register', async (req,res) => {
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.password , salt);
        const newUser= new User({
            empcode:req.body.empcode,
            name:req.body.name,
            email: req.body.email,
            password: hashedPass,
        });
        const user= await newUser.save();
        res.status(200).json(user)
    } catch(err){
        console.error("Error during registration:", err);
        res.status(500).json(err)
    }
});

//Login API
router.post('/login', async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if (!user){
            return res.status(400).json({error:"Wrong email"});
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
            return res.status(400).json({error:"wrong password"})
        }
        const {password,...others} =user._doc;
        return res.status(200).json(others)
    }catch(err){
        res.status(500).json({ error: "Internal server error" })
    }
})
module.exports = router;


