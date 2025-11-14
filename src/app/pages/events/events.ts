import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../../components/navigation/navigation';
import { EcoEvent } from '../../services/eco-event';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../services/role';

interface Volunteer {
  id_user: number;
  name_user: string;
  rating: number;
}

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  volunteers: number;
  currentAmount: number;
  goalAmount: number;
  description: string;
  organizer: string;
  organizerId?: number;
  volunteerList?: Volunteer[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, Navigation, FormsModule],
  templateUrl: './events.html',
  styleUrls: ['./events.scss'],
})
export class Events {
  searchText = '';
  allEvents: Event[] = [];
  events: Event[] = [];
  role: 'volunteer' | 'organizer' | null = null;

  constructor(private roleService: RoleService, private ecoEvent: EcoEvent) {
    this.role = this.roleService.getRole();
  }

  ngOnInit() {
    this.ecoEvent.getEvents().subscribe({
      next: (data) => {
        this.allEvents = data.map((e) => ({
          id: e.id,
          name: e.name,
          location: e.location,
          date: e.date,
          time: e.time,
          currentAmount: Number(e.currentAmount),
          goalAmount: Number(e.goalAmount),
          description: e.description,
          organizer: e.organizerName,
          organizerId: e.organizerId,
          volunteerList: e.volunteerList?.map((v) => ({
            ...v,
            rating: Math.random() < 0.5 ? 4 : 5, // рандомные звезды
          })),
          volunteers: e.volunteerList?.length || 0,
          isOpen: false,
        }));
        this.events = [...this.allEvents];
      },
      error: (err) => console.error('Ошибка загрузки событий:', err),
    });
  }

  toggleArrow(e: Event) {
    e.isOpen = !e.isOpen;
  }

  progress(e: Event) {
    return (e.currentAmount / e.goalAmount) * 100;
  }

  filterEvents() {
    const text = this.searchText.toLowerCase().trim();

    this.events = this.allEvents.filter((ev) =>
      ev.location.toLowerCase().includes(text)
    );
  }

  participateEvent(event: Event) {
    if (!event.organizerId) return;

    this.ecoEvent
      .participateEventById({
        id_event: event.id,
        id_user: 1,
      })
      .subscribe({
        next: (res) => {
          console.log('Участие отправлено', res);
          // Можно добавить обновление интерфейса, например увеличить счётчик участников
          event.volunteers += 1;
        },
        error: (err) => console.error('Ошибка при участии:', err),
      });
  }

  isUserInEvent(event: Event): boolean {
    const currentUserId = 1;
    return (
      event.volunteerList?.some((v) => v.id_user === currentUserId) || false
    );
  }
}
