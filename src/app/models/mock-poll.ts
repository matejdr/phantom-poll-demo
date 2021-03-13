import { Poll } from './poll';

export const POLL: Poll = {
  id: 1,
  title: 'Are you getting vaccinated for COVID-19?',
  responses: [
    {
      id: 2,
      title: "Yes",
      score: 2
    },
    {
      id: 3,
      title: "No",
      score: 3
    },
    {
      id: 4,
      title: "Hell NO!",
      score: 10
    }
  ],
  canUserVote: true
}
