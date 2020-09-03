// TO DO FOR PROJECT

// FORMAT THE PHONE NUMBER
// FORMAT THE BIRTHDAY










// ----------------------------------------------------
// DECLARING VARIABLES
// ----------------------------------------------------
const url = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob&nat=gb';
const container = document.getElementById('gallery');
const modalContainer = document.getElementsByClassName('modal-container');
const searchContainer = document.querySelector('.search-container');
let fetchResponseData = [];

// ----------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('Looks like there was an error', error))
}; 

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

function generateHTML(data) {
    fetchResponseData = data.results;
    
    // Loop and create main HTML content
    fetchResponseData.map((fetchResponseData, index) => {

        // Declaring varibales 
        const firstName = fetchResponseData.name.first;
        const lastName = fetchResponseData.name.last;
        const img = fetchResponseData.picture.large;
        const city = fetchResponseData.location.city;
        const state = fetchResponseData.location.state;
        const email = fetchResponseData.email;

        // Adds the HTML to the page
        container.innerHTML += `
            <div class="card" data-index="${index}">
                <div class="card-img-container" data-index="${index}">
                    <img class="card-img" src="${img}" alt="profile picture" data-index="${index}">
                </div>
                <div class="card-info-container" data-index="${index}">
                    <h3 id="name" class="card-name cap" data-index="${index}">${firstName} ${lastName}</h3>
                    <p class="card-text" data-index="${index}">${email}</p>
                    <p class="card-text cap" data-index="${index}">${city}, ${state}</p>
                </div>
            </div>
        `;
    });

    // // Loop through and create modal content
    fetchResponseData.map((fetchResponseData, index) => {

        // Declaring varibales 
        const firstName = fetchResponseData.name.first;
        const lastName = fetchResponseData.name.last;
        const img = fetchResponseData.picture.large;
        const email = fetchResponseData.email;
        const locationStreetNumber = fetchResponseData.location.street.number;
        const locationStreetName = fetchResponseData.location.street.name;
        const locationCity = fetchResponseData.location.city;
        const locationState = fetchResponseData.location.state;
        const locationPostcode = fetchResponseData.location.postcode;
        const phone = fetchResponseData.cell;
        const dob = fetchResponseData.dob.date;

        

        container.innerHTML += `
            <div id="modal-container" class="modal-container modal-${index}" data-index="${index}">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${img}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${locationCity}</p>
                        <hr>
                        <p class="modal-text">${formatPhone(phone)}</p>
                        <p class="modal-text">${locationStreetNumber} ${locationStreetName}, ${locationCity}, ${locationState}, ${locationPostcode}</p>
                        <p class="modal-text">Birthday: ${new Date(Date.parse(dob)).toLocaleDateString(navigator.language)}</p>
                    </div>
                </div>
            </div>
        `;
    });
};

function formatPhone(number) {
    let numberArray = number.split('-');
    return `(${numberArray[0]}) ${numberArray[1]}-${numberArray[2]}`
}


function addSearchBar(searchContainer) {
    searchContainer.innerHTML = `<form action="#" method="get">
                                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                                </form>`;
}

// ----------------------------------------------------
// Event listeners
// ----------------------------------------------------

// Listen for click on employee container and displays corresponding modal window
document.addEventListener('click', event => {
    const target = event.target.className;
    const targetIndex = event.target.getAttribute('data-index');
    const modalWrapper = document.getElementsByClassName('modal-' + targetIndex)[0];
    if (
        target === 'card' || 
        target === 'card-img-container' ||
        target === 'card-img' ||
        target === 'card-info-container' ||
        target === 'card-name cap' ||
        target === 'card-text'
        ) {
        modalWrapper.style.display = 'block';
    } 
});

// Listening for clicks on black overlay of popup and closes modal window
document.addEventListener('click', event => {
    if (event.target.className === 'modal-close-btn' || event.target.parentNode.className === 'modal-close-btn') {
        for (let i = 0; i < modalContainer.length; i++) {
            modalContainer[i].style.display = 'none';
        }
    }
});

// search functionality
document.addEventListener('click', (event) => {
    // Is the thing we're clicking the search button
    if (event.target.className === 'search-submit') {
        // Selecting variables
        const searchBarValue = document.getElementById('search-input').value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        const name = document.getElementById('name');
        // Loop over each employee card and display or hide
        for (i = 0; i < cards.length; i++) {
            let name = cards[i].textContent;        
            if (name.toLowerCase().indexOf(searchBarValue) > -1) {
                cards[i].style.display = '';
            } else {
                cards[i].style.display = 'none';
            }
        }
    }
});

// ----------------------------------------------------
// Initialise the page
// ----------------------------------------------------
fetchData(url)
    .then(response => generateHTML(response));

addSearchBar(searchContainer);