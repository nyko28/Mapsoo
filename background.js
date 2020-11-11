/**
 * Get an API key on GCP to use 'Places API'
 */
const API_KEY = "YOUR API KEY"
const API_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
const API_FIELDS = ["rating", "user_ratings_total"]
const FULL_API_URL = `${API_URL}?key=${API_KEY}&fields=${API_FIELDS.join(',')}&inputtype=textquery`

async function queryPlace(name, location) {
    const url = `${FULL_API_URL}&input=${encodeURIComponent(name)}&locationbias=${encodeURIComponent(location)}`
    const res = await fetch(url)
    return await res.json()
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.query == 'queryPlace') {
        (async () => {
            sendResponse(await queryPlace(request.name, request.location))
        })()
        return true // async response
    }
});
