import { useCallback, useEffect, useState } from "react";
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
              const articles = response.articles.map((article) => {
          
                article.description = (article.description && article.description.length > 150) ?
                 `${article.description.substring(0, 150)}...`: article.description; 
                
                article.author = (article.author && article.author.length > 100) ?   
                `${article.author.substring(0, 100)}...` : article.author ;
                
      
                article.urlToImage = (article.urlToImage && article.urlToImage.length > 0) ? article.urlToImage :
                'https://educationresearch.uci.edu/wp-content/uploads/2018/10/uci-news-placeholder-default-720x480-e1539120657160.jpg';
              
                return article;
              });

              setNewsArticles(articles); 
            } else {
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
          const articles = response.articles.map((article) => {
          
            article.description = (article.description && article.description.length > 150) ?
             `${article.description.substring(0, 150)}...`: article.description; 
            
            article.author = (article.author && article.author.length > 100) ?   
            `${article.author.substring(0, 100)}...` : article.author ;
            
  
            article.urlToImage = (article.urlToImage && article.urlToImage.length > 0) ? article.urlToImage :
            'https://educationresearch.uci.edu/wp-content/uploads/2018/10/uci-news-placeholder-default-720x480-e1539120657160.jpg';
          
            return article;
          });

          setNewsArticles(articles);
              
        } else {
            setNewsArticles([]);   
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
      </div>
    </div>
}

export default News;