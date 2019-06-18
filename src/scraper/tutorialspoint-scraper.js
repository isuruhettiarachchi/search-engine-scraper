const Apify = require('apify');

const scrapper = (sources, callback) => {
    console.log('Apify scraper called');

    Apify.main(async () => {

        let links = {
            sources: sources
        };

        const requestList = new Apify.RequestList(links);
    
        await requestList.initialize();
    
        const crawler = new Apify.CheerioCrawler({
            requestList,
            minConcurrency: 10,
            maxConcurrency: 50,
            maxRequestRetries: 1,
            handlePageTimeoutSecs: 60,
    
            handlePageFunction: async ({ request, html, $ }) => {
                console.log(`Processing ${request.url}...`);
    
                const title = $('title').text();
                const h1texts = [];
                const para = [];
                $('h1').each((index, el) => {
                    h1texts.push({
                        text: $(el).text(),
                    });
                });
    
                $('p').each((index, el) => {
                    para.push($(el).text());
                });
    
                await Apify.pushData({
                    url: request.url,
                    title,
                    h1texts,
                    para
                });
    
            },
    
            handleFailedRequestFunction: async ({ request }) => {
                console.log(`Request ${request.url} failed twice.`);
            },
        });
    
        await crawler.run();
    
        console.log('Crawler finished.');
        callback('finished');
    });
}

module.exports = scrapper;