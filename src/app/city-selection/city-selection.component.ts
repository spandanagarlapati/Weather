import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-city-selection',
  templateUrl: './city-selection.component.html',
  styleUrls: ['./city-selection.component.css']
})
export class CitySelectionComponent implements OnInit {

  @Output() cityChanged: EventEmitter<any> = new EventEmitter<any>();
  selectedCity='bangalore';

  constructor() { }

  ngOnInit() {
  }

  onValueChange(event) {
    this.cityChanged.emit(event.value);
  }

}
