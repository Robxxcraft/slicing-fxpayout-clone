import { useNavigate } from "react-router-dom"

export const useNavigationToTop = () => {
  const navigate = useNavigate();
  
  const navigateAndReset = (to: string) => {
    navigate(to, { replace: true });
    window.scrollTo(0,0);
  }

  return navigateAndReset;
}