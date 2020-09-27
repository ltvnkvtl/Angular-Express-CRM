import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loaderColor: number;

  constructor() { }

  ngOnInit(): void {
    this.loaderColor = Math.floor((Math.random() * 3));
  }

}
