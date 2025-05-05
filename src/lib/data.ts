
import { Guest, Room, Reservation, Note, Activity, ReservationStatus, RoomStatus } from './types';

// Generate mock guests
export const guests: Guest[] = [
  {
    id: 'g1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    status: 'VIP',
    loyaltyPoints: 1200,
    dateCreated: '2023-01-15',
    lastStay: '2024-04-20',
    totalStays: 8,
    preferences: {
      roomType: 'Suite',
      floor: 4,
      extras: ['Extra Pillows', 'Morning Newspaper']
    },
    notes: 'Prefers quiet rooms away from elevator'
  },
  {
    id: 'g2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    status: 'Regular',
    loyaltyPoints: 450,
    dateCreated: '2023-03-10',
    lastStay: '2024-04-15',
    totalStays: 3,
    preferences: {
      roomType: 'Double',
      floor: 2
    }
  },
  {
    id: 'g3',
    name: 'Robert Chen',
    email: 'robert.chen@acme.com',
    phone: '+1 (555) 345-6789',
    status: 'Corporate',
    loyaltyPoints: 850,
    dateCreated: '2023-02-05',
    lastStay: '2024-04-10',
    totalStays: 5,
    preferences: {
      roomType: 'Deluxe',
      extras: ['Late Checkout', 'Fruit Basket']
    },
    notes: 'ACME Corporation - bill to company directly'
  },
  {
    id: 'g4',
    name: 'Emily Williams',
    email: 'emily.w@example.com',
    phone: '+1 (555) 456-7890',
    status: 'Regular',
    loyaltyPoints: 200,
    dateCreated: '2023-04-20',
    lastStay: '2024-03-28',
    totalStays: 2
  },
  {
    id: 'g5',
    name: 'Michael Rodriguez',
    email: 'mrodriguez@example.com',
    phone: '+1 (555) 567-8901',
    status: 'VIP',
    loyaltyPoints: 1500,
    dateCreated: '2022-12-15',
    lastStay: '2024-04-22',
    totalStays: 12,
    preferences: {
      roomType: 'Presidential',
      floor: 10,
      extras: ['Champagne on Arrival', 'Airport Transfer']
    },
    notes: 'Celebrity - requires extra privacy and security'
  },
  {
    id: 'g6',
    name: 'Lisa Thompson',
    email: 'lisa.t@example.com',
    phone: '+1 (555) 678-9012',
    status: 'Regular',
    loyaltyPoints: 300,
    dateCreated: '2023-05-10',
    totalStays: 1
  },
  {
    id: 'g7',
    name: 'James Wilson',
    email: 'jwilson@example.com',
    phone: '+1 (555) 789-0123',
    status: 'Corporate',
    loyaltyPoints: 600,
    dateCreated: '2023-02-28',
    lastStay: '2024-04-01',
    totalStays: 4,
    preferences: {
      roomType: 'Deluxe',
      floor: 6
    },
    notes: 'Wiltech Industries executive'
  },
  {
    id: 'g8',
    name: 'Sophia Garcia',
    email: 'sophia.g@example.com',
    phone: '+1 (555) 890-1234',
    status: 'Blacklisted',
    loyaltyPoints: 0,
    dateCreated: '2023-01-05',
    lastStay: '2023-06-15',
    totalStays: 2,
    notes: 'Damaged property during last stay'
  },
  {
    id: 'g9',
    name: 'David Kim',
    email: 'dkim@example.com',
    phone: '+1 (555) 901-2345',
    status: 'Regular',
    loyaltyPoints: 350,
    dateCreated: '2023-03-15',
    lastStay: '2024-02-20',
    totalStays: 3
  },
  {
    id: 'g10',
    name: 'Maria Lopez',
    email: 'maria.l@example.com',
    phone: '+1 (555) 012-3456',
    status: 'Regular',
    loyaltyPoints: 150,
    dateCreated: '2023-06-01',
    totalStays: 1
  }
];

