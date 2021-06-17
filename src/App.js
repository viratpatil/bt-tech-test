import { BrowserRouter} from 'react-router-dom';
import './App.scss';
import NewsFeed from './components/news-javascript/news-feed.component';
function App() {
  return (
    (<BrowserRouter>
      <NewsFeed></NewsFeed>
    </BrowserRouter>)
  );
}

export default App;
