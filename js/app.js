const newList = selector('.list')
const template = selector('.movie__template').content
const elSelectGenres = selector('.form__select__genres')
const elSortedFilms = selector('.form__select__sorts')
const elForm = selector('.form')
const elInput = selector('.form__input')
const elModal = selector('.modal')
const modalImg = selector('.modal__img')
const modalContent = selector('.content')
const modalP = selector('.modal__p')
const modalList = selector('.modal__list')
const modalTime = selector('.time')
const modalCloser = selector('.closer')


function renderFilms(filmsArr, element) {
    element.innerHTML = null
    filmsArr.forEach(film => {
        const filmTemplate = template.cloneNode(true)
        
        selector('.card__img', filmTemplate).setAttribute('src', film.poster)
        selector('.names', filmTemplate).textContent = film.title
        const buttonMore = selector('.button__more', filmTemplate)
        // buttonMore.dataset.film__id = film.id
        
        buttonMore.addEventListener('click', (evt) => {
            elModal.classList.add('modal--active')
            // const filmId = evt.target.dataset.film__id
            
            // const foundFilms = filmsArr.find(film => film.id === filmId)
            modalImg.setAttribute('src', film.poster)
            modalContent.textContent = film.title   
            modalP.textContent = film.overview
            modalTime.textContent = timeMaker(film.release_date)

            modalList.innerHTML = null
            film.genres.forEach(genre => {
                const newGenreLi = creator('li')
                newGenreLi.textContent = genre
                modalList.appendChild(newGenreLi)
            })
            
            modalCloser.addEventListener('click', (evt) => {
                elModal.classList.remove('modal--active')
            })
            elModal.addEventListener('click', (evt) => {
                elModal.classList.remove('modal--active')
            })
            
        })
        

        //appends
        element.appendChild(filmTemplate)
    })
}

renderFilms(films, newList)

function renderGenres(filmsArr, element) {
    let filmGenres = []
    filmsArr.forEach(film => {
        film.genres.filter(genre => {
            if(!filmGenres.includes(genre)) {
                filmGenres.push(genre)
            }
        })
    })
    
    filmGenres.forEach(genre => {
        const newOption = creator('option')
        newOption.value = genre
        newOption.textContent = genre
        element.appendChild(newOption)
    })
}

renderGenres(films, elSelectGenres)

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const inputValue = elInput.value.trim()
    const selectValue = elSelectGenres.value
    const sortValue = elSortedFilms.value

    let regex = new RegExp(inputValue, 'gi')
    let searchedfilms = films.filter(film => {
        return film.title.match(regex)
    })

    
    let genredFilms = []
    if(selectValue === 'all') {
        genredFilms = searchedfilms
    } else {
        genredFilms = searchedfilms.filter(film => {
            return film.genres.includes(selectValue)
        })
    }

    let sortedFilms = []
    if(sortValue === '') {
        sortedFilms = genredFilms
    } else if (sortValue === 'a_z'){
        sortedFilms = genredFilms.sort((a, b) => {
            if(a.title > b.title) {
                return 1
            }else if(a.title < b.title) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortValue === 'z_a') {
        sortedFilms = genredFilms.sort((b, a) => {
            if(a.title > b.title) {
                return 1
            }else if(a.title < b.title) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortValue === 'old_new') {
        sortedFilms = genredFilms.sort((a, b) => a.release_date - b.release_date)
    } else if (sortValue === 'new_old') {
        sortedFilms = genredFilms.sort((b, a) => a.release_date - b.release_date)
    }
    
    renderFilms(sortedFilms, newList)
})