// Generate mock rooms
export const rooms: Room[] = [
  {
    id: 'r101',
    number: '101',
    type: 'Single',
    status: 'Vacant',
    floor: 1,
    capacity: 1,
    price: 120,
    amenities: ['Wi-Fi', 'TV', 'Coffee Maker'],
    lastCleaned: '2024-05-05T09:15:00Z'
  },
  {
    id: 'r102',
    number: '102',
    type: 'Double',
    status: 'Occupied',
    floor: 1,
    capacity: 2,
    price: 160,
    amenities: ['Wi-Fi', 'TV', 'Coffee Maker', 'Mini Fridge'],
    lastCleaned: '2024-05-04T09:30:00Z'
  },
  {
    id: 'r103',
    number: '103',
    type: 'Double',
    status: 'Dirty',
    floor: 1,
    capacity: 2,
    price: 160,
    amenities: ['Wi-Fi', 'TV', 'Coffee Maker', 'Mini Fridge'],
    lastCleaned: '2024-05-03T08:45:00Z'
  },
  {
    id: 'r104',
    number: '104',
    type: 'Single',
    status: 'Clean',
    floor: 1,
    capacity: 1,
    price: 120,
    amenities: ['Wi-Fi', 'TV', 'Coffee Maker'],
    lastCleaned: '2024-05-05T10:20:00Z'
  },
  {
    id: 'r201',
    number: '201',
    type: 'Suite',
    status: 'Occupied',
    floor: 2,
    capacity: 2,
    price: 260,
    amenities: ['Wi-Fi', 'TV', 'Kitchenette', 'Balcony', 'Mini Bar'],
    lastCleaned: '2024-05-04T09:15:00Z'
  },
  {
    id: 'r202',
    number: '202',
    type: 'Double',
    status: 'Vacant',
    floor: 2,
    capacity: 2,
    price: 160,
    amenities: ['Wi-Fi', 'TV', 'Coffee Maker', 'Mini Fridge'],
    lastCleaned: '2024-05-05T09:45:00Z'
  },
  {
    id: 'r203',
    number: '203',
    type: 'Double',
    status: 'Occupied',
    floor: 2,
    capacity: 2,
    price: 160,
    amenities: ['Wi-Fi', 'TV', 'Coffee Maker', 'Mini Fridge'],
    lastCleaned: '2024-05-02T09:30:00Z'
  },
  {
    id: 'r204',
    number: '204',
    type: 'Suite',
    status: 'Vacant',
    floor: 2,
    capacity: 3,
    price: 280,
    amenities: ['Wi-Fi', 'TV', 'Kitchenette', 'Balcony', 'Mini Bar'],
    lastCleaned: '2024-05-05T08:30:00Z'
  },
  {
    id: 'r301',
    number: '301',
    type: 'Deluxe',
    status: 'Occupied',
    floor: 3,
    capacity: 2,
    price: 320,
    amenities: ['Wi-Fi', 'TV', 'Kitchenette', 'Balcony', 'Mini Bar', 'Jacuzzi'],
    lastCleaned: '2024-05-03T10:15:00Z'
  },
  {
    id: 'r302',
    number: '302',
    type: 'Deluxe',
    status: 'Vacant',
    floor: 3,
    capacity: 2,
    price: 320,
    amenities: ['Wi-Fi', 'TV', 'Kitchenette', 'Balcony', 'Mini Bar', 'Jacuzzi'],
    lastCleaned: '2024-05-05T09:00:00Z'
  },
  {
    id: 'r303',
    number: '303',
    type: 'Double',
    status: 'Maintenance',
    floor: 3,
    capacity: 2,
    price: 160,
    amenities: ['Wi-Fi', 'TV', 'Coffee Maker', 'Mini Fridge'],
    lastCleaned: '2024-05-01T09:45:00Z'
  },
  {
    id: 'r304',
    number: '304',
    type: 'Double',
    status: 'Vacant',
    floor: 3,
    capacity: 2,
    price: 160,
    amenities: ['Wi-Fi', 'TV', 'Coffee Maker', 'Mini Fridge'],
    lastCleaned: '2024-05-05T10:30:00Z'
  },
  {
    id: 'r401',
    number: '401',
    type: 'Presidential',
    status: 'Vacant',
    floor: 4,
    capacity: 4,
    price: 750,
    amenities: ['Wi-Fi', 'TV', 'Full Kitchen', 'Balcony', 'Bar', 'Jacuzzi', 'Sauna', 'Private Butler'],
    lastCleaned: '2024-05-05T08:00:00Z'
  },
  {
    id: 'r402',
    number: '402',
    type: 'Suite',
    status: 'Occupied',
    floor: 4,
    capacity: 3,
    price: 280,
    amenities: ['Wi-Fi', 'TV', 'Kitchenette', 'Balcony', 'Mini Bar'],
    lastCleaned: '2024-05-02T10:00:00Z'
  },
  {
    id: 'r403',
    number: '403',
    type: 'Suite',
    status: 'Clean',
    floor: 4,
    capacity: 3,
    price: 280,
    amenities: ['Wi-Fi', 'TV', 'Kitchenette', 'Balcony', 'Mini Bar'],
    lastCleaned: '2024-05-05T09:15:00Z'
  },
  {
    id: 'r404',
    number: '404',
    type: 'Deluxe',
    status: 'Occupied',
    floor: 4,
    capacity: 2,
    price: 320,
    amenities: ['Wi-Fi', 'TV', 'Kitchenette', 'Balcony', 'Mini Bar', 'Jacuzzi'],
    lastCleaned: '2024-05-03T09:30:00Z'
  }
];

