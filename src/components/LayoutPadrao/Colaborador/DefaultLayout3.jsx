
import NavbarColab from '../../Navbars/NavbarColab/NavbarColab';

const DefaultLayout3 = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarColab />
      <main className="flex-grow-1 py-4">
        <div className="container-fluid">{children}</div>
      </main>
    </div>
  );
};

export default DefaultLayout3;