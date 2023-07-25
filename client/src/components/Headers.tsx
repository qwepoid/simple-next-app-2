import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../context/auth-context/AuthContext";

const Headers = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useContext(AuthContext);
  console.log(router.pathname);
  const btnStyle =
    "p-2 hover:underline underline-offset-8 font-semibold text-gray-700";
  return (
    <div className="hidden md:grid grid-cols-12 gap-3 sticky top-0 w-full bg-gradient-to-b from-yellow-300">
      {isAuthenticated ? (
        <>
          <button
            className={`${btnStyle} ${router.pathname === "/" && "underline"}`}
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <button className={btnStyle} onClick={() => router.push("/payments")}>
            Payments
          </button>
          <button className={btnStyle} onClick={() => router.push("/codes")}>
            Codes
          </button>
          <button
            className={`${btnStyle} ${
              router.pathname.includes("pt-ilc") && "underline"
            }`}
            onClick={() => router.push("/pt-ilc")}
          >
            PT and ILC
          </button>
          <button
            className={`${btnStyle} ${
              router.pathname.includes("calibrations") && "underline"
            }`}
            onClick={() => router.push("/calibrations")}
          >
            Calibrations
          </button>
          <button className={btnStyle} onClick={() => router.push("/reports")}>
            Reports{" "}
          </button>
          <button
            className={btnStyle}
            onClick={() => router.push("/quotations")}
          >
            Quotations{" "}
          </button>
          <button className={btnStyle} onClick={() => router.push("/job")}>
            Jobs{" "}
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
