import { PollResponse } from './poll-response'

export interface Poll {
  id: number;
  title: string;
  responses: PollResponse[]
  canUserVote: boolean
}
