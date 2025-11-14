import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Navigation } from '../../components/navigation/navigation';
import { RoleService } from '../../services/role'; // Убедитесь, что путь правильный

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Navigation],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  currentRole: 'volunteer' | 'organizer' = 'volunteer';

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    // Получаем текущую роль при инициализации
    const role = this.roleService.getRole();
    if (role) {
      this.currentRole = role;
    }
  }

  switchRole(role: 'volunteer' | 'organizer') {
    this.currentRole = role;
    this.roleService.setRole(role);
    // Здесь можно добавить дополнительную логику при смене роли
    console.log('Роль изменена на:', role);
  }
}
