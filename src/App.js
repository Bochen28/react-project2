import Header from "./header/Header";
import Form from "./form/Form";
import Footer from "./footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div id="loader">Ładowanie...</div>
      <main>
        <Form />
      </main>
      <Footer />
    </>
  );
}

export default App;
