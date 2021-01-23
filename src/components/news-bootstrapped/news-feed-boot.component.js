import { useEffect, useState } from "react";
import NewsBoot from "./news-boot.component";

function NewsFeedBoot(props) {
  const [newsArticles, setNewsArticles] = useState([]);
  let searchText = ''
  const onSearchClick = () => {

    if (searchText === '') {    
      fetchTopRecords();
    } else {
      fetch(`https://newsapi.org/v2/everything?q=${searchText}&pageSize=10&apiKey=d4625325f1274be0a38ab6cbb8cf1489`).then(res => {
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
  }

  const textChange = (e) => {
    searchText = e.target.value;
  }

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

        console.log(articles);

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

  

    return <div className="App">
    <header>
      <nav className="navbar navbar-dark fixed-top bg-purple flex-column flex-md-row bd-navbar">
        <a className="navbar-brand" href="#">
          <img src="https://img01.bt.co.uk/s/assets/191120/images/logo/logo-2018.svg" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          Bootstrap
        </a>
        <div className="form-inline  searchbox">
          <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search"
          onChange={textChange}></input>
          <button className="btn btn-success my-2 my-sm-0" onClick={onSearchClick}>Search</button>
        </div>
      </nav>
    </header>
    <div className="app-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
              <NewsBoot articles={newsArticles}></NewsBoot>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div className="text-center">
        <h6 className="p-2 text-small">copyright 2021 Virat</h6>

        </div>

    </footer>
  </div>
}

export default NewsFeedBoot;