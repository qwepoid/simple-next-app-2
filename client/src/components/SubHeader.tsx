import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../context/auth-context/AuthContext";

const SubHeader = ({ title }) => {
  const router = useRouter();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const btnStyle = "p-2 font-semibold text-gray-700";
  return (
    <div className="hidden md:grid grid-cols-12 gap-3 w-full bg-blue-300 flex items-center">
      {isAuthenticated ? (
        <>
          <button className={btnStyle} onClick={() => router.back()}>
            <img height={32} width={32} src="/iconBack.png" />
          </button>
          <div className={btnStyle}>{title}</div>
        </>
      ) : (
        <div className="flex justify-center w-screen p-4 text-2xl">
          Engg. Research Labs.
        </div>
      )}
    </div>
  );
};

export default SubHeader;
