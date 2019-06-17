const Apify = require('apify');

Apify.main(async () => {

    const requestList = new Apify.RequestList({
        sources: [
            { url: 'https://www.tutorialspoint.com/cplusplus/cpp_object_oriented.htm' },
            { url: 'https://www.tutorialspoint.com/OOPS-concepts-in-Java' },
            { url: 'https://www.tutorialspoint.com/What-is-object-oriented-programming-OOP' },
            { url: 'https://www.tutorialspoint.com/What-are-basic-Object-oriented-programming-concepts' },
            { url: 'https://www.tutorialspoint.com/php/php_object_oriented.htm' },
            { url: 'https://www.tutorialspoint.com/java_essential_training/java_oops_concepts.asp' },
            { url: 'https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_object_oriented_principles.htm' },
            { url: 'https://www.tutorialspoint.com/What-are-Python-OOP-Basics' },
            { url: 'https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_object_oriented_paradigm.htm' },
            { url: 'https://www.tutorialspoint.com/java/java_encapsulation.htm' }
        ],
    });

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
});