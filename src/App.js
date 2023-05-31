import Header from "./header/Header";
import Loader from "./loader/Loader";
import Form from "./form/Form";
import Footer from "./footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Loader />
      <main>
        <Form />
      </main>
      <Footer />
    </>
  );
}

export default App;
