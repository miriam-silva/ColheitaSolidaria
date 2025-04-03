// Sem os Navbar's e o Footer
const AuthLayout = ({ children }) => {
    return (
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        {children}
      </div>
    );
  };
  
  export default AuthLayout;
  