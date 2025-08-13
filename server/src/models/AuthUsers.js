const { mongoose } = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 3,
      trim:true,
      lowercase:true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      minLength: 13,
      trim:true,
      lowercase:true,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
      trim:true,
      
    },
    teach:{
      type:[String],
      trim:true,
      lowercase:true
    },
    learn:{
      type:[String],
      trim:true,
      lowercase:true
    },
    city:{
      type:String,
      trim:true,
      lowercase:true,
      minLength:2,
    },
    gender:{
      type:String,
      trim:true,
      lowercase:true
    }
  },
  {
    collection: "Info",
    timestamps: true,
  }
);

const UserAuth = mongoose.model("Info", userSchema);

module.exports = {
  UserAuth
};