// Generate mock reservations
export const reservations: Reservation[] = [
  {
    id: 'res001',
    guestId: 'g1',
    guestName: 'John Smith',
    roomId: 'r201',
    roomNumber: '201',
    checkIn: '2024-05-01',
    checkOut: '2024-05-08',
    status: 'Checked-in',
    paymentStatus: 'Paid',
    totalAmount: 1820,
    adults: 1,
    children: 0,
    specialRequests: 'Late checkout requested',
    dateCreated: '2024-04-15'
  },
  {
    id: 'res002',
    guestId: 'g3',
    guestName: 'Robert Chen',
    roomId: 'r301',
    roomNumber: '301',
    checkIn: '2024-05-02',
    checkOut: '2024-05-06',
    status: 'Checked-in',
    paymentStatus: 'Paid',
    totalAmount: 1280,
    adults: 1,
    children: 0,
    specialRequests: 'Corporate rate applied',
    dateCreated: '2024-04-10'
  },
  {
    id: 'res003',
    guestId: 'g2',
    guestName: 'Sarah Johnson',
    roomId: 'r102',
    roomNumber: '102',
    checkIn: '2024-05-03',
    checkOut: '2024-05-07',
    status: 'Checked-in',
    paymentStatus: 'Paid',
    totalAmount: 640,
    adults: 2,
    children: 0,
    dateCreated: '2024-04-20'
  },
  {
    id: 'res004',
    guestId: 'g5',
    guestName: 'Michael Rodriguez',
    roomId: 'r404',
    roomNumber: '404',
    checkIn: '2024-05-04',
    checkOut: '2024-05-10',
    status: 'Checked-in',
    paymentStatus: 'Paid',
    totalAmount: 1920,
    adults: 2,
    children: 0,
    specialRequests: 'VIP treatment, privacy required',
    dateCreated: '2024-04-01'
  },
  {
    id: 'res005',
    guestId: 'g4',
    guestName: 'Emily Williams',
    checkIn: '2024-05-10',
    checkOut: '2024-05-12',
    status: 'Confirmed',
    paymentStatus: 'Pending',
    totalAmount: 320,
    adults: 1,
    children: 0,
    dateCreated: '2024-04-25'
  },
  {
    id: 'res006',
    guestId: 'g7',
    guestName: 'James Wilson',
    checkIn: '2024-05-15',
    checkOut: '2024-05-20',
    status: 'Confirmed',
    paymentStatus: 'Partial',
    totalAmount: 1600,
    adults: 1,
    children: 0,
    specialRequests: 'Corporate rate, needs airport pickup',
    dateCreated: '2024-04-20'
  },
  {
    id: 'res007',
    guestId: 'g9',
    guestName: 'David Kim',
    checkIn: '2024-05-08',
    checkOut: '2024-05-10',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    totalAmount: 320,
    adults: 2,
    children: 0,
    dateCreated: '2024-04-28'
  },
  {
    id: 'res008',
    guestId: 'g10',
    guestName: 'Maria Lopez',
    checkIn: '2024-05-20',
    checkOut: '2024-05-22',
    status: 'Confirmed',
    paymentStatus: 'Pending',
    totalAmount: 240,
    adults: 1,
    children: 0,
    dateCreated: '2024-05-01'
  },
  {
    id: 'res009',
    guestId: 'g6',
    guestName: 'Lisa Thompson',
    checkIn: '2024-04-28',
    checkOut: '2024-05-02',
    status: 'Checked-out',
    paymentStatus: 'Paid',
    totalAmount: 640,
    adults: 2,
    children: 1,
    dateCreated: '2024-04-15'
  },
  {
    id: 'res010',
    guestId: 'g8',
    guestName: 'Sophia Garcia',
    checkIn: '2024-04-30',
    checkOut: '2024-05-02',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    totalAmount: 640,
    adults: 1,
    children: 0,
    dateCreated: '2024-04-10'
  }
];

