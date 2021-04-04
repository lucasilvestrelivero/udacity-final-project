import { Client } from './client.model';

export class RegisterDeliveryCreate {
  client: Client;
  observation: string;
  numberOfAttachments: number;
}
