import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Routes } from '@angular/router';
import { Notfoundpage } from './notfoundpage/notfoundpage';
import { Blogs } from './blogs/blogs';
import { Products } from './products/products';

export const routes: Routes = [
    { path: '', component: Home },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about').then(m => m.About)
  },
    { path: 'contact', component: Contact },
    { path: 'blogs', component: Blogs },
    { path: 'products', component: Products },
    { path: '**', component: Notfoundpage }

];


