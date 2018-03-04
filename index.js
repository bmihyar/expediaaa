/** 
* Desc: This simple app reads Expedia JSON apis and parse it to build simple website
* 
* Developed by: Bashir Mihyar <bmihyar@gmail.com>
*/

const express = require('express')
const request = require('request');
const path = require('path')
const PORT = process.env.PORT || 5000



express()
  .use(express.static(path.join(__dirname, 'public'))) // define static public path to be used for static file like css
  .set('views', path.join(__dirname, 'views')) //define views folder and files 
  .set('view engine', 'ejs') // define template engine to be EJS (Embedded JS)
  .get('/', (req, res) => { // handling direct route get requests

	let  apis_url = "https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel";
	// Customize APIs URL if the user is looking for hotels in specific destination from a pre-defined list in the form
	if(req.query.destinationCity)
		apis_url += "&destinationCity=" + req.query.destinationCity;

	request.get({ url: apis_url }, function(error, response, body) { 
		if (!error && response.statusCode == 200) { 
			try {
				let data = JSON.parse(body); //make sure body i am going to deal with is JSON obj
				if(data)
					res.render('pages/index', {data}); // render index.ejs page and passing hotels JSON obj 
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
