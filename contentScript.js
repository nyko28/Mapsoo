
function buildStarIcon(rating) {
    const starIcon = document.createElement("div")
    const color = rating >= 4 ? "#f9b404" : "#d1d1d1";
    starIcon.innerHTML = `<svg height="18" width="18" viewBox="0 0 24 24" fill="${color}"><path d="M12 1L9 9H2L7 14.0001L5 21L12 17.0001L19 21L17 14.0001L22 9H15L12 1Z"></path></svg>`
    starIcon.style.marginRight = "4px"
    return starIcon
}

function buildRating(rating, userRatingsTotal) {
    let div = document.createElement("li")
    div.append(buildStarIcon(rating))
    div.append(`${rating} (${userRatingsTotal.toLocaleString()})`)
    div.style.fontSize = "14px"
    div.style.display = "flex"
    div.style.alignItems = "center";
    return div
}

const geohash = new URLSearchParams(window.location.search).get("geohash")
const myLocation = decodeGeohash(geohash)

const restaurants = document.querySelectorAll("div[class^='HomeFeedUICard']>a")

const observer = new IntersectionObserver((observables) => {
    observables.forEach((observable) => {
        if (observable.isIntersecting) {
            observer.unobserve(observable.target)
            console.log("Fetch Maps ratings")

            let matches = observable.target.href.match(/\/.*\/[^\/]*\/(.*)\/([^\?]*)/)
            //let city = matches[1].replaceAll("-", " ")
            let name = matches[2].replaceAll("-", " ")

            chrome.runtime.sendMessage({ query: 'queryPlace', name: name, location: myLocation }, res => {
                let resto = res?.candidates[0]
                if (!resto) return
                let cardList = observable.target.querySelector("div.HomeFeedUICard-15a8581a1528e2fd>ul")
                cardList.insertBefore(buildRating(resto.rating, resto.user_ratings_total), cardList.children[1]);
            });
        }
    })
});

restaurants.forEach((item) => {
    observer.observe(item)
})