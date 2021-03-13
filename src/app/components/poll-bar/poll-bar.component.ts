import { Component, Input, OnInit } from '@angular/core';
import { PollResponse } from "../../models/poll-response";
import { PollService } from "../../services/poll.service";
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LogService } from "../../services/log.service";

@Component({
  selector: 'app-poll-bar',
  templateUrl: './poll-bar.component.html',
  styleUrls: ['./poll-bar.component.sass']
})
export class PollBarComponent implements OnInit {
  @Input() pollResponse?: PollResponse;
  @Input() votingEnabled = false;
  @Input() maxScore = 0;
  @Input() index = 0;
  selected = false
  private clickStream$ = new Subject<number>();

  constructor(private pollService: PollService, private logService: LogService) { }

  ngOnInit(): void {
    this.clickStream$
      .pipe(
        switchMap((id: number) => {
          return this.pollService.vote(id)
        }),
      ).subscribe(response => {
        this.logService.add(`PollBarComponent: vote service response '${response}'`);
      });
  }

  onSelect(id: number): void {
    this.selected = true
    this.clickStream$.next(id);
  }

  getHeight(): number {
    if (this.pollResponse?.score && this.maxScore) {
      return Math.round(this.pollResponse.score / this.maxScore * 100)
    }
    return 10
  }

  getBackgroundColor(): string {
    if (!(this.index % 3)) {
      return 'rgb(206, 39, 37)'
    }
    if (!(this.index % 2)) {
      return 'rgb(225, 26, 44)'
    }
    return 'rgb(232, 93, 32)'
  }

  // this generates a random red number
  generateRed(): string {
    const r = Math.floor(Math.random() * (255 - 128) + 128) // r in range 128 - 256
    const g = Math.floor(Math.random() * 99) // g in range 0 - 99
    const b = Math.floor(Math.random() * 71) // b in range 0 - 71
    return `rgb(${r}, ${g}, ${b})`
  }
}
