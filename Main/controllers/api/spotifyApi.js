const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config()
//const artistSearch=document.getElementById("artistSearch")

//artistSearch.addEventListener("keyup", e => {  const searchString = e.target.value;
//  console.log(searchString)}
//);


//axios.request(options).then(function (response) {
  //console.log(response.data);
//}).catch(function (error) {
  //console.error(error);
//});

async function spotifyApi() {
 
 

  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/artists/',
    params: { ids: '2w9zwq3AktTeYYMuhMjju8' },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }

  }



//BE SURE TO KEEP THINGS ASYNC


module.exports=spotifyApi