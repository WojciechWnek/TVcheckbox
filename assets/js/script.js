import {API_KEY, API_URL, API_IMAGE_PATH} from './config.js'

const REQUEST = API_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY;

const test = 'https://api.themoviedb.org/3/movie/550?api_key=6b51cc23bca4d4e7532b1fc9c8c8f576'

// function getMovie(url){
//     fetch(url).then(res => res.json()).then(data => {
//         console.log(data);
//     })
// }

// getMovie(test);


const getMovie = async function(url){
    const res = await fetch(url);
    const data = await res.json();

    // const {movieData} = data
    const movieData={
        id: data.id,
        title: data.original_title,
        overview: data.overview,
        runtime: data.runtime,
        score: data.vote_average,
        date: data.release_date,
        homepage: data.homepage,
        genres: data.genres,
        image: data.poster_path
    }

    
    // console.log(data);
    // console.log(movieData.title);
    return`
        <img class="content__poster" src="${API_IMAGE_PATH}${movieData.image}" alt="${movieData.title}">

        <h1 class="content__title">${movieData.title}</h1>
        <p class="content__overview">
            ${movieData.overview}
        </p>
    `
}


const renderContent =  function(){
    // getMovie(test)
    // console.log(API_IMAGE_PATH, movieData.image);
    // console.log(movieData);

    return`
        <img class="content__poster" src="${API_IMAGE_PATH}${movieData.image}" alt="${movieData.title}">

        <h1 class="content__title">${movieData.title}</h1>
        <p class="content__overview">
            ${movieData.overview}
        </p>
    `

}



getMovie(test)
const content = document.querySelector('.content');
// content.innerHTML = `<img src="${API_IMAGE_PATH}${movieData.image}">`


content.insertAdjacentHTML('afterbegin',await getMovie(test))
// getMovie(REQUEST)

// const getJSON = async function(url){

//         const res = await fetch(url)
//         const data = await res.json();

// };

// const getMovie = async function(discover){
//     const data = await getJSON(API_URL + discover + '&' + API_KEY);
//     console.log(data);
// }

// getMovie(example);