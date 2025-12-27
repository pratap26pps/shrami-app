import { auth } from "./firebase";
 


// SEND OTP
export const sendOtp = async (phoneNumber) => {
  // +91XXXXXXXXXX
  return await auth().signInWithPhoneNumber(phoneNumber);
};

// VERIFY OTP
export const verifyOtp = async (confirmation, otp) => {
  const userCredential = await confirmation.confirm(otp);
  return await userCredential.user.getIdToken();
};
