function NewsCardBoot(props) {
return <div className="col-md-4">
  <div className="card" >
  <img src={props.article.urlToImage} className="card-img-top img-fluid" alt="...">
      </img>
  <div className="card-body">
    <h5 className="card-title">{props.article.author}</h5>
    <p className="card-text news-card-text">{props.article.description}</p>
    <div className="more-btn">
        <a href={props.article.url} className="btn btn-primary" target="blank">Know More...</a>
    </div>
  </div>
</div>
</div>
}

export default NewsCardBoot;