import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { ApiResponse, RsvpRequest, RsvpResponse } from './types/api';

const app: Application = express();
const PORT = 3001;

// Middleware
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    data: { status: 'ok', timestamp: new Date().toISOString() },
    message: 'Health check successful'
  };
  res.json(response);
});

// Events routes
app.get('/api/events', (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    data: [],
    message: 'Events retrieved successfully'
  };
  res.json(response);
});

app.get('/api/events/:eventId', (req: Request, res: Response) => {
  const { eventId } = req.params;
  
  const response: ApiResponse = {
    success: true,
    data: { id: eventId, name: 'Sample Event' },
    message: 'Event retrieved successfully'
  };
  res.json(response);
});

app.post('/api/events/:eventId/rsvp', (req: Request, res: Response) => {
  const { eventId } = req.params;
  const rsvpRequest: RsvpRequest = req.body;

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

  res.json(response);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  const response: ApiResponse = {
    success: false,
    error: 'Internal server error'
  };
  res.status(500).json(response);
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: false,
    error: 'Route not found'
  };
  res.status(404).json(response);
});

const start = (): void => {
  try {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Express server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

export { app, start };