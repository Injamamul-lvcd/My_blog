const mongoose = require("mongoose");
const UserModel = require("../model/User");
const tokenLib = require("../libs/tokenLib");
const passwordLib = require("../libs/passwordLib");
const responseLib = require("../libs/responseLib");
const check = require("../libs/checkLib");
const otpLib = require("../libs/otpLib");
const mailService = require("../middleware/mailVerify");

// Login
let login = async (req, res) => {
  try {
    console.log("body ", req.body);
    let { email, password } = req.body;
    let findUser = await UserModel.Users.findOne({ email: email });

    if (check.isEmpty(findUser)) {
      res.status(404);
      throw new Error("User not registered");
    }

    if (await passwordLib.verify(password, findUser.password)) {
      console.log("Verified");

      let payload = {
        exp: findUser.exp,
        token: await tokenLib.generateToken(findUser),
      };
      let apiResponse = await responseLib.generate(false, "Logged in", payload);
      res.status(200).send(apiResponse);
    } else {
      res.status(401);
      throw new Error("incorrect password!");
    }
  } catch (err) {
    let apiResponse =await responseLib.generate(true, err.message, null);
    res.send(apiResponse);
  }
};

//Registration
let register = async (req, res) => {
  try {
    const email = req.body.email;
    const otp=await otpLib.generateOTP();
    let findUser = await UserModel.Users.findOne({ email: email });
    let newUser = new UserModel.Users({
      name: req.body.name,
      password: await passwordLib.hash(req.body.password),
      email: req.body.email,
      mobile: req.body.mobile,
      otp: otp,
      role: req.body.role,
    });
    if (check.isEmpty(findUser)) {
      let payload = (await newUser.save()).toObject();

    console.log(payload);
      mailService.sendVerificationEmail(email, otp);

      delete payload._v;
      delete payload._id;
      delete payload.password;
      let apiResponse = responseLib.generate(false,"User registered successfully,Kidly verify your OTP", payload);
      res.status(200).send(apiResponse);
    } else {
      if (findUser.password == req.body.password) {
        res.status(412);
        throw new Error("User already Registered");
      } else {
        let payload = (await newUser.save()).toObject();

        delete payload._v;
        delete payload._id;
        delete payload.password;
        let apiResponse = responseLib.generate(false,"User registered successfully,Kidly verify your OTP", payload);
        res.status(200).send(apiResponse);
      }
    }
  } catch (err) {
    let apiResponse = responseLib.generate(true, err.message, null);
    res.send(apiResponse);
  }
};

// Users email verification
let emailVerification = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email);
  console.log(otp);
  try {
    const findUser = await UserModel.Users.findOne({ email: email });
    console.log(findUser);
    if (findUser.otp == otp) {
        findUser.isVerified = true;
        await findUser.save();
        res.status(200).send(responseLib.generate(false, "Email verification successful", findUser));
    }
    else {
        res.status(401).send(responseLib.generate(true, "Invalid OTP! please enter corrct OTP", null));
    }
  } catch (err) {
    res.status(500).send(responseLib.generate(true, err.message, null));
  }
};

//get user list
let getUserList = async (req, res) => {
  try {
    let data = await UserModel.Customer.find({});
    if (!check.isEmpty(data)) {
      let apiResponse = responseLib.generate(false, "found the list", data);
      res.status(200).send(apiResponse);
    } else {
      throw new Error("An error occurd");
    }
  } catch (err) {
    let apiResponse = responseLib.generate(true, err.message, null);
    res.status(400).send(apiResponse);
  }
};


//FORGOT PASSWORD METHOD
let forgotPassword= async (req,res)=>{
  try{
  const email=req.body.email;
 //otp generate
  const otp=await otpLib.generateOTP(); 
  // otp updation in db
  const user = await UserModel.Users.findOneAndUpdate({ email }, {otp});
  if(check.isEmpty(user)) {
    throw new Error
  }
    //mail generated and otp send
    mailService.sendVerificationEmail(email,otp);
    res.status(200).send(responseLib.generate(false,"otp send successfully", user));
}catch(e){
  res.status(500).send(responseLib.generate(true,e.message,null));
}
}
//RESET PASSWORD METHOD
let resetPassword=async(req,res)=>{
  const { newPassWord, otp,email } = req.body;
  console.log(email);
  console.log(otp);
  try {
    const findUser = await UserModel.Users.findOne({ email: email });
    console.log(findUser);
    if (findUser.otp == otp) {
        findUser.password = await passwordLib.hash(newPassWord);
        await findUser.save();
        res.status(200).send(responseLib.generate(false, "password reset successful", findUser));
    }
    else {
        res.status(401).send(responseLib.generate(true, "Invalid OTP! please enter corrct OTP", null));
    }
  } catch (err) {
    res.status(500).send(responseLib.generate(true, err.message, null));
  }
};

module.exports = {
  login: login,
  register: register,
  forgotPassword:forgotPassword,
  resetPassword:resetPassword,
  emailVerification: emailVerification,
  show: getUserList,
};
