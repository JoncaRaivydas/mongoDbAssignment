const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const asyncHandler=require("express-async-handler")
const User=require("../models/userModel")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: "Please add all fields" });
        return;
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = req.body.role || "user";

    const user = await User.create({
        name,
        email,
        role,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: "Invalid User data" });
    }
});


const loginUser=asyncHandler(async(req, res)=>{
    const {email, password}=req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400).json({ message: "Invalid credentials" });
    }
})

const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:"30d",
    })
}

const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email, role } = await User.findById(req.user.id);

    if (!_id) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json({
        id: _id,
        name,
        email,
        role,
    });
});

module.exports={
    registerUser,
    loginUser,
    getMe,

}