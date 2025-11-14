import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private role: 'volunteer' | 'organizer' = 'volunteer';

  setRole(role: 'volunteer' | 'organizer') {
    this.role = role;
  }

  getRole(): 'volunteer' | 'organizer' | null {
    return this.role;
  }

  hasRole(): boolean {
    return this.role !== null;
  }
}
