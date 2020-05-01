import { commonClass } from './class-commondto';
import { SERVICE_STATUS_CODE } from '../constants/common.const';

export class SupplyingDetails extends commonClass {
  id: number;
  supplierName: string;
  productName: string;
  quantity: number;
  orderedAt: string;
  arrivesAt: string;
  arrived: string;
  description: string;
}
