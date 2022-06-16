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
    // interestedPage.style.display = 'block'
    defaultPage.style.display = 'block'
    showInterested()

})
// document.getElementById('detailPage').addEventListener('click', function () {
//     hideAll()
//     detailPage.style.display = 'block'

// })


function addAnimeList(aniList, status) {

    let divBody = document.getElementById('defaultPage')
    divBody.innerHTML = ''
    let text = document.createElement('h2')
    
    if(status == 2){
        text.innerHTML = 'My anime List'
    }else{
        text.innerHTML = 'Anime List'
    }
    divBody.appendChild(text)
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
    card.style.width = "15rem"
    card.style.height = "25rem"
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
    infoText.classList.add('card-text')
    infoText.classList.add('w-75')
    infoText.classList.add('d-inline-block')
    infoText.classList.add('text-truncate')
    infoText.innerText = `${data.title} `
    cardBody.appendChild(infoText)
    card.appendChild(image)
    card.appendChild(cardBody)
    if (status<2){
        card.addEventListener('dblclick', function () {
            let text = `Add ${data.title} to favorites?`;
            if (confirm(text)) {
                addToFav(data, status)
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

function showInterested() {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/642110327').then(response => {
        return response.json()
    })
        .then(incomeData => {
            console.log(incomeData)
            addAnimeList(incomeData,2)
        }
    )
}

