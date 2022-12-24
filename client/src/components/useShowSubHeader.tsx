import { useRouter } from "next/router";

const useShowSubHeader = ({
  showBackBtn = false,
  title = "",
  showCustomElement,
}: {
  showBackBtn?: boolean;
  title?: string;
  showCustomElement?: any;
}) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const subHeader = (
    <div className="bg-sky-200 py-2 w-screen fixed left-0 flex top-0 md:top-8">
      {showBackBtn && (
        <span onClick={handleBack} className="pl-4 pr-8 cursor-pointer">
          &#8592;
        </span>
      )}
      <span className="w-full flex justify-center">
        {title || "Sample Header"}
      </span>
      {/* {title || "Sample Header"} */}
      <div className="absolute right-6">{showCustomElement || <></>}</div>
    </div>
  );
  return {
    subHeader,
  };
};

export default useShowSubHeader;
