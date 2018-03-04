/** 
* Desc: This test is a demonstration of unit testing using Mocha framework and chai lib for assertion 
* This test is for checking Expedia APIs' status and returned object to be JSON
* 
* Developed by: Bashir Mihyar <bmihyar@gmail.com>
*/

let chai 		= require('chai');
let chaiHttp 	= require('chai-http');
let expect 		= chai.expect;

let apis_url 	= "https://offersvc.expedia.com"
let apis_query 	= {scenario: "deal-finder", page: "foo", uid: "foo", productType: "Hotel"};
chai.use(chaiHttp);

describe('Fetch Expedia APis', () => {
	it("should return 200 and JSON", (done) => {

		chai.request(apis_url) //request Expedia server
		.get("/offers/v2/getOffers") 
		.query(apis_query) // pass APIs parameters
		.end((re, res) => {
			expect(res).to.have.status(200); //response status is 200 
			expect(res).to.be.json; //response is JSON object as expected.
			done();
		})
	}); 
})
	
	
