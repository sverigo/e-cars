import { NewsDetails } from './news-details.model';
import { NewsComment } from './news-comment.model';

export class News {
  id: string;
  title: string;
  description: string;
  photo: string;
  details: NewsDetails;
  comments: NewsComment[];
}
