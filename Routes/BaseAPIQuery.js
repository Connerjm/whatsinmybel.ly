var axios = require("axios").default;

const searchTerm = "cheddar%20cheese"

var options = {
  method: 'GET',
  url: `https://trackapi.nutritionix.com/v2/search/instant?query=${searchTerm}`,
  headers: {
    'x-app-id': '52a7edb4',
    'x-app-key': '55cc1cbc6c21b91688d7d848ada35d09'
  }
};

axios.request(options).then(function (response) {
    // // This code logs each item from the search and pulls the name for future user choice to select correct item
    // for(i=0;i<response.data.hits.length;i++){
    //     console.log(response.data.hits[i].fields.item_name)
    // }

    // This code logs the name, calories, fat, carbs, and protein for each item in the search array
    for(i=0;i<response.data.common.length;i++){
           console.log(response.data.common[i].food_name)
           console.log(response.data.common[i].serving_unit)
           console.log(response.data.common[i].photo.thumb)
           console.log(response.data.common[i].nf_calories)
    }

    // // This code logs the full data for a singular item from the search (example using item array position 0)
    // console.log(response.data.hits[0].fields)
}).catch(function (error) {
	console.error(error);
});