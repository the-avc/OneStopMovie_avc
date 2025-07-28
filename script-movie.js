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


//*************** 
// FETCHING TMDB API 
//*******************

let API_key = "api_key=1108";
let BASE_URL = "https://api.themoviedb.org/3";
let IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

let UserEmail = sessionStorage.getItem("user-email");
let params = new URLSearchParams(document.location.search);
let type = params.get("type");
let id = params.get("id");
console.log(id);
console.log(type);
let API_URL2 = BASE_URL + "/" + type + "/" + id + "?" + API_key;

getMovieDetails(API_URL2);

function getMovieDetails(url) {

    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            showMovieDetails(response);

        })
        .catch(err => console.error(err));
}

function showMovieDetails(data) {

    const { id, title, overview, poster_path, release_date, first_air_date, runtime, vote_average, tagline, genres, name, status } = data;
    let ElemD = document.getElementById("container-movie");
    // console.log(id);
    document.title = `${title ? title : name} - OSM.avc`;
    ElemD.innerHTML = `
    <div class="banner">
                <img src="${poster_path ? IMG_BASE_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="">
            </div>

            <div class="detail-content">
                <h1 class="h1 detail-title">
                ${title ? title : name} 
                 <span>(${release_date ? release_date : first_air_date})</span>
                </h1>
                <div class="facts">

                    <div class="badge-movie">
                        <div class="badge badge-fill">PG 13</div>
                    </div>

                    <div class="genre-movie">
                    
                    </div>



                    <div class="duration">
                        <svg width="19" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#e2d703" stroke-width="1.5" />
                            <path d="M12 7V12L14.5 14.5" stroke="#e2d703" stroke-width="1.5" />
                        </svg>

                        ${runtime ? runtime : "--"} min
                    </div>
                    <div><h4 id = "status">Status: ${status}</h4></div>
                </div>
                <div class="actions-movie">
                    <div class="rating-movie">
                        <img src="assets/svg/bxs-star.svg" alt=""><span>${vote_average}</span>
                    </div>

                    <div class="toWatch" id="toWatch">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 22V2H20V22L12 18L4 22Z" stroke="#ffffff" stroke-width="2.5"
                            stroke-linejoin="round" />
                        <path
                            d="M4 2V1.25C3.80109 1.25 3.61032 1.32902 3.46967 1.46967C3.32902 1.61032 3.25 1.80109 3.25 2L4 2ZM4 22H3.25V23.2135L4.33541 22.6708L4 22ZM20 2H20.75C20.75 1.58579 20.4142 1.25 20 1.25V2ZM20 22L19.6646 22.6708L20.75 23.2135V22H20ZM12 18L12.3354 17.3292L12 17.1615L11.6646 17.3292L12 18ZM3.25 2V22H4.75V2L3.25 2ZM19.25 2V22H20.75V2H19.25ZM20.3354 21.3292L12.3354 17.3292L11.6646 18.6708L19.6646 22.6708L20.3354 21.3292ZM4 2.75H20V1.25H4V2.75ZM4.33541 22.6708L12.3354 18.6708L11.6646 17.3292L3.66459 21.3292L4.33541 22.6708Z"
                            fill="#e2d703" />
                    </svg>
                    </div>

                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#e2d703" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M12 7L12.6478 6.6221C12.5134 6.39168 12.2668 6.25 12 6.25C11.7332 6.25 11.4866 6.39168 11.3522 6.6221L12 7ZM13.75 10L13.1022 10.3779L13.261 10.6502L13.5666 10.7272L13.75 10ZM17 10.8197L17.5504 11.3292C17.7302 11.1349 17.7943 10.8602 17.719 10.6063C17.6437 10.3525 17.4401 10.1572 17.1834 10.0924L17 10.8197ZM14.75 13.25L14.1996 12.7405L13.932 13.0296L14.0181 13.414L14.75 13.25ZM15.5902 17L15.301 17.692C15.5598 17.8001 15.8572 17.7549 16.072 17.5747C16.2869 17.3946 16.3833 17.1096 16.322 16.836L15.5902 17ZM12 15.5L12.2891 14.808L12 14.6872L11.7109 14.808L12 15.5ZM8.40983 17L7.67797 16.836C7.61667 17.1096 7.71311 17.3946 7.92798 17.5747C8.14284 17.7549 8.44025 17.8001 8.69896 17.692L8.40983 17ZM9.25 13.25L9.98186 13.414L10.068 13.0296L9.80036 12.7405L9.25 13.25ZM7 10.8197L6.81659 10.0924C6.55986 10.1572 6.35629 10.3525 6.28098 10.6063C6.20567 10.8602 6.26977 11.1349 6.44964 11.3292L7 10.8197ZM10.25 10L10.4334 10.7272L10.739 10.6502L10.8978 10.3779L10.25 10ZM11.3522 7.3779L13.1022 10.3779L14.3978 9.6221L12.6478 6.6221L11.3522 7.3779ZM13.5666 10.7272L16.8166 11.5469L17.1834 10.0924L13.9334 9.27277L13.5666 10.7272ZM16.4496 10.3101L14.1996 12.7405L15.3004 13.7595L17.5504 11.3292L16.4496 10.3101ZM14.0181 13.414L14.8583 17.164L16.322 16.836L15.4819 13.086L14.0181 13.414ZM15.8793 16.308L12.2891 14.808L11.7109 16.192L15.301 17.692L15.8793 16.308ZM11.7109 14.808L8.1207 16.308L8.69896 17.692L12.2891 16.192L11.7109 14.808ZM9.14169 17.164L9.98186 13.414L8.51814 13.086L7.67797 16.836L9.14169 17.164ZM9.80036 12.7405L7.55036 10.3101L6.44964 11.3292L8.69964 13.7595L9.80036 12.7405ZM7.18341 11.5469L10.4334 10.7272L10.0666 9.27277L6.81659 10.0924L7.18341 11.5469ZM10.8978 10.3779L12.6478 7.3779L11.3522 6.6221L9.60217 9.6221L10.8978 10.3779Z" fill="#ffffff"/>
                        </svg>

                </div>
                <div class="tagline">
                    <i>${tagline}</i>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    <p>
                        ${overview}
                    </p>
                </div>
            </div>
    `
    let GenD = document.querySelector(".genre-movie");
    for (let i = 0; i < genres.length; i++) {
        let anch = `<a href="#">${genres[i].name},</a>`;
        GenD.insertAdjacentHTML("afterbegin", anch);
    };

    let toWatch = document.getElementById('toWatch');
    
    toWatch.addEventListener('click', () => {
        if (toWatch.classList.contains('saved')) {
            remove_LS(id);
            toWatch.classList.remove('saved');
        }
        else{
            add_to_LS(id);
            toWatch.classList.add('saved');
        }; 
        window.location.reload();
    });
    if (localStorage.getItem(`ids-${UserEmail}`).includes(type + "/" + id) == true) {
        toWatch.classList.add('saved');  
      };
};

function get_LS () {
    const movie_ids = JSON.parse(localStorage.getItem(`ids-${UserEmail}`))
    return movie_ids === null ? [] : movie_ids;
}
function add_to_LS (id) {
    const movie_ids = get_LS()
    localStorage.setItem(`ids-${UserEmail}`, JSON.stringify([...movie_ids, type + "/" + id]))
}
function remove_LS (id) {
    const movie_ids = get_LS()
    localStorage.setItem(`ids-${UserEmail}`, JSON.stringify(movie_ids.filter(e => e !== (type + "/" + id))))
};
