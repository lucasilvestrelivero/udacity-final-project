import { Client } from './client.model';

export class RegisterDelivery {
  deliveryId: string;
  client: Client;
  observation: string;
  attachments: string[];
  createdAt: string;
}
