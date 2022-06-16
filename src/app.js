//DOM variables
const inputElement = document.querySelector('#search_bar');
const submitElement = document.querySelector('#search-button');
const results = document.querySelector('.search-results');

//Search Endpoint Parameters
const api_key = "MPjDxIkDe2eoFSC573FYQZeZN4neF08s";
const limit = 20;
const rating = "pg-13";
//const apiURL = `http://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=puppy`


async function getResults(input) {
    //retrieve results from the Giphy API
    try{
        let url = "http://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + input;
        let res = await fetch(url);
        var resData = await res.json();
        displayResults(resData);
    }
    catch(error){
        console.log(error)
    }
}

function displayResults(responseData) {
    //displays the results from getResults
    responseData.data.forEach(elem => {
        results.innerHTML += `
            <img src='${elem.images.original.url}'>
             `
     });

     console.log(responseData);
}

function handleFormSubmit(event) {
    //console.log(.value);
    console.log(event);
    console.log(inputElement.value);
    event.preventDefault();
    let userInput = inputElement.value;
    getResults(userInput);
}

document.querySelector("form").addEventListener('submit', (event) => {handleFormSubmit(event)});