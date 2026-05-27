import SubHeader from "../components/SubHeader";

const defaultConfig = {
  showBackBtn: true,
};

const useSubHeader = ({
  defaultConfig = false,
  showBackBtn = false,
  title = "",
  customComponent = <></>,
}) => {
  return {
    SubHeader,
  };
};

export default useSubHeader;
