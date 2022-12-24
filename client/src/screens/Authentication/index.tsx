import { useRouter } from "next/router";
import { applicationRoutes } from "../../constants/applicationRoutes";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context/AuthContext";
import useAuthentication from "./service-hooks/useAuthentication";
import Popup from "../../components/Popup";

const Authentication = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginFlow, setIsLoginFlow] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    loginUser,
    signupUser,
    loginError,
    loginData,
    isLoginError,
    signupData,
    isSignupError,
    signupError,
  } = useAuthentication();

  useEffect(() => {
    isButtonDisabled();
  }, [name, password, email]);

  useEffect(() => {
    if (isSignupError) {
      setShowPopup(true);
      setErrorMessage(signupError?.message);
    }
  }, [isSignupError, signupError]);

  useEffect(() => {
    if (!!signupData || !!loginData) {
      login();
      router.push(applicationRoutes.home);
    }
  }, [loginData, signupData]);

  useEffect(() => {
    if (isLoginError) {
      setShowPopup(true);
      setErrorMessage(loginError?.message);
    }
  }, [loginError, isLoginError]);

  function isButtonDisabled() {
    return !email || !password || (!isLoginFlow && !name);
  }

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  function handleFormSubmit() {
    const payload = {
      email,
      password,
    };
    isLoginFlow ? loginUser(payload) : signupUser(payload);
  }

  return (
    <>
      <Popup
        open={showPopup}
        onClose={handleClosePopup}
        message={errorMessage}
      />
      <div className="bg-blue-100 w-full h-full relative">
        <div className="absolute border border-black w-96 right-48 top-48 rounded-lg">
          <div className="flex w-full border-b border-black">
            <button
              className={`flex-1 p-2  rounded-tl-lg ${
                isLoginFlow && "bg-blue-300"
              }`}
              onClick={() => setIsLoginFlow(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 p-2  rounded-tr-lg ${
                !isLoginFlow && "bg-blue-300"
              }`}
              onClick={() => setIsLoginFlow(false)}
            >
              Signup
            </button>
          </div>
          <div className="w-full bg-amber-100 p-12 flex flex-col rounded-b-lg">
            <input
              className="p-2 mb-8 rounded-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative flex items-center">
              <input
                className="p-2 rounded-lg w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-2"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
              >
                O
              </button>
            </div>
            {isLoginFlow && loginError && (
              <span className="text-xs text-red-500">Invalid Password</span>
            )}
            {!isLoginFlow && (
              <input
                className="p-2 mt-8 rounded-lg"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <button
              disabled={isButtonDisabled()}
              className={`p-2 mt-8 rounded-lg border font-bold ${
                isButtonDisabled()
                  ? "border-black bg-slate-300 text-slate-500"
                  : "border-blue-500 bg-blue-500 text-white"
              }`}
              onClick={handleFormSubmit}
            >
              {isLoginFlow ? "Login" : "Signup"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Authentication);
