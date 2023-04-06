const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config()

async function spotifyApi(searchTerm, page = 0, type='multi') {
  const limit = 10
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/search/',
    params: {
      q: searchTerm,
      type: type,
      offset: page * limit,
      limit,
      numberOfTopResults: '5'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };
  
  return axios.request(options).catch(function (error) {
      console.error(error);
  });




}



//BE SURE TO KEEP THINGS ASYNC


module.exports=spotifyApi