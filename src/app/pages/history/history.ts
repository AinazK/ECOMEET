import { Component } from '@angular/core';
import { Navigation } from '../../components/navigation/navigation';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role';
import { FormsModule } from '@angular/forms';
import { EcoEvent } from '../../services/eco-event';

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
  isOpen: boolean;
  volunteerList?: Volunteer[];
}

@Component({
  selector: 'app-history',
  imports: [CommonModule, Navigation, FormsModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  role: 'volunteer' | 'organizer' | null = null;
  showNewEventForm = false;
  newEvent: Partial<Event> = {};
  events: Event[] = [];
  historyEvents: Event[] = [
    {
      id: 100,
      name: 'Убраться в парке',
      location: 'Казань Парк Горького',
      date: '05.11.2025',
      time: '12:00',
      volunteers: 13,
      currentAmount: 1000,
      goalAmount: 1000,
      description: 'Посадим деревья. Собираем на саженцы и удобрение.',
      organizer: 'Данис',
      isOpen: false,
    },
  ];

  constructor(private roleService: RoleService, private ecoEvent: EcoEvent) {
    this.role = this.roleService.getRole();
  }

  ngOnInit() {
    this.loadEvents(1);
  }

  removeFromEvents(event: Event) {
    this.events = this.events.filter((e) => e.id !== event.id);
  }

  loadEvents(id: number) {
    this.ecoEvent.getEventById(id).subscribe({
      next: (eventArray) => {
        this.events = eventArray.map((e) => ({
          ...e,
          isOpen: false,
          organizer: e.organizerName,
          volunteers: e.volunteerList?.length || 0,
          volunteerList:
            e.volunteerList?.map((v) => ({
              ...v,
              rating: Math.random() < 0.5 ? 4 : 5,
            })) || [],
        }));
      },
      error: (err) => console.error('Ошибка загрузки событий:', err),
    });
  }

  deleteEvent(event: any) {
    this.ecoEvent.deleteEventById(event.id).subscribe({
      next: () => {
        this.events = this.events.filter((e) => e.id !== event.id);
      },
      error: (err) => console.error('Ошибка удаления:', err),
    });
  }

  finishEvent(event: any) {
    this.historyEvents.push({ ...event, isOpen: false });
    this.deleteEvent(event);
  }

  toggleArrow(event: Event) {
    event.isOpen = !event.isOpen;
  }

  progress(event: Event): number {
    return (event.currentAmount / event.goalAmount) * 100;
  }

  // (click)="setRating(event, v, i + 1)"
  setRating(event: Event, volunteer: Volunteer, newRating: number) {
    volunteer.rating = newRating;
  }

  openNewEventForm() {
    this.showNewEventForm = true;
  }

  createEvent() {
    if (!this.newEvent.name || !this.newEvent.date || !this.newEvent.time) {
      alert('Заполните все поля');
      return;
    }

    const formattedDate = this.newEvent.date;
    const formattedTime = this.newEvent.time + ':00';

    const eventToAdd: any = {
      name: this.newEvent.name,
      location: this.newEvent.location || 'Не указано',
      date: formattedDate,
      time: formattedTime,
      goalAmount: this.newEvent.goalAmount || 0,
      description: this.newEvent.description || '',
      organizerId: this.newEvent.organizerId || 1,
    };

    this.ecoEvent.createEvent(eventToAdd).subscribe({
      next: (createdEvent) => {
        const newEventForUI: Event = {
          id: createdEvent.id,
          name: createdEvent.name,
          location: createdEvent.location,
          date: createdEvent.date,
          time: createdEvent.time,
          goalAmount: createdEvent.goalAmount,
          currentAmount: createdEvent.currentAmount || 0,
          description: createdEvent.description,
          organizer: createdEvent.organizerName || 'Волонтер',
          organizerId: createdEvent.organizerId,
          volunteerList: createdEvent.volunteerList || [],
          volunteers: createdEvent.volunteerList?.length || 0,
          isOpen: false,
        };

        this.events.push(newEventForUI);
        this.showNewEventForm = false;
      },
      error: (err) => console.error('Ошибка создания события:', err),
    });
  }

  removeVolunteer(event: Event, volunteer: Volunteer) {
    if (!event.volunteerList) return;
    event.volunteerList = event.volunteerList.filter(
      (v) => v.id_user !== volunteer.id_user
    );
    event.volunteers = (event.volunteers || 1) - 1;
  }

  cancelEvent() {
    this.showNewEventForm = false;
    this.newEvent = {};
  }
}
