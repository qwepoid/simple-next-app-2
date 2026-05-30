import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../context/auth-context/AuthContext";
import { applicationRoutes } from "../constants/applicationRoutes";

const Headers = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const btnStyle =
    "p-2 hover:underline underline-offset-8 font-semibold text-gray-700";
  return (
    <div className="hidden md:grid grid-cols-12 gap-3 w-full bg-gradient-to-b from-yellow-300">
      {isAuthenticated ? (
        <>
          <button className={btnStyle} onClick={() => router.push("/")}>
            Home
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.owner)}
          >
            Owner dashboard
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.scope)}
          >
            Scope
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.payments)}
          >
            Payments
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.codes)}
          >
            Codes
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.ptIlc)}
          >
            PT and ILC
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.calibrations)}
          >
            Calibrations
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.reports)}
          >
            Reports{" "}
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.quotations)}
          >
            Quotations{" "}
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push(applicationRoutes.serviceRequests)}
          >
            Service Requests
          </button>
          <div
            className="col-start-12 flex items-center cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
        </>
      ) : (
        <div className="flex justify-center w-screen p-4 text-2xl">
          Engg. Research Labs.
        </div>
      )}
    </div>
  );
};

export default Headers;
