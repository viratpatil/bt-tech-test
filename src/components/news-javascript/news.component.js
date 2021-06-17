import { useCallback, useEffect, useState } from "react";
import { ALL_RECORDS, TOP_RECORDS } from "../../util/constants";
import { debounce, parseData } from "../../util/utility";
import NewsCard from "./news-card.component";

function News() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [message, setMessage] = useState('');

  const onInputChange = (e) => {
    if (e) {
      setSearchText(e);
      fetchRecords(`${ALL_RECORDS}&q=${e}`);
    } else {
      setSearchText('');
      fetchRecords(TOP_RECORDS);
    }
  }

  const debounceOnChange = useCallback(debounce(onInputChange, 400), []);

  useEffect(() => {
    if (searchText === '') {
      fetchRecords(TOP_RECORDS);
    }
  }, []);

  const fetchRecords = (url) => {
    fetch(url).then(res => {
      return res.json();
    }).then((response) => {
      if (response && response.articles) {
        const articles = parseData(response);
        setNewsArticles(articles);
        if (articles.length === 0) {
          setMessage('No Records Found');
        } else {
          setMessage('');
        }
      } else {
        if (response && response.status === 'error' && response.code === "rateLimited") {
          setMessage('You have made too many requests recently');
          setNewsArticles([]);
        } else {
          setMessage('No Records Found');
          setNewsArticles([]);
        }
      }
    })
  }

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