import { Injectable } from '@angular/core';
import {Observable, Subject, interval} from 'rxjs';
import { map } from 'rxjs/operators';
import { Poll } from '../models/poll'
import { POLL } from '../models/mock-poll';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  votesStream$ = new Subject<number>();
  poll: Poll = { ...POLL }

  constructor(private logService: LogService) {}

  getPoll(): Observable<Poll> {
    // Emit a value every 2 seconds
    const poll = interval(2000).pipe(
      map(() => {
        const response = this.poll?.responses[Math.floor(Math.random() * this.poll.responses.length)]
        if (response) {//
          response.score += 1
        }
        return this.poll;
      })
    );
    this.logService.add('PollService: fetched poll');
    return poll;
  }

  vote(id: number): Observable<boolean> {
    this.logService.add(`PollService: voting for ${id}`);
    this.votesStream$.next(id)
    // a mock implementation for the remote response
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  getVotes(): Observable<Poll> {
    return this.votesStream$
      .pipe(map(id => {
        const response = this.poll.responses.find(item => item.id == id)
        if (response) {
          response.score += 1
        }
        this.poll.canUserVote = false
        return this.poll
      }))
  }
}
