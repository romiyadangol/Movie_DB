const movieList = document.getElementById('list');
const genre = document.getElementById('genre');
const rating = document.getElementById('rating');
const fetchMoviesBtn = document.getElementById('fetch-btn');
const addMoviesBtn = document.getElementById('add-btn');

let movies = [];

async function fetchMovies() {
    const apiKey = '933d2368';
    const response = await fetch(`http://www.omdbapi.com/?s=movie&apikey=${apiKey}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
        movies = data.Search;
        displayMovies(movies);
    } else {
        console.error('Failed to fetch movies:', data.Error);
    }
}

function displayMovies(moviesToDisplay) {
    movieList.innerHTML = '';
    moviesToDisplay.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="Poster" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <p>${movie.Type}</p>
        `;
        movieList.appendChild(movieElement);
    });
}

function filterMovies() {
    const genreValue = genre.value.toLowerCase();
    const ratingValue = rating.value;
    let filteredMovies = movies;
    
    if (genreValue) {
        filteredMovies = filteredMovies.filter(movie => movie.Type.toLowerCase().includes(genreValue));
    }
    if (ratingValue) {
        filteredMovies = filteredMovies.filter(movie => movie.Year.includes(ratingValue));
    }
    
    displayMovies(filteredMovies);
}

fetchMoviesBtn.addEventListener('click', fetchMovies);
genre.addEventListener('input', filterMovies);
rating.addEventListener('input', filterMovies);

function addMovies(newMovies) {
    movies = [...movies, ...newMovies];
    displayMovies(movies);
}
