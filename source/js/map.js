import {Loader} from "@googlemaps/js-api-loader";

import {GOOGLE_API_KEY, MAP_MARKER_URL, MEDIA_BREAKPOINTS} from "./const.js";

export default class GoogleMap {
  constructor() {
    this.mapNode = document.querySelector(`.map__google`);

    this.loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      version: `weekly`,
    });

    this.markerSize = {width: 39, height: 61};
  }

  init() {
    // Defining map position and marker size
    const viewport = document.documentElement.clientWidth || window.innerWidth;
    const mapCenter =
      viewport < MEDIA_BREAKPOINTS.DESKTOP
      && viewport > MEDIA_BREAKPOINTS.MOBILE
        ? {lat: 23.176144, lng: 113.23830}
        : {lat: 23.176144, lng: 113.236920};
    const markerCenter =
      viewport < 768
        ? {lat: 23.176144, lng: 113.236920}
        : {lat: 23.176144, lng: 113.236920};

    this.loader
      .load()
      .then((google) => {
        const map = new google.maps.Map(this.mapNode, {
          zoom: 17,
          center: mapCenter,
          mapTypeControl: false,
          zoomControl: true,
          scrollwheel: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
          },
          streetViewControl: false,
          styles: [
            {
              "featureType": `all`,
              "stylers": [
                {
                  "saturation": 0
                },
                {
                  "hue": `#e7ecf0`
                }
              ]
            },
            {
              "featureType": `road`,
              "stylers": [
                {
                  "saturation": -70
                }
              ]
            },
            {
              "featureType": `transit`,
              "stylers": [
                {
                  "visibility": `off`
                }
              ]
            },
            {
              "featureType": `poi`,
              "stylers": [
                {
                  "visibility": `off`
                }
              ]
            },
            {
              "featureType": `water`,
              "stylers": [
                {
                  "visibility": `simplified`
                },
                {
                  "saturation": -60
                }
              ]
            }
          ]
        });

        const marker = new google.maps.Marker({ // eslint-disable-line
          position: markerCenter,
          animation: google.maps.Animation.DROP,
          map,
          optimized: true,
          icon: {
            url: MAP_MARKER_URL,
            scaledSize: this.markerSize,
          },
        });
      });
  }
}
