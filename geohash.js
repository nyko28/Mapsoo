const BASE32_CODES = "0123456789bcdefghjkmnpqrstuvwxyz"
var BASE32_CODES_DICT = {}
for (var i = 0; i < BASE32_CODES.length; i++) {
    BASE32_CODES_DICT[BASE32_CODES.charAt(i)] = i
}

const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LON = -180;
const MAX_LON = 180;

function decodeGeohash(hashString) {
    var bbox = decodeBbox(hashString)
    var lat = (bbox[0] + bbox[2]) / 2
    var lon = (bbox[1] + bbox[3]) / 2
    var latErr = bbox[2] - lat
    var lonErr = bbox[3] - lon
    return {
        latitude: lat, longitude: lon,
        error: { latitude: latErr, longitude: lonErr }
    }
};

function decodeBbox(hashString) {
    var isLon = true, mid,
        maxLat = MAX_LAT, minLat = MIN_LAT,
        maxLon = MAX_LON, minLon = MIN_LON

    var hashValue = 0
    for (var i = 0, l = hashString.length; i < l; i++) {
        var code = hashString[i].toLowerCase()
        hashValue = BASE32_CODES_DICT[code]

        for (var bits = 4; bits >= 0; bits--) {
            var bit = (hashValue >> bits) & 1
            if (isLon) {
                mid = (maxLon + minLon) / 2
                if (bit === 1) {
                    minLon = mid
                } else {
                    maxLon = mid
                }
            } else {
                mid = (maxLat + minLat) / 2
                if (bit === 1) {
                    minLat = mid
                } else {
                    maxLat = mid
                }
            }
            isLon = !isLon
        }
    }
    return [minLat, minLon, maxLat, maxLon]
}