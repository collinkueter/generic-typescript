import { FastifyPluginAsync } from 'fastify';
import { ApiResponse, RsvpRequest, RsvpResponse } from '../types/api';

const eventsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/events', async (request, reply) => {
    const response: ApiResponse = {
      success: true,
      data: [],
      message: 'Events retrieved successfully'
    };
    return response;
  });

  fastify.get('/events/:eventId', async (request, reply) => {
    const { eventId } = request.params as { eventId: string };
    
    const response: ApiResponse = {
      success: true,
      data: { id: eventId, name: 'Sample Event' },
      message: 'Event retrieved successfully'
    };
    return response;
  });

  fastify.post('/events/:eventId/rsvp', async (request, reply) => {
    const { eventId } = request.params as { eventId: string };
    const rsvpRequest = request.body as RsvpRequest;

    // Placeholder logic for RSVP processing
    const rsvpResponse: RsvpResponse = {
      success: true,
      status: 'confirmed',
      message: `RSVP confirmed for event ${eventId}`,
      rsvpId: 'rsvp123'
    };

    const response: ApiResponse<RsvpResponse> = {
      success: true,
      data: rsvpResponse,
      message: 'RSVP processed successfully'
    };

    return response;
  });
};

export default eventsRoutes;