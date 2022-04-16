import { ImageEntry } from './Image';

export default interface Event {
  key: string;
  Title: string;
  StartDate: string;
  EndDate: string;
  AuthorID: string;
  UsersInvolved: string[];
  EventImages: ImageEntry;
  Description: string;
  isArchived: boolean;
}
