import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'about-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor() { }

  @Input()
  name!: string;

  @Input()
  description!: string;

  @Input()
  email?: string;

  @Input()
  website?: string;

  ngOnInit(): void {
  }

}
