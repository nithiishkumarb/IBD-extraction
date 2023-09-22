    const mongoose=require("mongoose");

    const UsersSchema= new mongoose.Schema({
        empcode:{
            type:String,
            required:true,
            unique:true,
        },
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            max:50,
        },
        password:{
            type:String,
            required:true,
        },
    },
        {timestamps:true}
    );
    module.exports = mongoose.model("User", UsersSchema) 