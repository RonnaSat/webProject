function onLoad() {

    fetch('https://api.jikan.moe/v4/seasons/now').then(response => {
        return response.json()
    })
        .then(incomeData => {
            defaultHide()
            console.log(incomeData.data)
            addAnimeList(incomeData.data, 0)
        }
        )
}


var defaultPage = document.getElementById('defaultPage')
var interestedPage = document.getElementById('interestedPage')
var detailPage = document.getElementById('detailPage')
function defaultHide() {
    interestedPage.style.display = 'none'
    detailPage.style.display = 'none'
}
function hideAll() {
    defaultPage.style.display = 'none'
    interestedPage.style.display = 'none'
    detailPage.style.display = 'none'
}
document.getElementById('homeBtn').addEventListener('click', function () {
    hideAll()
    defaultPage.style.display = 'block'
    fetch('https://api.jikan.moe/v4/seasons/now').then(response => {
        return response.json()
    })
        .then(incomeData => {
            defaultHide()
            console.log(incomeData.data)
            addAnimeList(incomeData.data, 0)
        }
        )
})
document.getElementById('interestedBtn').addEventListener('click', function () {
    hideAll()
    defaultPage.style.display = 'block'
    showInterested()
})



function addAnimeList(aniList, status) {

    let divBody = document.getElementById('defaultPage')
    divBody.innerHTML = ''
    let text = document.createElement('h2')
    text.classList.add('ms-5')
    if (status == 2) {
        text.innerHTML = 'My anime List'
        
    } else {
        text.innerHTML = 'Anime List'
    }
    
    divBody.appendChild(text)
    if(aniList == ''){
        let empty = document.createElement('h4')
        empty.classList.add('ms-5')
        empty.classList.add('ps-5')
        empty.classList.add('text-muted')
        empty.innerHTML = 'No result!!!'
        divBody.appendChild(empty)
    }
    let contentDiv = document.createElement('div')
    contentDiv.id = 'contentCard'
    contentDiv.classList.add('container')
    contentDiv.classList.add('d-flex')
    contentDiv.classList.add('flex-wrap')
    divBody.appendChild(contentDiv)
    for (ani of aniList) {
        addAnimeToDiv(status, ani)
    }
}
function addAnimeToDiv(status, data) {
    let divBody = document.getElementById('contentCard')
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('mx-2')
    card.classList.add('my-5')
    if (status < 2) {
        card.style.height = "25rem"
        card.style.width = "15rem"
    } else {
        card.style.height = "30rem"
        card.style.width = "18rem"
    }

    card.style.minWidth = '15rem'
    card.classList.add('btn')

    let image = document.createElement('img')
    if (status == 0) {
        image.src = `${data.images.jpg.image_url} `
    } else if (status == 1) {
        image.src = `${data.image_url} `
    } else if (status == 2) {
        image.src = `${data.image_url} `
    }

    image.classList.add('card-img-top')
    image.style.height = '22rem'
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    let infoText = document.createElement('p')
    infoText.classList.add('card-title')
    infoText.classList.add('w-75')
    infoText.classList.add('d-inline-block')
    infoText.classList.add('text-truncate')
    infoText.innerText = `${data.title} `
    cardBody.appendChild(infoText)
    if (status == 2) {
        let detailBtn = document.createElement('button')
        detailBtn.classList.add('btn')
        detailBtn.classList.add('btn-outline-primary')
        detailBtn.style.width = '8rem'
        detailBtn.classList.add('mx-1')
        detailBtn.innerText = 'Detail'
        detailBtn.addEventListener('click',function(){
            showAnimeDetail(data.id)
        })
        cardBody.appendChild(detailBtn)
        let deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn')
        deleteBtn.classList.add('btn-danger')
        deleteBtn.classList.add('mx-1')
        deleteBtn.style.width = '5rem'
        deleteBtn.innerText = 'Delete'
        deleteBtn.addEventListener('click',function(){
            let text = `Delete ${data.title} from favorites?`;
            if (confirm(text)) {
                deleteAnime(data.id)
            }
        })
        cardBody.appendChild(deleteBtn)
    }
    card.appendChild(image)
    card.appendChild(cardBody)
    if (status < 2) {
        card.addEventListener('dblclick', function () {
            let text = `Add ${data.title} to favorites?`;
            if (confirm(text)) {
                if (status == 0) {
                    addToFav(data, status)
                } else if (status == 1)
                    addToFavSearch(data, status)
            }
        })
    }
    divBody.appendChild(card)
}

document.getElementById('searchBtn').addEventListener('click', function () {
    let searchText = document.getElementById('searchInput').value
    hideAll()
    defaultPage.style.display = 'block'
    fetch(`https://api.jikan.moe/v3/search/anime?q=${searchText}`).then(response => {
        return response.json()
    })
        .then(incomeData => {
            defaultHide()

            console.log(incomeData.results)
            addAnimeList(incomeData.results, 1)
        }
        )
})

