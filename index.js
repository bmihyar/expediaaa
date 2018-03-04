const express = require('express')
const request = require('request');
const path = require('path')
const PORT = process.env.PORT || 5000



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {

	let  apis_url = "https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel";
	if(req.query.destinationCity)
		apis_url += "&destinationCity=" + req.query.destinationCity;

	request.get({ url: apis_url }, function(error, response, body) { 
		if (!error && response.statusCode == 200) { 
			try {
				let data = JSON.parse(body);
				if(data)
					res.render('pages/index', {data});
				else 
					res.render('pages/index');
			} catch (e) {
				console.log('Error parsing JSON!');
			}
		} else {
			console.log('statusCode is not 200 !' + error);
		}
    }); 
	
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
