import { useEffect } from 'react'
import SignUp from "../components/SignUp/SignUp"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SignUppage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);
  return (
    <div><SignUp/></div>
  )
}

export default SignUppage