export type ReservationListItem = {
  id: string | number;
  date?: string;
  time?: string;
  datetime?: string;
  customer_name?: string;
  customer_phone?: string;
  status?: "scheduled" | "canceled" | "completed" | "no_show" | string;
  department?: string;
  provider?: string;
  // Backward compatibility with existing page field naming.
  doctor?: string;
  reason?: string;
  created_via?: "ai" | "staff" | string;
  timezone?: string;
  callSid?: string;
  // Backward compatibility with existing backend naming.
  call_sid?: string;
};

export type ReservationDetail = ReservationListItem & {
  special_requests?: string;
  notes?: string;
};

export type CallLogListItem = {
  callSid: string;
  created_at?: string;
  outcome?: "booked" | "transferred" | "faq_only" | "failed" | string;
  intent?: string;
  problem?: string;
  mood?: "calm" | "neutral" | "angry" | string;
  duration_seconds?: number;
  transfer_department?: string;
};

export type ToolCallEvent = {
  name: string;
  at: string;
  status: "ok" | "error" | string;
  args?: Record<string, unknown>;
  result?: Record<string, unknown>;
};

export type CallLogDetail = CallLogListItem & {
  transcript?: string;
  conversation?: Record<string, unknown>;
  tool_calls?: ToolCallEvent[];
  errors?: Record<string, unknown>[];
};

export type AnalyticsOverview = {
  total_calls?: number;
  total_reservations?: number;
  transfers?: number;
  failures?: number;
};

export type FaqItem = {
  id: string | number;
  question: string;
  answer: string;
  category?: string;
  active?: boolean;
};
  
