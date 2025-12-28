import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

// SEND OTP
export const sendOtp = async (phoneNumber) => {
  const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
  return confirmation;
};

// VERIFY OTP
export const verifyOtp = async (confirmation, otp) => {
  const userCredential = await confirmation.confirm(otp);
  return await userCredential.user.getIdToken();
};
