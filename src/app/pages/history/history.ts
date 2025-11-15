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

interface HistoryEvent extends Event {
  photo: string[];
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
  historyEvents: HistoryEvent[] = [
    {
      id: 101,
      name: 'Уборка городского парка',
      location: 'Казань, Парк Горького',
      date: '05.11.2025',
      time: '12:00',
      volunteers: 15,
      currentAmount: 1500,
      goalAmount: 1500,
      description:
        'Очистили территории парка, убрали листья и мусор, посадили цветы.',
      organizer: 'Мария',
      isOpen: false,
      photo: ['3.1', '3.2', '3.3'],
    } as any,
    {
      id: 102,
      name: 'Сбор макулатуры в школах',
      location: 'Казань, Школа №179',
      date: '08.11.2025',
      time: '10:00',
      volunteers: 10,
      currentAmount: 1200,
      goalAmount: 1200,
      description:
        'Провели экологическую акцию по сбору макулатуры среди учеников.',
      organizer: 'Алексей',
      isOpen: false,
      photo: ['2.1', '2.2', '2.3'],
    } as any,
    {
      id: 103,
      name: 'Помощь приюту для животных',
      location: 'Казань, Приют "Дари Добро"',
      date: '12.11.2025',
      time: '09:00',
      volunteers: 8,
      currentAmount: 2000,
      goalAmount: 2000,
      description:
        'Чистка вольеров, кормление и выгул животных, сортировка подарков для приюта.',
      organizer: 'Вероника',
      isOpen: false,
      photo: ['3.1', '3.2', '3.3'],
    } as any,
    {
      id: 104,
      name: 'Посадка деревьев вдоль набережной',
      location: 'Казань, Набережная',
      date: '14.11.2025',
      time: '11:00',
      volunteers: 12,
      currentAmount: 1800,
      goalAmount: 1800,
      description:
        'Высадили молодые деревья, подготовили почву, установили подпорки.',
      organizer: 'Дамир',
      isOpen: false,
      photo: ['1.1', '1.2', '1.3'],
    } as any,
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
        const filteredEvents =
          this.role === 'organizer'
            ? eventArray.filter((e) => e.organizerId === 1)
            : eventArray;

        this.events = filteredEvents.map((e) => ({
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
