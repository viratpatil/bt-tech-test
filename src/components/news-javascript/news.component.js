import { useCallback, useEffect, useState } from "react";
import { parseData, topEntries } from "../../util/utility";
import NewsCard from "./news-card.component";

function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
}

function News() {
    const [newsArticles, setNewsArticles] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [message, setMessage] = useState('');
    const onInputChange = (e) => {
      if (e) {
        setSearchText(e);
      } else {
        setSearchText('');
        fetchTopRecords();
        return;
      }

      fetch(`https://newsapi.org/v2/everything?q=${e}&pageSize=10&apiKey=d4625325f1274be0a38ab6cbb8cf1489`).then(res => {
            return res.json();
        }).then((response) => {
            if (response && response.articles) {
              const articles = parseData(response);
              setNewsArticles(articles); 
              if (articles.length === 0) {
                setMessage('No Records Found');
              } 
            } else {
                // Default Top Entries in Case of error code: rateLimited;
                if (response && response.status === 'error' && response.code === "rateLimited") {
                  // const articles = parseData(topEntries);
                  // setNewsArticles(articles);  
                  setMessage('You have made too many requests recently');
                } else {
                  setMessage('No Records Found');
                } 
                setNewsArticles([]); 
            }
        })
    }
    const debounceOnChange = useCallback(debounce(onInputChange, 400), []); 

    const fetchTopRecords = () => {
      fetch(`https://newsapi.org/v2/top-headlines?country=gb&pageSize=10&apiKey=d4625325f1274be0a38ab6cbb8cf1489`).then(res => {
        return res.json();
      }).then((response) => {
        if (response && response.articles) {
          const articles = parseData(response);
          setNewsArticles(articles);
          if (articles.length === 0) {
            setMessage('No Records Found');
          }    
        } else {
          // Default Top Entries in Case of error code: rateLimited;
          if (response && response.status === 'error' && response.code === "rateLimited") {
            // const articles = parseData(topEntries);
            // setNewsArticles(articles);  
            setMessage('You have made too many requests recently');
            setNewsArticles([]);
          } else {
            setMessage('No Records Found');
            setNewsArticles([]);  
          } 
        }
    })
    }

    const effect = useEffect(() => {
      if (searchText === '') {    
        fetchTopRecords();
      }
    },[]);

    return <div>
      <div className="search-field"> 
        <input placeholder="Search Feeds" className="search-text" onChange={e => debounceOnChange(e.target.value)}></input>
      </div>
      <div>
        {newsArticles.map((article) => {
            return <NewsCard article={article} key={article.url}></NewsCard>
        })}
        {message.length > 0 && <h3 className="message-text">{message}</h3>}
      </div>
    </div>
}

export default News;