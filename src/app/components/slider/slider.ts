import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class Slider {

    currentIndex = 0;
      // intervalId: any;


   images = [
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg'
  ];

// ngOnInit() {
//     // Auto slide every 3 seconds
//     this.intervalId = setInterval(() => {
//       this.nextSlide();
//     }, 3000);
//   }

//   ngOnDestroy() {
//     // Clean up interval when component is destroyed
//     if (this.intervalId) {
//       clearInterval(this.intervalId);
//     }
//   }

  
  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextSlide() {
    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;
  }
}