function addToFav(data, status) {
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: '642110327',
            movie: {
                url: `${data.url}`,
                image_url: `${data.images.jpg.image_url}`,
                title: `${data.title}`,
                synopsis: `${data.synopsis}`,
                type: `${data.type}`,
                episodes: `${data.episodes}`,
                score: `${data.score}`,
                rated: `${data.rating}`,
            }
        })
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log('success', data)
        alert(`anime ${data.title} is now added`)
        showInterested()
    }).catch(error => {
        return null
    })
}
function addToFavSearch(data, status) {
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: '642110327',
            movie: {
                url: `${data.url}`,
                image_url: `${data.image_url}`,
                title: `${data.title}`,
                synopsis: `${data.synopsis}`,
                type: `${data.type}`,
                episodes: `${data.episodes}`,
                score: `${data.score}`,
                rated: `${data.rating}`,
            }
        })
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log('success', data)
        alert(`anime ${data.title} is now added`)
        showInterested()
    }).catch(error => {
        return null
    })
}


function showInterested() {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/642110327').then(response => {
        return response.json()
    })
        .then(incomeData => {
            console.log(incomeData)
            addAnimeList(incomeData, 2)
        }
        )
}

function showAnimeDetail(id){
    console.log(id)
    fetch(`https://se104-project-backend.du.r.appspot.com/movie/642110327/${id}`).then(response => {
        return response.json()
    })
        .then(incomeData => {
            console.log(incomeData)
            showAnimeDetailToDiv(incomeData)
        }
        )
}
function showAnimeDetailToDiv(data){
    hideAll()
    detailPage.style.display = 'block'
    let divBody = document.getElementById('detailPage')
    divBody.innerHTML = ''
    divBody.classList.add('container-fluid')
    divBody.classList.add('p-5')
    
    let subDiv = document.createElement('div')
    subDiv.classList.add('row')
    let picDiv = document.createElement('div')
    picDiv.classList.add('col-3')
    let pic = document.createElement('img')
    pic.style.minWidth = '15rem'
    pic.classList.add('w-100')
    pic.classList.add('img-thumbnail')
    pic.src = `${data.image_url}`
    let reviewBox = document.createElement('div')
    reviewBox.classList.add('d-flex')
    reviewBox.classList.add('justify-content-center')
    reviewBox.classList.add('m-3')
    let animeReview = document.createElement('a')
    animeReview.href = `${data.url}`
    animeReview.innerHTML = 'Read full review'
    reviewBox.appendChild(animeReview)
    picDiv.appendChild(pic)
    picDiv.appendChild(reviewBox)
    subDiv.appendChild(picDiv)
    let contentDiv = document.createElement('div')
    contentDiv.classList.add('col-9')
    contentDiv.classList.add('ps-3')
    let animeName = document.createElement('h3')
    animeName.innerHTML = data.title
    animeName.classList.add('pb-2')
    animeName.classList.add('border-bottom')
    contentDiv.appendChild(animeName)
    let animeScore = document.createElement('p')
    animeScore.classList.add('text-secondary')
    animeScore.classList.add('ps-2')
    animeScore.innerHTML = `${data.score}/10 scores`
    contentDiv.appendChild(animeScore)
    let synopsis = document.createElement('h5')
    synopsis.innerHTML = 'Synopsis'
    synopsis.classList.add('p-2')
    contentDiv.appendChild(synopsis)
    let animeSynopsis = document.createElement('p')
    animeSynopsis.classList.add('ps-4')
    animeSynopsis.classList.add('pb-4')
    animeSynopsis.classList.add('border-bottom')
    animeSynopsis.innerHTML = `${data.synopsis}`
    contentDiv.appendChild(animeSynopsis)
    let detail = document.createElement('h5')
    detail.innerHTML = 'Details'
    detail.classList.add('p-2')
    contentDiv.appendChild(detail)
    let animeType = document.createElement('p')
    animeType.classList.add('ps-4')
    animeType.innerHTML = `types: ${data.type}`
    contentDiv.appendChild(animeType)
    let animeEpisodes = document.createElement('p')
    animeEpisodes.classList.add('ps-4')
    animeEpisodes.innerHTML = `episodes: ${data.episodes}`
    contentDiv.appendChild(animeEpisodes)
    let animeRate = document.createElement('p')
    animeRate.classList.add('ps-4')
    animeRate.innerHTML = `rated: ${data.rated}`
    contentDiv.appendChild(animeRate)
    subDiv.appendChild(contentDiv)
    divBody.appendChild(subDiv)
}

function deleteAnime(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=642110327&&movieId=${id}`,{
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`${data.title} was removed from DB`)
        showInterested()
    }).catch(error => {
        alert('????')
    })
}