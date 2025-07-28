let TWmoviesList = document.getElementById('TWmovies-list');
let UserEmail = sessionStorage.getItem("user-email");

let API_key = "api_key=1108";
let BASE_URL = "https://api.themoviedb.org/3";
let IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function get_LS() {
    const movie_ids = JSON.parse(localStorage.getItem(`ids-${UserEmail}`))
    return movie_ids === null ? [] : movie_ids;
}
function add_to_LS(id) {
    const movie_ids = get_LS()
    localStorage.setItem(`ids-${UserEmail}`, JSON.stringify([...movie_ids, type + "/" + id]))
}
function remove_LS(id) {
    const movie_ids = get_LS()
    localStorage.setItem(`ids-${UserEmail}`, JSON.stringify(movie_ids.filter(e => e !== (type + "/" + id))))
};

fetchMovies();
async function fetchMovies() {
    const movies_LS = await get_LS()
    const movies = []
    for (let i = 0; i <= movies_LS.length - 1; i++) {
        const movie_url = movies_LS[i];
        let movie = getMovies(BASE_URL + "/" + movie_url + "?" + API_key);
        movies.push(movie);
    };
};

function getMovies(url) {
    TWmoviesList.innerHTML= ' ';
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            showMovies(response);
        })
};

function showMovies(data) {
    const { id, title, poster_path, release_date, first_air_date, vote_average, name } = data;
    let Elem = document.createElement('li');
    let d = new Date(release_date ? release_date : first_air_date);

    Elem.innerHTML = `
    <div class="movie-card" id="movie-card">
                    <a href="movie.html?type=${title ? "movie" : "tv"}&id=${id}" id = ${id}>
                        <img src="${poster_path ? IMG_BASE_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title ? title : name}">
                    </a>

                    <div class="title">
                        <a href="movie.html?id=${id}">
                            <h3>${title ? title : name}</h3>
                        </a>
                    </div>
                    <div class="title-card">
                    <span>${release_date ? d.getFullYear() : "since " + d.getFullYear()}</span>
                        <div class="rating">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2L12.6478 1.6221C12.5134 1.39168 12.2668 1.25 12 1.25C11.7332 1.25 11.4866 1.39168 11.3522 1.6221L12 2ZM15.5 8L14.8522 8.3779L15.011 8.65015L15.3166 8.72723L15.5 8ZM22 9.63932L22.5504 10.1488C22.7302 9.95455 22.7943 9.67981 22.719 9.42598C22.6437 9.17215 22.4401 8.97684 22.1834 8.91209L22 9.63932ZM17.5 14.5L16.9496 13.9905L16.682 14.2796L16.7681 14.664L17.5 14.5ZM19.1803 22L18.8912 22.692C19.1499 22.8001 19.4473 22.7549 19.6622 22.5747C19.8771 22.3946 19.9735 22.1096 19.9122 21.836L19.1803 22ZM12 19L12.2891 18.308L12 18.1872L11.7109 18.308L12 19ZM4.81966 22L4.0878 21.836C4.0265 22.1096 4.12294 22.3946 4.33781 22.5747C4.55267 22.7549 4.85008 22.8001 5.10879 22.692L4.81966 22ZM6.5 14.5L7.23186 14.664L7.31798 14.2796L7.05036 13.9905L6.5 14.5ZM2 9.63932L1.81659 8.91209C1.55986 8.97684 1.35629 9.17215 1.28098 9.42598C1.20567 9.67981 1.26977 9.95455 1.44964 10.1488L2 9.63932ZM8.5 8L8.68341 8.72723L8.98902 8.65015L9.14783 8.3779L8.5 8ZM11.3522 2.3779L14.8522 8.3779L16.1478 7.6221L12.6478 1.6221L11.3522 2.3779ZM15.3166 8.72723L21.8166 10.3665L22.1834 8.91209L15.6834 7.27277L15.3166 8.72723ZM21.4496 9.1298L16.9496 13.9905L18.0504 15.0095L22.5504 10.1488L21.4496 9.1298ZM16.7681 14.664L18.4485 22.164L19.9122 21.836L18.2319 14.336L16.7681 14.664ZM19.4695 21.308L12.2891 18.308L11.7109 19.692L18.8912 22.692L19.4695 21.308ZM11.7109 18.308L4.53053 21.308L5.10879 22.692L12.2891 19.692L11.7109 18.308ZM5.55152 22.164L7.23186 14.664L5.76814 14.336L4.0878 21.836L5.55152 22.164ZM7.05036 13.9905L2.55036 9.1298L1.44964 10.1488L5.94964 15.0095L7.05036 13.9905ZM2.18341 10.3665L8.68341 8.72723L8.31659 7.27277L1.81659 8.91209L2.18341 10.3665ZM9.14783 8.3779L12.6478 2.3779L11.3522 1.6221L7.85217 7.6221L9.14783 8.3779Z"
                                    fill="#141B34" />
                            </svg>
                            ${Math.round(vote_average * 10) / 10}
                        </div>
                    </div>
                </div>
                `;
    TWmoviesList.appendChild(Elem);
};
