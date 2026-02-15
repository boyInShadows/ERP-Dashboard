export type ReservationListItem = {
    id: string | number;
    date?: string;
    time?: string;
    datetime?: string;
    customer_name?: string;
    customer_phone?: string;
    department?: string;
    doctor?: string;
    status?: string;
  };
  
  export type ReservationDetail = ReservationListItem & {
    special_requests?: string;
    notes?: string;
    call_sid?: string;
  };
  
  export type CallLogListItem = {
    callSid: string;
    created_at?: string;
    outcome?: string;
    intent?: string;
    mood?: string;
    duration_seconds?: number;
  };
  
  export type CallLogDetail = CallLogListItem & {
    transcript?: string;
    conversation?: any;
    tool_calls?: any[];
    errors?: any[];
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
  