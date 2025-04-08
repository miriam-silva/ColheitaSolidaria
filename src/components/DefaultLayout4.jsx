
import NavbarReceb from './NavbarReceb';

const DefaultLayout4 = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarReceb />
      <main className="flex-grow-1 py-4">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default DefaultLayout4;