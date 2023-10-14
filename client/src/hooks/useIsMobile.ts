import { useEffect, useLayoutEffect, useState } from "react";
import debounce from "../utils/debounce";

const useIsMobile = () => {
    console.log('i am called now')
    const [isMobile, setIsMobile] = useState(true);
    const [isTablet, setIsTablet] = useState(false);
    
    useLayoutEffect(() => {
        const updateSize = (): void => {      
            setIsMobile(window.innerWidth <= 768)
            setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1280)
        };
        window.addEventListener('resize', debounce(updateSize, 250));
        return (): void => window.removeEventListener('resize', updateSize);
      }, []);
    useEffect(() => {
        setIsMobile(window.innerWidth <= 768)
        setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1280)
    }, [])
    return {
        isMobile,
        isTablet
    }   
}

export default useIsMobile;