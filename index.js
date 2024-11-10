
const cardObjectDefinitions = [
    {id: 1,  imagePath: './images/ace_of_spades2.png'},
    {id: 2, imagePath: './images/2_of_spades.png'},
    {id: 3,  imagePath: './images/3_of_spades.png'},
    {id: 4,  imagePath: './images/4_of_spades.png'},
    {id: 5, imagePath: './images/5_of_spades.png'},
    {id: 6,  imagePath: './images/6_of_spades.png'},
    {id: 7,  imagePath: './images/7_of_spades.png'},
    {id: 8,  imagePath: './images/8_of_spades.png'},
    {id: 9, imagePath: './images/9_of_spades.png'},
    {id: 10,  imagePath: './images/10_of_spades.png'},
    {id: 11,  imagePath: './images/jack_of_spades.png'},
    {id: 12,  imagePath: './images/queen_of_spades.png'},
    {id: 13,  imagePath: './images/king_of_spades.png'},
];
let deck = []

const cardBackImgPath = './images/red_joker.png';

const cardContainerElem = document.querySelector('.card-container');
const deckContainer = document.querySelector('.deck-container')

const startGameButton = document.getElementById('start');
startGameButton.addEventListener('click',()=>startGame())

const hit = document.getElementById('hit-button')
hit.addEventListener('click',()=> hitButton())

const stand = document.getElementById('stand-button')
stand.addEventListener('click',()=> dealerTurn())



const numCards =52;

let index = 0;

let score = 0;

function startButton()
{

}
function startGame()
{
    score = 0;
    fillDeck();
    createCards();
    dealCards();
}
function shuffle()
{
    for (let i = 0; i < deck.length; i++) {
        // picks the random number between 0 and length of the deck
        let shuffle = Math.floor(Math.random() * (deck.length));
        
        //swap the current with a random position
        [ deck[i], deck[shuffle] ] = [ deck[shuffle], deck[i] ];
      }
}
function dealCards()
{
    placeCard();
}

function fillDeck()
{
    
    let count = 0;
    for(let i= 0; i< 13; i++)
        for(let j =0; j < 4; j++)
    {
        {
            const newCard = createCard(cardObjectDefinitions[i]);
            newCard.classList.add('card')
            deck[count] = newCard;
            deckContainer.appendChild(newCard)
            count++
        }
    }
    shuffle();
    console.log('deck filled!' + deck[1].id)
     
}

function hitButton()
{   
    placeCard();
}
function standButton()
{
   
}
function placeCard()
{
    const cardContainer = document.querySelector('.card-container');
    const newCard = deck[index]
    if(deckContainer.contains(newCard))
    {
        deckContainer.removeChild(newCard)
    }
    index++

        score += parseInt(newCard.id);

    cardContainer.append(newCard)
    document.getElementById('score').textContent = "Score = " + score;
    if(score > 21)
        {
            alert('you lose')
        }
}
function dealerTurn()
{
    let total = 0
    const cardContainer = document.querySelector('.card-container2')
    while(total <= score){
    const newCard = deck[index]
    if(deckContainer.contains(newCard)){
        deckContainer.removeChild(newCard)
    }   
    total += parseInt(newCard.id)
    index++
    cardContainer.append(newCard)
    }
    if(total > 21)
        {
            alert('you win')
        }
    else if(total > score)
        {
            alert('you lose')
        }
    else if(total < score && score < 21)
        {
            alert('you win')
        }
}
function createCards() {
    deck.forEach((cardItem) => {
        createCard(cardItem);
    });
}

function createCard(cardItem) {
    const cardElem = createElement('div');
    const cardInnerElem = createElement('div');
    const cardFrontElem = createElement('div');
    const cardBackElem = createElement('div');

    const cardFrontImg = createElement('img');
    const cardBackImg = createElement('img');

    addClassToElement(cardElem, 'card');
    addIdToElement(cardElem, cardItem.id);


    addClassToElement(cardInnerElem, 'card-inner');
    addClassToElement(cardFrontElem, 'card-front');
    addClassToElement(cardBackElem, 'card-back');

    addSrcToImageElem(cardBackImg, cardBackImgPath);
    addSrcToImageElem(cardFrontImg, cardItem.imagePath);

    addClassToElement(cardBackImg, 'card-img');
    addClassToElement(cardFrontImg, 'card-img');

    addChildElement(cardFrontElem, cardFrontImg);
    addChildElement(cardBackElem, cardBackImg);

    addChildElement(cardInnerElem, cardFrontElem);
    addChildElement(cardInnerElem, cardBackElem);

    addChildElement(cardElem, cardInnerElem);

    cardElem.addEventListener('click', () => {
        cardElem.classList.toggle('flipped');
    });

    return cardElem
}

function createElement(elemType) {
    return document.createElement(elemType);
}

function addClassToElement(elem, className) {
    elem.classList.add(className);
}

function addIdToElement(elem, id) {
    elem.id = id;
}

function addSrcToImageElem(imgElem, src) {
    imgElem.src = src;
}

function addChildElement(parentElem, childElem) {
    parentElem.appendChild(childElem);
}
    