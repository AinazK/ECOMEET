// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Volunteer {
//   id_user: number;
//   name_user: string;
// }

// export interface EcoEvents {
//   id: number;
//   name: string;
//   location: string;
//   date: string;
//   time: string;
//   currentAmount: number;
//   goalAmount: number;
//   description: string;
//   organizerName: string;
//   organizerId: number;
//   volunteerList: Volunteer[];
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class EcoEvent {
//   private apiUrl = 'https://affably-fragrant-blackbuck.cloudpub.ru/api';

//   constructor(private http: HttpClient) {}

//   getEvents(): Observable<EcoEvents[]> {
//     return this.http.get<EcoEvents[]>(`${this.apiUrl}/event_list`);
//   }

//   getEventById(_id: number) {
//     const currentUserId = 1;

//     return new Observable<EcoEvents[]>((observer) => {
//       this.getEvents().subscribe({
//         next: (events) => {
//           const filtered = events.filter(
//             (e) =>
//               e.organizerId === currentUserId ||
//               e.volunteerList?.some((v) => v.id_user === currentUserId)
//           );

//           observer.next(filtered as EcoEvents[]);
//           observer.complete();
//         },
//         error: (err) => observer.error(err),
//       });
//     });
//   }

//   createEvent(event: any) {
//     return this.http.post<any>(`${this.apiUrl}/register_event`, event);
//   }

//   deleteEventById(id: number) {
//     return this.http.post<any>(`${this.apiUrl}/delete_event`, { id_event: id });
//   }

//   participateEventById(data: { id_event: number; id_user: number }) {
//     return this.http.post<any>(`${this.apiUrl}/add_user_on_event`, data);
//   }
// }
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Volunteer {
  id_user: number;
  name_user: string;
  rating: number;
}

export interface EcoEvents {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  currentAmount: number;
  goalAmount: number;
  description: string;
  organizerName: string;
  organizerId: number;
  volunteerList: Volunteer[];
}

@Injectable({
  providedIn: 'root',
})
export class EcoEvent {
  private currentUserId = 1;

  private events: EcoEvents[] = [
    {
      id: 1,
      name: 'Уборка городского парка',
      location: 'Казань, Парк Горького',
      date: '2025-11-20',
      time: '14:00',
      currentAmount: 4200,
      goalAmount: 5000,
      description:
        'Глобальная уборка городского парка перед зимним сезоном. Соберём мусор, расчистим дорожки и приведём территорию в порядок.',
      organizerName: 'Вы',
      organizerId: 1,
      volunteerList: [
        { id_user: 2, name_user: 'Данис', rating: 4 },
        { id_user: 3, name_user: 'Мария', rating: 5 },
        { id_user: 4, name_user: 'Егор', rating: 4 },
        { id_user: 5, name_user: 'Алина', rating: 5 },
        { id_user: 6, name_user: 'Олег', rating: 5 },
        { id_user: 7, name_user: 'Екатерина', rating: 4 },
        { id_user: 14, name_user: 'Айрат', rating: 5 },
        { id_user: 15, name_user: 'Дина', rating: 4 },
      ],
    },

    {
      id: 2,
      name: 'Посадка молодых деревьев',
      location: 'Казань, Набережная Кремля',
      date: '2025-11-22',
      time: '12:00',
      currentAmount: 6600,
      goalAmount: 10000,
      description:
        'Совместная акция по посадке 30 молодых саженцев вдоль волжской набережной.',
      organizerName: 'Дамир',
      organizerId: 3,
      volunteerList: [
        { id_user: 1, name_user: 'Вы', rating: 5 },
        { id_user: 2, name_user: 'Данис', rating: 4 },
        { id_user: 6, name_user: 'Олег', rating: 5 },
        { id_user: 7, name_user: 'Екатерина', rating: 4 },
        { id_user: 16, name_user: 'Карина', rating: 5 },
        { id_user: 17, name_user: 'Игорь', rating: 4 },
        { id_user: 18, name_user: 'Светлана', rating: 5 },
      ],
    },

    {
      id: 3,
      name: 'Раздельный сбор мусора в школах',
      location: 'Казань, Школа №179',
      date: '2025-11-25',
      time: '10:00',
      currentAmount: 12500,
      goalAmount: 40000,
      description:
        'Обучающая экологическая акция для школьников: рассказываем о переработке и собираем 50 кг макулатуры.',
      organizerName: 'Алексей',
      organizerId: 10,
      volunteerList: [
        { id_user: 8, name_user: 'Жанна', rating: 4 },
        { id_user: 9, name_user: 'Ильдар', rating: 5 },
        { id_user: 10, name_user: 'Дмитрий', rating: 5 },
        { id_user: 19, name_user: 'Таисия', rating: 4 },
        { id_user: 20, name_user: 'Фадель', rating: 5 },
      ],
    },

    {
      id: 4,
      name: 'Сбор пластика в районе Азино',
      location: 'Казань, ТРК "Парк Хаус"',
      date: '2025-11-28',
      time: '16:00',
      currentAmount: 2100,
      goalAmount: 4000,
      description:
        'Акция по сбору пластиковых бутылок и их сортировке в специальных контейнерах.',
      organizerName: 'Вы',
      organizerId: 1,
      volunteerList: [
        { id_user: 1, name_user: 'Вы', rating: 5 },
        { id_user: 12, name_user: 'Самира', rating: 4 },
        { id_user: 21, name_user: 'Лина', rating: 5 },
        { id_user: 22, name_user: 'Камиль', rating: 4 },
      ],
    },

    {
      id: 5,
      name: 'Помощь приюту для животных',
      location: 'Казань, Приют "Дари Добро"',
      date: '2025-12-01',
      time: '09:30',
      currentAmount: 11300,
      goalAmount: 15000,
      description:
        'Помощь в уборке вольеров, выгуле собак и сортировке кормов.',
      organizerName: 'Вероника',
      organizerId: 4,
      volunteerList: [
        { id_user: 3, name_user: 'Мария', rating: 5 },
        { id_user: 8, name_user: 'Жанна', rating: 4 },
        { id_user: 13, name_user: 'Руслан', rating: 5 },
        { id_user: 23, name_user: 'Эмиль', rating: 5 },
        { id_user: 24, name_user: 'Сабина', rating: 4 },
      ],
    },
  ];

  constructor() {}

  private randomDelay(): number {
    return 400 + Math.random() * 400;
  }

  getEvents(): Observable<EcoEvents[]> {
    return of(this.events).pipe(delay(this.randomDelay()));
  }

  getEventById(_id: number): Observable<EcoEvents[]> {
    const filtered = this.events.filter(
      (e) =>
        e.organizerId === this.currentUserId ||
        e.volunteerList.some((v) => v.id_user === this.currentUserId)
    );

    return of(filtered).pipe(delay(this.randomDelay()));
  }

  createEvent(event: any) {
    const newEvent: EcoEvents = {
      ...event,
      id: Date.now(),
      volunteerList: [],
      currentAmount: 0,
    };

    this.events.push(newEvent);

    return of(newEvent).pipe(delay(this.randomDelay()));
  }

  deleteEventById(id: number) {
    this.events = this.events.filter((e) => e.id !== id);
    return of({ success: true }).pipe(delay(this.randomDelay()));
  }

  participateEventById(data: { id_event: number; id_user: number }) {
    const event = this.events.find((e) => e.id === data.id_event);

    if (event) {
      event.volunteerList.push({
        id_user: data.id_user,
        name_user: 'Пользователь ' + data.id_user,
        rating: 5,
      });

      event.currentAmount++;
    }

    return of({ success: true }).pipe(delay(this.randomDelay()));
  }

  declineEvent(id_event: number) {
    const event = this.events.find((e) => e.id === id_event);

    if (event) {
      event.volunteerList = event.volunteerList.filter(
        (v) => v.id_user !== this.currentUserId
      );

      event.currentAmount--;
    }

    return of({ success: true }).pipe(delay(this.randomDelay()));
  }
}
