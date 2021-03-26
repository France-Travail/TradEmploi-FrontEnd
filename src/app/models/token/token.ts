import { Moment } from 'moment';
export interface Token {
    token:string
    expireTime:Moment
    email?:string
}