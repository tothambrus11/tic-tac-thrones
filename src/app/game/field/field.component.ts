import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../game';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input()
  field!: Field;

  constructor() { }

  ngOnInit(): void {
  }
}
