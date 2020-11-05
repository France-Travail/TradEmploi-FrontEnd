import { Device } from '../device';
import { Role } from '../role';

export interface Member {
    id: string;
    firstname: string;
    role: Role;
    device: Device;
}
