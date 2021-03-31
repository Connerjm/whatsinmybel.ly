var axios = require("axios").default;

const searchTerm = "cheddar%20cheese"

var options = {
  method: 'GET',
  url: `https://nutritionix-api.p.rapidapi.com/v1_1/search/${searchTerm}`,
  params: {
    fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate'
  },
  headers: {
    'x-rapidapi-key': '48c11b17afmsh79f4383215dc494p1e1db3jsn936de6f29bd0',
    'x-rapidapi-host': 'nutritionix-api.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
    // // This code logs each item from the search and pulls the name for future user choice to select correct item
    // for(i=0;i<response.data.hits.length;i++){
    //     console.log(response.data.hits[i].fields.item_name)
    // }
    
    // // This code logs the name, calories, fat, carbs, and protein for each item in the search array
    // for(i=0;i<response.data.hits.length;i++){
    //     console.log(response.data.hits[i].fields.item_name)
    //     console.log(response.data.hits[i].fields.nf_calories)
    //     console.log(response.data.hits[i].fields.nf_total_fat)
    //     console.log(response.data.hits[i].fields.nf_total_carbohydrate)
    //     console.log(response.data.hits[i].fields.nf_protein)
    // }

    // // This code logs the full data for a singular item from the search (example using item array position 0)
    // console.log(response.data.hits[0].fields)
}).catch(function (error) {
	console.error(error);
});