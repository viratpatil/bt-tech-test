import NewsCardBoot from "./news-card-boot.component";

function NewsBoot(props) {
    return <div className="row">
        {props.articles.map((article) => {
            return <NewsCardBoot article={article} key={article.url}></NewsCardBoot>
        })}
      </div>;
}

export default NewsBoot;