/**
 * Rally needs to implement an API endpoint for managing event RSVPs with capacity limits.
 * 
 * Requirements:
 * 1. Create a POST endpoint /api/events/:eventId/rsvp
 * 2. Handle waitlist logic when event is at capacity
 * 3. Implement rate limiting per user (max 3 RSVPs per minute)
 * 4. Ensure idempotency - multiple identical requests should not create duplicate RSVPs
 * 
 * The endpoint should:
 * - Accept user information and validate it
 * - Check event capacity and availability
 * - Place users on waitlist if event is full
 * - Send appropriate response codes and messages
 * - Handle concurrent requests safely
 */

// Starter interfaces
interface Event {
  id: string;
  name: string;
  capacity: number;
  currentAttendees: number;
  date: Date;
  waitlistEnabled: boolean;
}

interface RsvpRequest {
  userId: string;
  email: string;
  name: string;
  eventId: string;
  sessionToken: string; // For idempotency
}

interface RsvpResponse {
  success: boolean;
  status: 'confirmed' | 'waitlisted' | 'rejected';
  position?: number; // Position in waitlist if applicable
  message: string;
  rsvpId?: string;
}

// Implement the following:

class RsvpService {
  constructor(
    private eventRepository: EventRepository,
    private rsvpRepository: RsvpRepository,
    private rateLimiter: RateLimiter
  ) {}

  async createRsvp(request: RsvpRequest): Promise<RsvpResponse> {
    // TODO: Implement the RSVP logic
    // Consider: validation, rate limiting, capacity checking, 
    // idempotency, waitlist logic, error handling
  }
}

// Follow-up questions:
// 1. How would you handle database transactions to prevent race conditions?
// 2. How would you implement the rate limiter?
// 3. What caching strategy would you use for frequently accessed events?
// 4. How would you handle automatic promotion from waitlist when someone cancels?