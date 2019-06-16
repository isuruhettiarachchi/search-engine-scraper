const express = require('express');
const router = express.Router();

const se_scraper = require('se-scraper');

// const scraper = require('../scraper/scraper');



router.get('/', function(req, res, next) {
    let scrape_job = {
        search_engine: 'google',
        keywords: [req.query.keywords + ' site:www.tutorialspoint.com'],
        num_pages: 1,
    };

    se_scraper.scrape({}, scrape_job).then(data => {
        res.send(data);
    });
    // res.send(results);
})

module.exports = router;
