const API_KEY = 'live_VYWieMaZM9uyeWnhAESDEKF6KvxyVtOYstsBmZxeJZv4MQO2n0Ea2Wdy0adkfexM';
const BASE_URL = 'https://api.thecatapi.com/v1';


let catImages = [];
let currentImageIndex = 0;

function fetchCatImages() {
    $('.loading').show();
    $('.cat-img-container').hide();

    fetch(`${BASE_URL}/images/search?limit=100`, {
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            catImages = data.map(img => img.url);
            showNextCatImage();
            $('.loading').hide();
            $('.cat-img-container').show();
        })
        .catch(error => {
            console.error('Error fetching cat data:', error);
            $('.loading').hide();
        });
}

function showNextCatImage() {
    if (currentImageIndex >= catImages.length) {
        currentImageIndex = 0;
        fetchCatImages(); 
        return;
    }
    const url = catImages[currentImageIndex];
    localStorage.setItem('catImageUrl', url);
    $('.cat-img').attr('src', url);
    currentImageIndex++;
}

const storedUrl = localStorage.getItem('catImageUrl');
if (storedUrl) {
    $('.cat-img').attr('src', storedUrl);
}
setTimeout(() => {
    $('.welcome-container').hide();
    $('#fetch-cat').show();
    fetchCatImages()
}, 2000)

$('#fetch-cat').on("click", () => {
    localStorage.clear();
    showNextCatImage();
});
