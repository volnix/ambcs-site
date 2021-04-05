import 'bootstrap';
import EventDisplayer from './event_displayer';
let range = require('lodash.range');
let sortBy = require('lodash.sortBy');

let query_string = new URLSearchParams(window.location.search);
let year = query_string.has('year') ? query_string.get('year') : (new Date().getFullYear());

// Set the title to the current year's calendar
window.document.title = year + " Results";
let header_block = document.getElementsByClassName('title')[0].getElementsByTagName('h1')[0];
header_block.innerHTML = year + ' ' + header_block.innerHTML;

// Display the results
['marathon', 'xc'].forEach((type) => {
    let displayer = new EventDisplayer(
        ['name', 'date', 'results'],
        document.getElementById(type + '-calendar')
    );

    fetch('https://0ccx6mfjvj.execute-api.us-east-1.amazonaws.com/races?type=' + type + '&year=' + year, {
        method: 'GET'
    }).then((resp) => resp.json()).then((data) => {
        let races = sortBy(data.races.filter(race => race.results != undefined), ['date']);
        displayer.display(races);
    }).catch(function(error) {
        console.error(error);
    });
});

// Hide overall results if not the current year
if (year != (new Date().getFullYear())) {
    document.getElementById('overall').style = 'display: none;';
}

// Display our year selector
let result_selector_element = document.getElementById('past-results');
range((new Date().getFullYear()) - 2, (new Date().getFullYear()) + 1).forEach((results_year) => {
    let li = document.createElement('li');
    li.className = 'nav-item';

    let a = document.createElement('a');
    a.href = '/results.html?year=' + results_year;
    a.innerHTML = results_year;
    a.className = (results_year == year) ? 'nav-link active disabled' : 'nav-link';

    li.appendChild(a);
    result_selector_element.appendChild(li);
});