// Generate mock notes
export const notes: Note[] = [
  {
    id: 'n001',
    title: 'VIP Arrival',
    content: 'Prepare welcome package with champagne and fruit basket. Arrange airport pickup.',
    createdAt: '2024-04-30T14:30:00Z',
    createdBy: 'Front Desk Manager',
    type: 'Guest Request',
    linkedTo: {
      type: 'Guest',
      id: 'g5'
    }
  },
  {
    id: 'n002',
    title: 'Maintenance Required',
    content: 'TV in room 303 not working. Maintenance team to check and repair.',
    createdAt: '2024-05-01T09:15:00Z',
    createdBy: 'Housekeeping',
    type: 'Maintenance',
    linkedTo: {
      type: 'Room',
      id: 'r303'
    }
  },
  {
    id: 'n003',
    title: 'Late Checkout Approved',
    content: 'Guest approved for late checkout (2 PM) on May 8th',
    createdAt: '2024-05-04T10:30:00Z',
    createdBy: 'Front Desk',
    type: 'Staff Note',
    linkedTo: {
      type: 'Reservation',
      id: 'res001'
    }
  },
  {
    id: 'n004',
    title: 'Noise Complaint',
    content: 'Guest in room 203 complained about noise from room 204 at midnight',
    createdAt: '2024-05-03T08:45:00Z',
    createdBy: 'Night Manager',
    type: 'Incident',
    linkedTo: {
      type: 'Room',
      id: 'r203'
    }
  },
  {
    id: 'n005',
    title: 'Dietary Restriction',
    content: 'Guest has severe nut allergy. Alert restaurant staff for all meals.',
    createdAt: '2024-04-15T16:00:00Z',
    createdBy: 'Reservations',
    type: 'Preference',
    linkedTo: {
      type: 'Guest',
      id: 'g4'
    }
  },
  {
    id: 'n006',
    title: 'Extra Towels',
    content: 'Guest requested extra towels to be delivered to room 201',
    createdAt: '2024-05-02T15:20:00Z',
    createdBy: 'Front Desk',
    type: 'Guest Request',
    linkedTo: {
      type: 'Room',
      id: 'r201'
    }
  },
  {
    id: 'n007',
    title: 'AC Issue',
    content: 'Air conditioning in room 404 not cooling properly. Technician scheduled for check.',
    createdAt: '2024-05-04T13:10:00Z',
    createdBy: 'Maintenance',
    type: 'Maintenance',
    linkedTo: {
      type: 'Room',
      id: 'r404'
    }
  },
  {
    id: 'n008',
    title: 'Corporate Rate Approved',
    content: 'Applied special corporate rate for Wiltech Industries executive',
    createdAt: '2024-04-20T11:30:00Z',
    createdBy: 'Sales Manager',
    type: 'Staff Note',
    linkedTo: {
      type: 'Reservation',
      id: 'res006'
    }
  },
  {
    id: 'n009',
    title: 'Package Delivered',
    content: 'FedEx package delivered to guest in room 301',
    createdAt: '2024-05-03T16:45:00Z',
    createdBy: 'Concierge',
    type: 'Staff Note',
    linkedTo: {
      type: 'Room',
      id: 'r301'
    }
  },
  {
    id: 'n010',
    title: 'Property Damage',
    content: 'Broken lamp in room 203. Charge guest $150 for replacement.',
    createdAt: '2024-05-02T09:00:00Z',
    createdBy: 'Housekeeping',
    type: 'Incident',
    linkedTo: {
      type: 'Room',
      id: 'r203'
    }
  }
];

