export interface Status {
  id: string;
  name: string;
  order: number;
}

export const statuses: Status[] = [
  {
    id: 'status#1',
    name: 'whishlist',
    order: 0
  },
  {
    id: 'status#2',
    name: 'to read',
    order: 1
  },
  {
    id: 'status#3',
    name: 'in progress',
    order: 2
  },
  {
    id: 'status#4',
    name: 'read',
    order: 3
  },
  {
    id: 'status#5',
    name: 'abandoned',
    order: 4
  },
];