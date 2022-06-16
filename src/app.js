//DOM variables
const inputElement = document.querySelector('#search_bar');
const submitElement = document.querySelector('#search-button');
const results = document.querySelector('.search-results');
const moreResults = document.querySelector('#more_results');

//Search Endpoint Parameters
const api_key = "MPjDxIkDe2eoFSC573FYQZeZN4neF08s";
const limit = 7;
const rating = "pg-13";

let pages = 0; //keeps track of how current page number --> how many times 'more results' has been pressed

var offset = 0; //keeps track of the offset value to prevent repeating gifs

alrSubmitted = false;

let userInput = "";

function showMore() {
    let userInput = inputElement.value;
    getResults(userInput);
    console.log(offset);
}

async function getResults(input) {
    //retrieve results from the Giphy API
    try{
        let url = `http://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${input}&offset=${offset}&limit=${limit}&rating=${rating}`;
        let res = await fetch(url);
        var resData = await res.json();
        displayResults(resData);
        console.log(res);
    }
    catch(error){
        console.log(error)
    }
}


function displayResults(responseData) {
    //displays the results from getResults
    responseData.data.forEach(elem => {
        results.innerHTML += `
            <img src='${elem.images.fixed_height.url}'>
             `
     });
     offset += limit; //increments the pages
     setTimeout(removeHidden,500);
     console.log(responseData);
}


function handleFormSubmit(event) {
    event.preventDefault();
    if (alrSubmitted){
        if (inputElement.value != userInput) {results.innerHTML = ``;}
        else {alrSubmitted = false;}
        offset = 0;
    }
    userInput = inputElement.value;
    alrSubmitted = true;
    getResults(userInput);
}

function removeHidden() {
    moreResults.classList.remove("hidden"); //shows the 'more results button'
}

document.querySelector("form").addEventListener('submit', (event) => {handleFormSubmit(event)});



