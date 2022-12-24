import { useMutation } from "react-query";
import loginService from '../../../services/authentication/signin'
import signupService from '../../../services/authentication/signup'

const useAuthentication = () => {
  const loginUser = async (payload) => {
    mutateLogin(payload);
  };

  const signupUser = async (payload) => {
    mutateSignup(payload);
  };

  const {
    mutate: mutateLogin,
    isError: isLoginError,
    isLoading: isLoginLoading,
    data: loginData,
    error: loginError
  } = useMutation<any, Error>(loginService);

  const {
    mutate: mutateSignup,
    isError: isSignupError,
    isLoading: isSignupLoading,
    data: signupData,
    error: signupError
  } = useMutation<any, Error>(signupService);

  return {
    loginData,
    signupData,
    loginUser,
    signupUser,
    isLoginLoading,
    isSignupLoading,
    loginError,
    signupError,
    isLoginError,
    isSignupError
  };
};

export default useAuthentication;
