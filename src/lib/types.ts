
export type GuestStatus = 'Regular' | 'VIP' | 'Corporate' | 'Blacklisted';
export type RoomStatus = 'Vacant' | 'Occupied' | 'Dirty' | 'Clean' | 'Maintenance';
export type ReservationStatus = 'Confirmed' | 'Checked-in' | 'Checked-out' | 'Cancelled' | 'No-show';
export type RoomType = 'Single' | 'Double' | 'Suite' | 'Deluxe' | 'Presidential';
export type PaymentStatus = 'Pending' | 'Paid' | 'Partial' | 'Refunded';

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: GuestStatus;
  loyaltyPoints: number;
  dateCreated: string;
  lastStay?: string;
  totalStays: number;
  preferences?: {
    roomType?: RoomType;
    floor?: number;
    extras?: string[];
  };
  notes?: string;
}

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  floor: number;
  capacity: number;
  price: number;
  amenities: string[];
  lastCleaned?: string;
}

export interface Reservation {
  id: string;
  guestId: string;
  guestName: string;
  roomId?: string;
  roomNumber?: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  adults: number;
  children: number;
  specialRequests?: string;
  dateCreated: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  type: 'Guest Request' | 'Maintenance' | 'Staff Note' | 'Incident' | 'Preference';
  linkedTo?: {
    type: 'Guest' | 'Reservation' | 'Room';
    id: string;
  };
}

export interface Activity {
  id: string;
  type: 'Check-in' | 'Check-out' | 'Reservation' | 'Cancellation' | 'Request' | 'Note' | 'Maintenance';
  description: string;
  timestamp: string;
  guestId?: string;
  guestName?: string;
  reservationId?: string;
  roomId?: string;
  roomNumber?: string;
}
