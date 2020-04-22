import React, { useState, useEffect } from "react";
import Loader from "./Loader";
const initialState = {
  articles: [],
  isLogged: false,
};
const NewsHighlights = () => {
  const [state, setstate] = useState(initialState);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=in&q=COVID&sortBy=popularity&apiKey=cf7f3c64d5b24083b7e9db822088fda1&pageSize=9&page=1"
    )
      .then((res) => res.json())
      .then((res) =>
        setstate({
          articles: res.articles,
          isLogged: true,
          error: "",
        })
      )
      .catch(
        setstate({
          isLogged: false,
          articles: [],
        })
      );

    return () => {};
  }, []);
  return (
    <>
      <div className="title">
        <h4 className="btn btn-outline-secondary">
          News Headlines from NewsAPI
        </h4>
      </div>
      {state.isLogged ? (
        <section className="news-container fadeInUp">
          {state.articles.map((item, idx) => (
            <ul key={idx}>
              <img src={item.urlToImage} alt="" />
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <a href={item.url} className="btn">
                Read More
              </a>
            </ul>
          ))}
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default NewsHighlights;
