import moment from "moment";
import '../css/includes/_event_displayer.scss';

export default class EventDisplayer {
    constructor(keys, element) {
        this.keys = keys;
        this.element = element;
    }

    display(races) {
        if (! races) {
            let p = document.createElement('p');
            p.innerHTML = 'No races found!';
            p.className = 'no-races';
            this.element.appendChild(p);
        } else {
            let table = this.element.getElementsByTagName('table')[0];
            let body = document.createElement('tbody');
            
            races.forEach((race) => {
                let row = document.createElement('tr');
                let td; let value;
        
                this.keys.forEach((key) => {

                    if (! race[key]) {
                        value = '';
                    } else if (race[key].match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)) {
                        value = moment(race[key]).format('MMMM Do, YYYY');
                    } else if (race[key].match(/^http/)) {
                        value = '<a href="' + race[key] + '" target="_blank">' + key.charAt(0).toUpperCase() + key.slice(1) + '</a>';
                    } else {
                        value = race[key];
                    }

                    td = document.createElement('td');
                    td.innerHTML = value;
                    row.appendChild(td);
                });
                
                body.appendChild(row);
            });
    
            table.appendChild(body);
            table.style = "";
        }
    }
}