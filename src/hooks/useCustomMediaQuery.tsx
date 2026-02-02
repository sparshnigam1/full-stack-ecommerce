import useMediaQuery from "./useMediaQuery";

const useCustomMediaQuery = () => {
  const isMobile = useMediaQuery("(max-width:719px)");
  const isTablet = useMediaQuery("(max-width:1023px)");

  return { isMobile, isTablet } as const;
};

export default useCustomMediaQuery;
