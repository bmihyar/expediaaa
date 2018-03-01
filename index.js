const express = require('express')
const request = require('request');
const path = require('path')
const PORT = process.env.PORT || 5000



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
	var data;
	console.log("+++++++++++++ name: " + req.params.destinationCity);
	let  apis_url = "https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel";
	if(req.query.destinationCity)
		apis_url += "&destinationCity=" + req.query.destinationCity;

	request.get({ url: apis_url }, function(error, response, body) { 
		if (!error && response.statusCode == 200) { 
			try {
				data = JSON.parse(body);
				console.log("hOttellllll name: " + data.offers.Hotel[0].hotelInfo.hotelName);
				res.render('pages/index', {data});
			} catch (e) {
				console.log('Error parsing JSON!');
			}
		} else {
			//console.log('statusCode is not 200 !' + error);
		}
    }); 
	
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
