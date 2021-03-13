import { Component, OnInit } from '@angular/core';
import { Poll } from '../../models/poll'
import { PollService } from '../../services/poll.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit {
  poll?: Poll;
  maxScore = 0

  constructor(private pollService: PollService, private logService: LogService) { }

  ngOnInit(): void {
    this.getPoll()
    this.subscribeToVotes()
  }

  getPoll(): void {
    this.pollService.getPoll().subscribe(this.processPollCallback);
  }

  subscribeToVotes(): void {
    this.pollService.getVotes().subscribe(this.processPollCallback);
  }

  processPollCallback = (poll: Poll): void  => {
    this.poll = poll
    const votes = this.poll?.responses?.map(item => [item.title, item.score])
    if (votes) {
      this.logService.add(`PollComponent: received votes: ${votes}`)
    }

    const allScores = this.poll?.responses?.map(item => item.score)
    if (allScores) {
      this.maxScore = Math.max(...allScores);
    }
  }
}
