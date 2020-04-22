import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./Components/Header";
import GlobalCase from "./Components/GlobalCase";
import IndianCase from "./Components/IndianCase";
import Symptoms from "./Components/Symptoms";
import NewsHighlights from "./Components/NewsHighlights";
import Footer from "./Components/Footer";
import ScrollButton from "./Components/ScrollButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <div className="container">
          <Header />
          <GlobalCase />
          <IndianCase />
          <Symptoms />
          <NewsHighlights />
          <ScrollButton />
          <Footer />
        </div>
      </Provider>
    </>
  );
};

export default App;
