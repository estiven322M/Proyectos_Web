/* Creamos las constantes */
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Remove Loading Spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote() { /* Se muestra una cita aleatoria */
    loading();
    if (!apiQuotes || apiQuotes.length === 0) {
        console.error('No quotes available.');
        return;
    }
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Chek If Author field is blank and replace it with 'Unknown'
    authorText.textContent = quote.author || 'Unknown';
    //Check Quote length to determine styling
    quoteText.classList.toggle('long-quote', quote.text.length > 120);
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From Local JSON File
async function getQuotes() { /* obtenemos la cita de un archivo JSON y la almacenamos en apiQuotes, que luego llama a newQuotes */
    loading();
    const apiUrl = 'quotes.json'; // Ruta del archivo JSON
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        apiQuotes = await response.json();
        console.log('Fetched quotes:', apiQuotes); // Verifica que apiQuotes esté correctamente cargado
        newQuote();
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText)} - ${encodeURIComponent(authorText.innerText)}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();
