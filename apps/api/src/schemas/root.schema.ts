export const responseSchema = {
  description: 'Root route',
  summary: 'Root route',
  response: {
    200: {
      type: 'object',
      properties: {
        ok: { type: 'boolean' },
        timestamp: { type: 'string', format: 'date-time' },
      },
    },
  },
};
