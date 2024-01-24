
// header-sticky
let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0)
})

// navbar-responsive
let menu = document.querySelector(".box");
let navbar = document.querySelector(".navbar");

menu.addEventListener("click", function () {
    navbar.classList.toggle("active");
})
window.addEventListener("scroll", () => {
    navbar.classList.remove('active');
})


// go-to-top 
let goTopBtn = document.querySelector(".go-top");
window.addEventListener("scroll", function () {
    goTopBtn.classList.toggle("active", window.scrollY > 330);
})

document.querySelector('.btn-action').addEventListener('click', () => {
    document.querySelector('.dropdown-menu').classList.toggle("show");
    document.querySelector('.caret-up').classList.toggle("active");
    document.querySelector('.caret-down').classList.toggle("active");
})

// ********************
// FETCHING TMDB API
// *******************

let API_key = "api_key=1108d733ca4193e846ae6030e4e73b47";
let BASE_URL = "https://api.themoviedb.org/3";
let IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
let API_URL1 = BASE_URL + "/trending/all/week?" + API_key; //trending-ALL-WEEK
let API_URL2 = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_key;
let API_URL3 = BASE_URL + "/discover/tv?sort_by=popularity.desc&" + API_key;

let movies = document.getElementById('movies');
let movieList = document.getElementById('movies-list');
let tvList = document.getElementById('tv-list');
let genreList = document.getElementById('genre-list');

let prev = document.getElementById('prev')
let next = document.getElementById('next')
let current = document.getElementById('current')

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let totalPages = 100;

getMovies(API_URL1);

function getMovies(url) {
    lastURL = url;
    movieList.innerHTML = " ";
    tvList.innerHTML = " ";
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(response.results);
            // var totalPages = response.total_pages;

            // console.log(lastURL);
            if (response.results.length != 0) {
                showMovies(response.results);
                currentPage = response.page;
                nextPage = currentPage + 1;
                prevPage = currentPage - 1;

                current.innerText = currentPage;

                if (currentPage <= 1) {
                    prev.classList.add('disabled');
                    next.classList.remove('disabled')
                } else if (currentPage >= totalPages) {
                    prev.classList.remove('disabled');
                    next.classList.add('disabled')
                } else {
                    prev.classList.remove('disabled');
                    next.classList.remove('disabled')
                }
                movies.scrollIntoView();
            }
            else if (response.results.length == 0) {
                next.classList.add('disabled')

            }

        })
        .catch(err => console.error(err));
}


function showMovies(data) {
    data.forEach(movie => {
        const { title, poster_path, release_date, vote_average, name, first_air_date, id, media_type } = movie;
        let Elem = document.createElement('li');
        let d = new Date(release_date ? release_date : first_air_date);

        Elem.innerHTML = `
                <div class="movie-card" id="movie-card">
                    <a href="movie.html?type=${title? "movie" : "tv"}&id=${id}" id = ${id}>
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
        title ? movieList.appendChild(Elem) : tvList.appendChild(Elem);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id);
            openDetails(movie);
        })
    });
}



// SEARCH
let form = document.getElementById('form');
let search = document.getElementById('search');
const searchURL = BASE_URL + '/search/multi?';

let activeMovie = document.getElementById('activeMovie');
let activeTV = document.getElementById('activeTV');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchTerm = search.value;

    if (searchTerm) {
        activeMovie.innerHTML = "Results for Movies";
        activeTV.innerHTML = "Results for TV Shows";
        getMovies(searchURL + 'query=' + searchTerm + '&' + API_key);
        movies.scrollIntoView();
    }
    else {
        getMovies(API_URL1);
    }

})



//*****************
//  GENRE LIST AND BUTTONS
// **********************

var selectedGenre = [];
const genres = [
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 37,
        "name": "Western"
    },
    //Movie specific
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },

    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    //TV specific
    {
        "id": 10759,
        "name": "Action & Adventure"
    },
    {
        "id": 10762,
        "name": "Kids"
    },
    {
        "id": 10763,
        "name": "News"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    },
    {
        "id": 10766,
        "name": "Soap"
    },
    {
        "id": 10767,
        "name": "Talk"
    },
    {
        "id": 10768,
        "name": "War & Politics"
    },

];
SetGenre();
function SetGenre() {
    genreList.innerHTML = ' ';
    genres.forEach(genre => {
        const t = document.createElement('li');
        t.classList.add('tag');
        t.innerHTML = `
        <button class ="genre-btn" id = ${genre.id}>${genre.name}</button>
        `

        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            }
            else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, index) => {
                        if (id == genre.id) {
                            selectedGenre.splice(index, 1);
                            if (selectedGenre.length == 0) {
                                getMovies(API_URL1);
                            }
                        }
                    });
                }
                else {
                    selectedGenre.push(genre.id);
                }
            }


            console.log(selectedGenre);
            getMovies(API_URL2 + "&with_genres=" + encodeURI(selectedGenre.join(',')));
            getMovies(API_URL3 + "&with_genres=" + encodeURI(selectedGenre.join(',')));
            highlightGenre();
            activeMovie.innerHTML = "Results for Movies";
            activeTV.innerHTML = "Results for TV Shows";
        })
        genreList.appendChild(t);

    });
}



function highlightGenre() {
    genres.forEach(genre => {
        if (selectedGenre.includes(genre.id)) {
            document.getElementById(genre.id).classList.add('highlight');
        }
        else {
            document.getElementById(genre.id).classList.remove('highlight');

        }
    })
    clearBtn();

}

function clearBtn() {
    let clearBtn = document.getElementById('clr');
    if (clearBtn == null) {
        let clear = document.createElement('li');
        clear.classList.add("genre-btn");
        clear.id = "clr";
        clear.innerText = 'Clear ×'

        clear.addEventListener('click', () => {
            getMovies(API_URL1);
            selectedGenre = [];
            SetGenre();
        })
        genreList.appendChild(clear);
    }

}


// PAGINATION 
prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
        // movies.scrollIntoView();

    }
})

next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
        // movies.scrollIntoView();

    }
})

function pageCall(page) {
    let url = lastURL + '&page=' + page;
    getMovies(url);
}