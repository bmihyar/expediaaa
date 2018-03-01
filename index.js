const express = require('express')
const request = require('request');
const path = require('path')
const PORT = process.env.PORT || 5000


var data = "";
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
	console.log("+++++++++++++ name: " + req.params.destinationCity);
	let  apis_url = "https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel";
	if(req.params.destinationCity)
		apis_url += "&destinationCity=" + req.params.destinationCity;
	console.log("APIssss: " + apis_url);  
	request.get({ url: apis_url }, (error, response, body) => { 
		if (!error && response.statusCode == 200) { 
			try {
				data = JSON.parse(body);
				console.log("hOttellllll name: " + data.offers.Hotel[0].hotelInfo.hotelName);
			} catch (e) {
				console.log('Error parsing JSON!');
			}
		} else {
			console.log('statusCode is not 200 !' + error);
		}
    }); 
	console.log("lolololo name: " + data);  
	//res.render('pages/index', {data});
	res.render('pages/index');
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
