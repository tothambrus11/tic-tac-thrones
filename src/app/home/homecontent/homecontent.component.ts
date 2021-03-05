import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-homecontent',
    templateUrl: './homecontent.component.html',
    styleUrls: ['./homecontent.component.scss']
})
export class HomecontentComponent implements OnInit {
    showRules = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    privateRoom() {
        alert('Coming soon. ;)\nIf you found this game good and you would like to play it online with friends, email me, so I know, I should spend time with it :D');
    }

    changeShowRules() {
        this.showRules = !this.showRules;
        let i = setInterval(() => this.triggerResize(), 70);
        setTimeout(() => {
            clearInterval(i);
        }, 520);
    }

    triggerResize() {
        const resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initEvent('resize', true, false);
        window.dispatchEvent(resizeEvent);
    }
}
