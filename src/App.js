import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import NewsFeedBoot from './components/news-bootstrapped/news-feed-boot.component';
import NewsFeed from './components/news-javascript/news-feed.component';
// d4625325f1274be0a38ab6cbb8cf1 489  
function App() {
  return (
    (<BrowserRouter>
      <Route path = "/" component = {NewsFeed} exact>
      </Route>
      <Route path = "/boot" component={NewsFeedBoot}>
      </Route>
   </BrowserRouter>)
  );
}

export default App;
