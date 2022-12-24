import { useRouter } from "next/router";

const BottomNav = () => {
  const router = useRouter();
  const handleHome = () => {
    history;
    router.replace("/");
  };
  return (
    <div className="flex justify-between fixed bottom-0 w-screen bg-sky-400 py-1 px-4 md:hidden">
      <button onClick={handleHome} className="text-4xl">
        &#8962;
      </button>
      <button onClick={() => router.push("/job")}>&#128188;</button>
      <button onClick={() => router.push("/service-request")}>SR</button>
      <button className="text-4xl">☰</button>
    </div>
  );
};

export default BottomNav;
