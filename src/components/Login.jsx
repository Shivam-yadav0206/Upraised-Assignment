import { useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUser }) => {
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("1234567890");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + number;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setIsVisible(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(code)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        setIsAuthenticated(true);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <section className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-gray-500">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
            Welcome to <br /> Weather App
          </h1>

          {isVisible ? (
            <>
              <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                <BsFillShieldLockFill size={30} />
              </div>
              <label
                htmlFor="otp"
                className="font-bold text-2xl text-white text-center">
                Enter Your OTP
              </label>
              <OtpInput
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="otp-container text-black"
                value={code}
                onChange={setCode}
              />
              <button
                onClick={onOTPVerify}
                className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded-lg">
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                <BsTelephoneFill size={30} />
              </div>
              <label
                htmlFor="ph"
                className="font-bold text-xl text-white text-center">
                Verify your phone number
              </label>

              <PhoneInput country={"in"} value={number} onChange={setNumber} />

              <button
                onClick={onSignup}
                className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded-lg">
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Send code via SMS</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
