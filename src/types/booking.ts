export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  isBooked: boolean;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  service?: string;
}

export interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
}