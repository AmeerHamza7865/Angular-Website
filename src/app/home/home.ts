import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';

import { initFlowbite } from 'flowbite/lib/esm/components';
import { Slider } from '../components/slider/slider';
import { TeamSection } from '../components/team-section/team-section';
import { ProductList } from '../components/product-list/product-list';

@Component({
  selector: 'app-home',
  imports: [NgIf,Slider,TeamSection,ProductList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  visible = false;
  openModal = false;

  toggle() {
    this.visible = !this.visible;
  }

  ngAfterViewInit(): void {
    initFlowbite(); // rebinds modal, dropdown, tooltip etc.
  }
}
