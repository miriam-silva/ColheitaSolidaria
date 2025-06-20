
import Header from "../../Header/Header";

const DefaultLayout4 = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header role="colaborador"/>
      <main className="flex-grow-1 py-4">
        <div className="container-fluid">{children}</div>
      </main>
    </div>
  );
};

export default DefaultLayout4;