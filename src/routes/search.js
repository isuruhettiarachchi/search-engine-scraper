const express = require('express');
const router = express.Router();

const se_scraper = require('se-scraper');

const scraper = require('../scraper/tutorialspoint-scraper');

// const scraper = require('../scraper/scraper');



router.get('/', function(req, res, next) {
    let searchKey = req.query.keywords + ' site:www.tutorialspoint.com';

    let scrape_job = {
        search_engine: 'google',
        keywords: [searchKey],
        num_pages: 1,
    };

    se_scraper.scrape({}, scrape_job).then(data => {
        console.log('links scrapped from se-scraper');
        
        let searchResults = data.results[searchKey][1].results;
        let urls = searchResults.map(obj => {
            let url = { url: obj.link };
            return url;
        });

        scraper(urls, (response) => {
            res.send(response);
        })
        // res.send(urls);
    });
    // res.send(results);
})

module.exports = router;
