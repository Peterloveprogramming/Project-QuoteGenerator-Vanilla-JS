// Get Quotes from API 
const quote = document.getElementById("quote")
const author = document.getElementById("author")
const twitter = document.getElementById("twitter")
const newQuote = document.getElementById("new-quote")
const loader = document.getElementById("loader")
const quoteContainer = document.getElementById("quote-container")

let apiQuotes = [];

//show Loading 

function showLoadingSpinner(){
    loader.hidden = false
    quoteContainer.hidden = true
}

//show complete 

function removeLoadingSpinner(){
    loader.hidden = true
    quoteContainer.hidden = false
}


//Pick a random quote 
function Quote(){
    showLoadingSpinner()
    const Qt =  apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    //check if the quote text is long
    if (Qt.text.length>70){
        quote.classList.add('long-quote')
    } else{
        quote.classList.remove("long-quote")
    }
    quote.textContent = Qt.text
    //check if author field is blank 
    if (!Qt.author){
        author.textContent = "Unknown"
    }else {
        author.textContent = Qt.author
    }
    removeLoadingSpinner()
    console.log(Qt)
}

// Fetch Quote
async function getQuote(){
    showLoadingSpinner()
    const quoteUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    try{
        const Reponse = await fetch(quoteUrl);
        apiQuotes = await Reponse.json()
        Quote()

    }catch(error){
        console.log(error)
    }
}
getQuote()


//Tweet Quotes
function TweetQuote(){
    let twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`
    window.open(twitterUrl,'_blank');
}

//add event listener 

newQuote.addEventListener('click',Quote)
twitter.addEventListener('click',TweetQuote)
