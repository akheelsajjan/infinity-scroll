const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 15;
const apiKey = 'njHLsQhs8umYgR2ZrQETGg7hk3qVdQ063DOGzFIxeeg';
const apiUrl = `https://api.unsplash.com/photos/random?
client_id=${apiKey}&count=${count}`




//check if images were loaded 
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready  ' + ready)
    }
}

//Helper function
function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}


//Create Elements for links , photos and add it to DOM

function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length;
    console.log(totalImages)
    photosArray.forEach(photos => {
        // Create <a> to link to unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photos.links.html,
            target: '_blank'
        })
        // item.setAttribute('href', photos.links.html)

        // create <img> for photos
        const img = document.createElement('img')
        setAttributes(img, {
            src: photos.urls.regular,
            alt: photos.alt_description,
            title: photos.alt_description
        })
        // img.setAttribute('src', photos.urls.regular);

        //Event listner on load of a image
        img.addEventListener('load', imageLoaded)

        //Put image in <a> container
        item.appendChild(img);
        imageContainer.appendChild(item)

    });
}

// Get Photos from unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        console.log(response)
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

//check to see if we are at the bottom of the page
window.addEventListener('scroll', () => {
    //console.log(window.innerHeight + window.scrollY, document.body.offsetHeight - 2200)
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2150 && ready) {
        ready = false
        getPhotos()
    }

})

//On load
getPhotos()

