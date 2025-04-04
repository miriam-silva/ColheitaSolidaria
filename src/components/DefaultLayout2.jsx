import NavbarAdm from './NavbarAdm';

const DefaultLayout2 = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarAdm />
      <main className="flex-grow-1 py-4">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default DefaultLayout2;