export default {
  type: "object",
  properties: {
    deliveryId: {type: 'string'},
    attachments:{type: 'array'},
  },
  required: ['deliveryId', 'attachments']
} as const;
