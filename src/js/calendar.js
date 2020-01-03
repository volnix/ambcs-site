import 'bootstrap';
import EventDisplayer from './event_displayer';

let year = (new Date().getFullYear());

// Set the title to the current year's calendar
let header_block = document.getElementsByClassName('title')[0].getElementsByTagName('h1')[0];
header_block.innerHTML = year + ' ' + header_block.innerHTML;

['marathon', 'xc'].forEach((type) => {
    let displayer = new EventDisplayer(
        ['name', 'date', 'location', 'registration', 'info', 'results'],
        document.getElementById(type + '-calendar')
    );

    fetch('https://0ccx6mfjvj.execute-api.us-east-1.amazonaws.com/races?type=' + type + '&year=' + year, {
        method: 'GET'
    }).then((resp) => resp.json()).then((data) => {
        displayer.display(data.races);
    }).catch(function(error) {
        console.error(error);
    });
});