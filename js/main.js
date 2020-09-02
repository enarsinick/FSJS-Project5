// TO DO FOR PROJECT

// FORMAT THE PHONE NUMBER
// FORMAT THE BIRTHDAY










// ----------------------------------------------------
// DECLARING VARIABLES
// ----------------------------------------------------
const url = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob&nat=gb';
const container = document.getElementById('gallery');
const modalContainer = document.getElementsByClassName('modal-container')
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
            <div class="modal-container modal-${index}">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${img}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${locationCity}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${locationStreetNumber} ${locationStreetName}, ${locationCity}, ${locationState}, ${locationPostcode}</p>
                        <p class="modal-text">Birthday: ${dob}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `;
    });
};

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


// ----------------------------------------------------
// Initialise the page
// ----------------------------------------------------
fetchData(url)
    .then(response => generateHTML(response));