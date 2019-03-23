import { Time } from '@angular/common';

export class NewsComment {
  id?: string;
  name: string;
  userId: string;
  text: string;
  parentId: string;
  timeStamp: number;
  tittle?: string;
}
