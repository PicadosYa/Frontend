import { useState, useEffect } from 'react';

/********************************************************************/
/****************  HEADER HIDDEN ANIMATION SCRIPT *******************/
/********************************************************************/

export const useScroll = () => {

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (prevScrollPos < currentScrollPos) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
        setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return scrolled;
};

export default useScroll;
