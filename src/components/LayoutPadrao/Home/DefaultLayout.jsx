// Com os Navbar's e o Footer
import Navbar from '../../Navbars/NavbarHome/NavbarLogoBotoes/Navbar'
import Navbar2 from '../../Navbars/NavbarHome/NavbarBarraVermelha/Navbar2';
import Footer from '../../Footer/Footer';

const DefaultLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Navbar2 />
      <main className="flex-grow-1 py-4">
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
