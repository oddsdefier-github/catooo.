const API_KEY = 'live_VYWieMaZM9uyeWnhAESDEKF6KvxyVtOYstsBmZxeJZv4MQO2n0Ea2Wdy0adkfexM';
const BASE_URL = 'https://api.thecatapi.com/v1';


function fetchCatImage() {
    $('.cat-img-container').hide();
    $('.loading').show();

    $('.cat-img').attr('src', '../img/placeholder.png');
    fetch(`${BASE_URL}/images/search`, {
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
            const url = data[0].url;

            localStorage.setItem('catImageUrl', url);
            $('.cat-img').attr('src', url);

            $('.loading').hide();
            $('.cat-img-container').show();
        })
        .catch(error => {
            console.error('Error fetching cat data:', error);
            $('.loading').hide();
        });
}

const storedUrl = localStorage.getItem('catImageUrl');
if (storedUrl) {
    $('.cat-img').attr('src', storedUrl);
} else {
    fetchCatImage;
}

setTimeout(() => {
    $('.welcome-container').hide();
    setTimeout(() => {
        fetchCatImage()
    }, 100)
}, 2000)
$('#fetch-cat').on("click", () => {
    localStorage.clear();
    fetchCatImage();
})
