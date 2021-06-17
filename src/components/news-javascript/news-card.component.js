function NewsCard(props) {
    return <div className='Article-Card'>
        <img src={props.article.urlToImage} className="Article-img" alt="News"></img>
        <h2>{props.article.author}</h2>
        <p>{props.article.description}</p>
        <a href={props.article.url} target="blank"
            className="btn btn-primary">More Details...</a>
    </div>;
}

export default NewsCard;