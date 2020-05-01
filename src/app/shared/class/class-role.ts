import { commonClass } from './class-commondto';
import { Gender } from '../constants/common.const';

export class Role extends commonClass {
  id: number;
  roleName: string;
  description: string;
}
