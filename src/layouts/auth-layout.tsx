import { Outlet } from "react-router-dom";

const AuthenticationLayout = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/img/bg.png')" }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
