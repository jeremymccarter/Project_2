const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/artists/',
  params: {ids: '2w9zwq3AktTeYYMuhMjju8'},
  headers: {
    'X-RapidAPI-Key': '142b74e2a0msh1c7996bc1656b54p1c1fcajsnbf29db333a4d',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});