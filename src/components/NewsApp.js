import React, { useEffect, useState, useRef } from "react";
import News from "./News";
import "./NewsApp.css";
function NewsApp() {
  const [query, setQuery] = useState("technology");
  const refVariable = useRef(null);
  const APIKEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxx";

  const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-07-10&sortBy=publishedAt&apiKey=${APIKEY}`;
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [query]);

  async function fetchData() {
    try {
     
      const response = await fetch(apiUrl);
      const jsonData = await response.json();

     

      setNewsList(jsonData.articles);
    } catch (e) {
      console.log(e, "error occurred");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(refVariable.current.value);
  }

  return (
    <div>
      <div className="nav">
        <div className="logo">
          <img
            style={{}}
            src="https://www.pngitem.com/pimgs/m/301-3011241_fox-news-go-fox-news-app-icon-hd.png"
            alt="No Image found"
          />
        </div>
        <div className="tags">
          <button
            style={{ color: query === "Business" ? "red" : "white" }}
            onClick={() => setQuery("Business")}
          >
            Business
          </button>
          <button
            style={{ color: query === "Politics" ? "red" : "white" }}
            onClick={() => setQuery("Politics")}
          >
            Politics
          </button>
          <button
            style={{ color: query === "Entertainment" ? "red" : "white" }}
            onClick={() => setQuery("Entertainment")}
          >
            Entertainment
          </button>
          <button
            style={{ color: query === "Sports" ? "red" : "white" }}
            onClick={() => setQuery("Sports")}
          >
            Sports
          </button>
        </div>

        <div className="search">
          <form onSubmit={handleSubmit}>
            <input placeholder="e.g Science" ref={refVariable} type="text" />
            <input
              className="search-btn"
              onClick={handleSubmit}
              type="submit"
              value="Search"
            />
          </form>
        </div>
      </div>

      <div className="NewsPage">
        {newsList?.length > 0 &&
          newsList.map((news) => {
            return <News key={news.url} news={news}></News>;
          })}
      </div>
    </div>
  );
}

export default NewsApp;
