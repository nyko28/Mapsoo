# Mapsoo 🚴⭐
Chrome extension to get Google Maps' ratings on Deliveroo

## Get an API key
Follow this [guide](https://developers.google.com/places/web-service/get-api-key) to create your project on GCP and get an API key.
Allow your project to use the 'Places API' and enable the billing. You will not be charged until you enable automatic billing or exceed the free limits. Keep your key safe and restrict it to your personal use.

Set `API_KEY` in `background.js`.

## Update the manifest
Update the Deliveroo domain in the `matches` array according to your country.
```jsonc
"content_scripts": [
    {
        "matches": [
            "https://deliveroo.fr/fr/restaurants/*"
        ],
        // ...
    }
]
```

## Install on Chrome
- Clone / Download this repository
- Go to the extensions page : chrome://extensions
- Click on "Load unpacked"
- Select the Mapsoo folder
