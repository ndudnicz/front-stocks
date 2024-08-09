import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ElementComponent } from './components/element/element.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'element/:id', component: ElementComponent},
    {path: '**', redirectTo: 'home'}
];
