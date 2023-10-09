const API_KEY = 'live_VYWieMaZM9uyeWnhAESDEKF6KvxyVtOYstsBmZxeJZv4MQO2n0Ea2Wdy0adkfexM';
const BASE_URL = 'https://api.thecatapi.com/v1';


function fetchCatImage() {
    fetch(`${BASE_URL}/images/search`, {
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data[0]);
            const url = data[0].url;

            localStorage.setItem('catImageUrl', url);

            $('.cat-img').attr('src', url);
        })
        .catch(error => {
            console.error('Error fetching cat data:', error);
        });
}

const storedUrl = localStorage.getItem('catImageUrl');

if (storedUrl) {
    $('.cat-img').attr('src', storedUrl);
} else {
    fetchCatImage;
}

$('#fetch-cat').on("click", () => {
    localStorage.clear();
    fetchCatImage();
})
