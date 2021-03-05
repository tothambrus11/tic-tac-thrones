import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  currentLang = "en-US";

  ngOnInit(): void {
    this.currentLang = document.location.href.replace(environment.baseUrl, "").startsWith("hu") ? "hu" : "en-US"
  }

  onChange(e: any) {
    window.location.href = environment.baseUrl + e.target.value
  }
}
