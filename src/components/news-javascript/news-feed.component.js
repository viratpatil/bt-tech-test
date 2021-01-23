import News from "./news.component";

function NewsFeed(props) {
    return <div className="App">
    <header className="App-header">
      <img src="https://img01.bt.co.uk/s/assets/191120/images/logo/logo-2018.svg" className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
     <News></News>
    </div>
    <footer className="App-footer">
      <div className="text-center">
          <h6 className="p-2 text-small">copyright 2021 Virat</h6>
      </div>
    </footer>
  </div>
}

export default NewsFeed;