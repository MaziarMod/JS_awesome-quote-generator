const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter');
const quoteButton = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');


function showLoadingSpinner() {
   loader.hidden = false;
   quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
   if (!loader.hidden) {
      quoteContainer.hidden = false;
      loader.hidden = true;
   }
}
// Get Quote From API
async function getQuote() {
   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
   const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
   showLoadingSpinner();
   try {

      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();
      authorText.innerText = (data.quoteAuthor === '') ? 'Unknown' : data.quoteAuthor;
      (data.quoteText.length > 20) ? quoteText.classList.add('long-quote'): quoteText.classList.remove('long-quote');
      quoteText.innerText = data.quoteText;
      // stop loader, and show the code
      hideLoadingSpinner();
   } catch (e) {
      console.log("there are some issues while reteriving quotes", e);
   }
}

// Tweet quote
function tweetQuote() {
   const quote = quoteText.innerText;
   const author = authorText.innerText;
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
   window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterButton.addEventListener('click', tweetQuote);
quoteButton.addEventListener('click', getQuote);

//On Load
getQuote();