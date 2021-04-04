import { Client } from './client';

export interface DeliveryCreateRequest {
  client: Client;
  observation: string;
  numberOfAttachments: number;
}