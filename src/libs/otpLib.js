// Function to generate a random OTP
const generateOTP = () => {
    const otpLength = 6;
    const digits = '0123456789';
    let otp = '';
    
    for (let i = 0; i < otpLength; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return otp;
  }
  
  
module.exports={
  generateOTP:generateOTP
}