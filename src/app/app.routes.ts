import { Routes } from '@angular/router';
import { Profile } from './pages/profile/profile';
import { Events } from './pages/events/events';
import { History } from './pages/history/history';
import { Vk } from './pages/vk/vk';
import { Welcome } from './pages/welcome/welcome';

export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'profile', component: Profile },
  { path: 'history', component: History },
  { path: 'vk_dobro', component: Vk },
  { path: 'events', component: Events },
];
