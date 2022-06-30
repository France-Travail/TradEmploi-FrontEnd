import { Role } from './role';
import { Language } from './language';

export interface User {
  id: string;
  firstname: string;
  lastname?: string;
  email: string;
  idDGASI?: string;
  agency?: string;
  language?: Language;
  roomId: string;
  role: Role;
  connectionTime: number;
  isMultiDevices: boolean;
}
