export interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  zoomLink: string;
  registrationOpen: boolean;
  maxParticipants: number;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'free' | 'premium';
  blobKey?: string;
  active: boolean;
  stripePriceId?: string;
  nextStart?: string;
}


export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  status: 'active' | 'coming_soon' | 'closed';
  systemeioUrl?: string;
  stripePriceId?: string;
  features: string[];
}

export interface Subscriber {
  id: string;
  email: string;
  firstName?: string;
  tags: string[];
  createdAt: string;
}

export interface AdminSession {
  valid: boolean;
}

export interface NewsletterSubscribePayload {
  email: string;
  source?: string;
}

export interface WebinarRegisterPayload {
  email: string;
  firstName: string;
  webinarId: string;
}

export interface FreebieClaimPayload {
  email: string;
  productId: string;
}

export interface CheckoutParams {
  priceId: string;
  productType: 'course' | 'subscription' | 'digital' | 'mentoring';
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface CalBookingPayload {
  triggerEvent: string;
  payload: {
    uid: string;
    attendees: Array<{ email: string; name: string }>;
    eventType: { title: string };
    startTime: string;
  };
}
