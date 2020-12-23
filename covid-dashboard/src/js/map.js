import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import WorldData from 'geojson-world-map';
import { dataCountries } from './table';

require('leaflet/dist/images/marker-icon-2x.png');
require('leaflet/dist/images/marker-icon.png');
require('leaflet/dist/images/marker-shadow.png');

function addMap() {
    const mapOptions = {
        center: [53.385044, 27.486671],
        zoom: 5,
        worldCopyJump: true,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 'topleft',
        },
    };

    const map = new L.Map('map', mapOptions);
    const StadiaOutdoors = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    });
    map.addLayer(StadiaOutdoors);

    const markerOptions = {
        title: 'MyLocation',
        clickable: true,
        draggable: true,
    };

    let marker = L.marker([53.385044, 27.486671], markerOptions).bindPopup('Location');
    marker.addTo(map);
    map.on('click', (e) => {
        if (marker !== null) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
    });
    map.invalidateSize();

    L.geoJson(WorldData).addTo(map);

    function getColor(d) {
        return d > 5000000 ? '#800026'
            : d > 1000000 ? '#BD0026'
                : d > 500000 ? '#E31A1C'
                    : d > 200000 ? '#FC4E2A'
                        : d > 50000 ? '#FD8D3C'
                            : d > 10000 ? '#FEB24C'
                                : d > 1000 ? '#FED976'
                                    : '#FFEDA0';
    }

    function style(feature) {
        if (feature.properties.name === 'United States') {
            feature.properties.name = 'USA';
        }
        if (feature.properties.name === 'Czech Rep.') {
            feature.properties.name = 'Czechia';
        }
        if (feature.properties.name === 'Central African Rep.') {
            feature.properties.name = 'Central African Republic';
        }
        if (feature.properties.name === 'Dem. Rep. Congo') {
            feature.properties.name = 'DRC';
        }
        if (feature.properties.name === 'S. Sudan') {
            feature.properties.name = 'Sudan';
        }
        if (feature.properties.name === 'United Kingdom') {
            feature.properties.name = 'UK';
        }
        if (feature.properties.name === 'Libya') {
            feature.properties.name = 'Libyan Arab Jamahiriya';
        }
        if (feature.properties.name === 'Syria') {
            feature.properties.name = 'Syrian Arab Republic';
        }
        if (feature.properties.name === 'Lao PDR') {
            feature.properties.name = `Lao People's Democratic Republic`;
        }
        if (feature.properties.name === 'Korea') {
            feature.properties.name = 'S. Korea';
        }
        if (feature.properties.name === 'W. Sahara') {
            feature.properties.name = 'Western Sahara';
        }
        if (feature.properties.name === 'Bosnia and Herz.') {
            feature.properties.name = 'Bosnia';
        }
        for (let i = 0; i < dataCountries.length; i += 1) {
            if (dataCountries[i].country === feature.properties.name) {
                feature.properties.density = dataCountries[i].cases;
            }
        }
        return {
            fillColor: getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
        };
    }

    L.geoJson(WorldData, { style }).addTo(map);

    const info = L.control();
    info.onAdd = function () {
        this.div = L.DomUtil.create('div', 'info');
        this.update();
        return this.div;
    };

    function highlightFeature(e) {
        const layer = e.target;
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7,
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }

    let geojson;

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
    }

    geojson = L.geoJson(WorldData, {
        style,
        onEachFeature,
    }).addTo(map);

    info.update = function (props) {
        this.div.innerHTML = `<h4>Total Confirmed</h4>${props
            ? `<b>${props.name}</b><br />${props.density.toLocaleString('ru-RU')} cases`
            : 'Hover over a country'}`;
    };

    info.addTo(map);

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 1000, 10000, 50000, 200000, 500000, 1000000, 5000000];
        for (let i = 0; i < grades.length; i += 1) {
            div.innerHTML += `<i style="background:${getColor(grades[i] + 1)}"></i>${
                grades[i].toLocaleString('ru-RU')} ${grades[i + 1] ? `&ndash; ${grades[i + 1].toLocaleString('ru-RU')}<br>` : '+'}`;
        }

        return div;
    };

    legend.addTo(map);
}

export { addMap };