// Generate mock activities
export const activities: Activity[] = [
  {
    id: 'a001',
    type: 'Check-in',
    description: 'Guest checked in',
    timestamp: '2024-05-01T14:00:00Z',
    guestId: 'g1',
    guestName: 'John Smith',
    reservationId: 'res001',
    roomId: 'r201',
    roomNumber: '201'
  },
  {
    id: 'a002',
    type: 'Check-in',
    description: 'Guest checked in',
    timestamp: '2024-05-02T15:30:00Z',
    guestId: 'g3',
    guestName: 'Robert Chen',
    reservationId: 'res002',
    roomId: 'r301',
    roomNumber: '301'
  },
  {
    id: 'a003',
    type: 'Check-in',
    description: 'Guest checked in',
    timestamp: '2024-05-03T13:45:00Z',
    guestId: 'g2',
    guestName: 'Sarah Johnson',
    reservationId: 'res003',
    roomId: 'r102',
    roomNumber: '102'
  },
  {
    id: 'a004',
    type: 'Reservation',
    description: 'New reservation created',
    timestamp: '2024-05-04T10:15:00Z',
    guestId: 'g10',
    guestName: 'Maria Lopez',
    reservationId: 'res008'
  },
  {
    id: 'a005',
    type: 'Maintenance',
    description: 'Maintenance request for room TV',
    timestamp: '2024-05-01T09:15:00Z',
    roomId: 'r303',
    roomNumber: '303'
  },
  {
    id: 'a006',
    type: 'Check-out',
    description: 'Guest checked out',
    timestamp: '2024-05-02T11:00:00Z',
    guestId: 'g6',
    guestName: 'Lisa Thompson',
    reservationId: 'res009',
    roomId: 'r204',
    roomNumber: '204'
  },
  {
    id: 'a007',
    type: 'Request',
    description: 'Extra towels requested',
    timestamp: '2024-05-02T15:20:00Z',
    guestId: 'g1',
    guestName: 'John Smith',
    roomId: 'r201',
    roomNumber: '201'
  },
  {
    id: 'a008',
    type: 'Check-in',
    description: 'Guest checked in',
    timestamp: '2024-05-04T14:30:00Z',
    guestId: 'g5',
    guestName: 'Michael Rodriguez',
    reservationId: 'res004',
    roomId: 'r404',
    roomNumber: '404'
  },
  {
    id: 'a009',
    type: 'Cancellation',
    description: 'Reservation cancelled',
    timestamp: '2024-04-29T16:45:00Z',
    guestId: 'g8',
    guestName: 'Sophia Garcia',
    reservationId: 'res010'
  },
  {
    id: 'a010',
    type: 'Note',
    description: 'Staff note added about late checkout',
    timestamp: '2024-05-04T10:30:00Z',
    guestId: 'g1',
    guestName: 'John Smith',
    reservationId: 'res001'
  },
  {
    id: 'a011',
    type: 'Maintenance',
    description: 'AC repair in room',
    timestamp: '2024-05-04T15:10:00Z',
    roomId: 'r404',
    roomNumber: '404'
  },
  {
    id: 'a012',
    type: 'Request',
    description: 'Room service order placed',
    timestamp: '2024-05-03T19:20:00Z',
    guestId: 'g3',
    guestName: 'Robert Chen',
    roomId: 'r301',
    roomNumber: '301'
  }
];

// Stats helper functions
export const getStats = () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Count check-ins for today
  const checkInsToday = activities.filter(
    a => a.type === 'Check-in' && a.timestamp.startsWith(today)
  ).length;
  
  // Count check-outs for today
  const checkOutsToday = activities.filter(
    a => a.type === 'Check-out' && a.timestamp.startsWith(today)
  ).length;
  
  // Calculate occupancy
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
  
  // Count available rooms
  const availableRooms = rooms.filter(r => r.status === 'Vacant' || r.status === 'Clean').length;
  
  // Count VIP guests currently staying
  const vipGuestsStaying = reservations.filter(r => {
    const guest = guests.find(g => g.id === r.guestId);
    return guest?.status === 'VIP' && r.status === 'Checked-in';
  }).length;
  
  // Count upcoming reservations
  const upcomingReservations = reservations.filter(r => r.status === 'Confirmed').length;
  
  return {
    checkInsToday,
    checkOutsToday,
    occupancyRate,
    availableRooms,
    vipGuestsStaying,
    upcomingReservations,
    totalRooms,
    occupiedRooms
  };
};

// Get occupancy data for chart
export const getOccupancyData = () => {
  // Mock data for the last 7 days
  return [
    { name: 'May 01', occupancy: 65 },
    { name: 'May 02', occupancy: 72 },
    { name: 'May 03', occupancy: 80 },
    { name: 'May 04', occupancy: 85 },
    { name: 'May 05', occupancy: 78 },
    { name: 'May 06', occupancy: 70 },
    { name: 'May 07', occupancy: 76 }
  ];
};

// Get room status counts for chart
export const getRoomStatusData = () => {
  const counts = {
    Vacant: 0,
    Occupied: 0,
    Dirty: 0,
    Clean: 0,
    Maintenance: 0
  };
  
  rooms.forEach(room => {
    counts[room.status]++;
  });
  
  return Object.entries(counts).map(([status, count]) => ({
    name: status,
    value: count
  }));
};

// Get revenue data
export const getRevenueData = () => {
  return [
    { name: 'Apr 28', revenue: 4500 },
    { name: 'Apr 29', revenue: 3800 },
    { name: 'Apr 30', revenue: 4200 },
    { name: 'May 01', revenue: 5100 },
    { name: 'May 02', revenue: 4800 },
    { name: 'May 03', revenue: 5600 },
    { name: 'May 04', revenue: 6200 }
  ];
};
