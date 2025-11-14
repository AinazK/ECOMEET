import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  constructor(private roleService: RoleService, private router: Router) {}

  selectRole(role: 'volunteer' | 'organizer') {
    this.roleService.setRole(role);
    console.log('Выбрана роль:', role);
    this.router.navigate(['/events']);
  }
}
