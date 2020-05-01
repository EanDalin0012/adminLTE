import { commonClass } from './class-commondto';

export interface Company extends commonClass {
    id: number;
    name: string;
    contact: string;
    email: string;
    address: string;
    description: string;
}
