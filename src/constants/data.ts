export const CARD_VALUES = [0, 1, 2, 3, 5, 8, 13, 21, '?', '☕'] as const;

export type CardValue = (typeof CARD_VALUES)[number];

export interface Participant {
  id: number;
  name: string;
  initials: string;
  colorClass: string;
  vote: CardValue | null;
  hasVoted: boolean;
  outlier: boolean;
  img: string | null;
  isMe?: boolean;
}

export const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    name: 'Alex Lindon',
    initials: 'AL',
    colorClass: 'bg-accent text-accent-foreground',
    vote: 5,
    hasVoted: true,
    outlier: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy5Qb2rnGSriu2IiVf_7_d5iqpViHvroexY_mqIvik1VOJeIL3CDY9KZKj9MlYEmsnURlVubPjfKP-olmbCgYz_5uEBlz3RGafeZxKdFWlCI84vQJU0WWR0iwJ_95DUVQpN8eqOhBpyiPY3EIDwWsapKsLTNEVrwFjuJVr3sBhXIAvHddtPOcVAh7Ro0IR5d9Yhyw9ts3MugI4vvwra-i2Yf9vlE2H3W8j-tWrt1ATL4HoGfhPMx6lvA2XWHi_qNhJF--C5gAq1Fbr',
  },
  {
    id: 2,
    name: 'Sam K.',
    initials: 'SK',
    colorClass: 'bg-muted text-muted-foreground',
    vote: 5,
    hasVoted: false,
    outlier: false,
    img: null,
  },
  {
    id: 3,
    name: 'Marcus R.',
    initials: 'MR',
    colorClass: 'bg-secondary text-secondary-foreground',
    vote: 5,
    hasVoted: true,
    outlier: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbCdbeYxC0ZB3CIYt4PabJ-WowOg0Mu9q4euoDBzFF6LxuiMbnOiV0mtWv5NZGtGkCgkrYWXkBiyj--A44a-6NzHzK71d95n8x_BXpkH9PGZlaHI8_5wiYdKdS0ACVWd8NNMxcd--bp3rF-yobdHjg-C2p16lhPwn9ALLCncEh4e0OSAp1-nZRfK79wmpd_uwb8pp7xiuDYpRWOlsRouqPthd66qvL-WnNffHvdA0zNQHM92JMn-LbOn5Y4i0PsNh0DO99hbQLDeBC',
  },
  {
    id: 4,
    name: 'Jordan V.',
    initials: 'JV',
    colorClass: 'bg-destructive/10 text-destructive',
    vote: 8,
    hasVoted: true,
    outlier: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9TFIsB1DnLCkVoOCdCiY-uOh7blYsMLUPQjmtf12SHYBd-VTWSc_IT1uWknPUVuGOGTes5DTGr15zeFvcE49eURvK3_-lnSuuWHztW9xhZFJJDZK-paVLFJ0D9Uilw2X5_g9GAF4C5cqfyV5-w8D2IoVqfxFTOKClotOdZpq2dScmXNArOxpMn8H8vSnnVQ9INh5Gg58yhsSNtia38nkMgcBWKYY7uSCxrAKx-uoU-bp3M05YkEys_e_KrRXHOntJ2G2uT5_zdUG5',
  },
  {
    id: 5,
    name: 'Casey W.',
    initials: 'CW',
    colorClass: 'bg-accent text-accent-foreground',
    vote: 5,
    hasVoted: true,
    outlier: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7_9VByzD7Au0IEPGKGUY4_84n5mYiEznyZa2297J4izFSV7lYt1vUwOF5J1EvvZFhoJhbP8HX1gVlScc1yWH9Kl8JejMK6xg1tsGepWq55UOW6Sd0KGvFHu6kEZmqN6WVKG_kyT6-6SAdcIAQEXkgen7waNA9mM5s-nxgm4ffb8lqGr7f0TdNiX_nvikdNIIbi2AA7LAdW607rwI8nlyJFGOSjbSkBxfdb5JaZsyUzKE8R0jZONnIq69diBlQV6H1KGhspTE4teB',
  },
  {
    id: 6,
    name: 'You (Jane)',
    initials: 'JD',
    colorClass: 'bg-secondary text-secondary-foreground',
    vote: 5,
    hasVoted: true,
    outlier: false,
    isMe: true,
    img: null,
  },
];
