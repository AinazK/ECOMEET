import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Volunteer {
  id_user: number;
  name_user: string;
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
  private apiUrl = 'https://affably-fragrant-blackbuck.cloudpub.ru/api';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EcoEvents[]> {
    return this.http.get<EcoEvents[]>(`${this.apiUrl}/event_list`);
  }

  getEventById(_id: number) {
    const currentUserId = 1;

    return new Observable<EcoEvents[]>((observer) => {
      this.getEvents().subscribe({
        next: (events) => {
          const filtered = events.filter(
            (e) =>
              e.organizerId === currentUserId ||
              e.volunteerList?.some((v) => v.id_user === currentUserId)
          );

          observer.next(filtered as EcoEvents[]);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  createEvent(event: any) {
    return this.http.post<any>(`${this.apiUrl}/register_event`, event);
  }

  deleteEventById(id: number) {
    return this.http.post<any>(`${this.apiUrl}/delete_event`, { id_event: id });
  }

  participateEventById(data: { id_event: number; id_user: number }) {
    return this.http.post<any>(`${this.apiUrl}/add_user_on_event`, data);
  }
}
