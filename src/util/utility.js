export const parseData = (response) => {
    const articles = response.articles.map((article) => {

        article.description = (article.description && article.description.length > 150) ?
            `${article.description.substring(0, 150)}...` : article.description;

        article.author = (article.author && article.author.length > 100) ?
            `${article.author.substring(0, 100)}...` : article.author;


        article.urlToImage = (article.urlToImage && article.urlToImage.length > 0) ? article.urlToImage :
            'https://educationresearch.uci.edu/wp-content/uploads/2018/10/uci-news-placeholder-default-720x480-e1539120657160.jpg';

        return article;
    });

    return articles;
}

export const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}