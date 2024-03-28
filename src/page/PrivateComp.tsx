import { Navigate, Outlet } from 'react-router-dom'

const PrivateComp = () => {
  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');
  
  const auth = storedEmail && storedPassword;

  return (
    <div>
      {auth ? <Outlet /> : <Navigate to={'/'} />}
    </div>
  );
}

export default PrivateComp;
