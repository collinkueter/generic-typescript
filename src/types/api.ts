export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Event {
  id: string;
  name: string;
  capacity: number;
  currentAttendees: number;
  date: Date;
  waitlistEnabled: boolean;
}

export interface RsvpRequest {
  userId: string;
  email: string;
  name: string;
  eventId: string;
  sessionToken: string;
}

export interface RsvpResponse {
  success: boolean;
  status: 'confirmed' | 'waitlisted' | 'rejected';
  position?: number;
  message: string;
  rsvpId?: string;
}