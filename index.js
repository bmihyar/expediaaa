const express = require('express')
const https = require('https');
const path = require('path')
const PORT = process.env.PORT || 5000


var options = {
    host: 'offersvc.expedia.com',
    path: '/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel',
    headers: {'User-Agent': 'request'}
};
var data = "";

https.get(options, function (res) {
    var json = '';
    res.on('data', function (chunk) {
        json += chunk;
    });
    res.on('end', function () {
        if (res.statusCode === 200) {
            try {
                data = JSON.parse(json);
                // data is available here:
                console.log("hOttellllll name: " + data.offers.Hotel[0].hotelInfo.hotelName);
            } catch (e) {
                console.log('Error parsing JSON!');
            }
        } else {
            console.log('Status:', res.statusCode);
        }
    });
}).on('error', function (err) {
      console.log('Error:', err);
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res, data) => {
	  console.log("+++++++++++++ name: " + data);
	  res.render('pages/index', {data});
	  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
