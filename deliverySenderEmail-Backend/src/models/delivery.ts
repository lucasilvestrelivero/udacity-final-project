import { Client } from './client';

export interface Delivery {
    deliveryId: string;
    createdAt: string;
    client: Client;
    attachments: string[];
    observation: string;
}