import { AppContext, AppContextType } from "@/context";
import { useContext, useState } from "react";
import { AuthServices } from "@/services";
import { toast } from "react-toastify";

function useResendVerification() {
  const [email, setEmail] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const { state ,setState} = useContext<AppContextType>(AppContext);

  const resendToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoading(true);
    AuthServices.resendVerification(email).then(
      (response) => {
        setShowLoading(false);
        console.log(response)
        if (response.status === 201) {
          toast.success("Verification Resend sucessful, check your email", {
            progressClassName: "bg-green-500 h-1",
            autoClose: 3000,
          });
        } else {
          toast.error("Oops! an Error occured, please retry", {
            progressClassName: "bg-red-500 h-1",
            autoClose: 3000,
          });
        }
      },
      (error) => {
        setShowLoading(false);
        console.log(error);
        if (error.code == "ERR_NETWORK") {
          toast.error(error.message, {
            progressClassName: "bg-red-500 h-1",
            autoClose: 3000,
          });
        } else if (error.response.status == 401) {
          toast.error(error.response.data.message, {
            progressClassName: "bg-red-500 h-1",
            autoClose: 3000,
          });
        } else {
          toast.error(error.response.data.Error, {
            progressClassName: "bg-red-500 h-1",
            autoClose: 3000,
          });
        }
      }
    );
  };

  const showLogin = ()=>{
    setState({
        ...state,
        showResendToken: false,
    });
  }
  return { resendToken, setEmail, showLogin, state, showLoading };
}

export default useResendVerification;
