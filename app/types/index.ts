// ─── Car & Listing Types ────────────────────────────────────────────────────

export interface CarSpec {
  topSpeed: string;
  engine: string;
  acceleration: string;
  horsepower: string;
  seats: number;
  color: string;
  transmission: string;
  fuelType: string;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  brandLogo: string;
  model: string;
  year: number;
  category: CarCategory;
  images: string[];
  pricePerDay: number;
  pricePerHour?: number;
  pricePerMonth?: number;
  specs: CarSpec;
  noDeposit: boolean;
  mileagePerDay: number;
  minAge: number;
  securityDeposit: boolean;
  fuelPolicy: string;
  insurance: string;
  languages: string[];
  payments: string[];
  documents: string[];
  rating?: number;
  reviewCount?: number;
}

export type CarCategory =
  | 'super'
  | 'luxury'
  | 'suv'
  | 'convertible'
  | 'driver-service'
  | 'economy';

// ─── Booking Types ───────────────────────────────────────────────────────────

export type RentalMode = 'daily' | 'monthly' | 'hourly';

export interface BookingDetails {
  carId: string;
  pickupDate: Date | null;
  dropoffDate?: Date | null;
  rentalMode: RentalMode;
  months?: number;
  hours?: number;
  phone: string;
  countryCode: string;
  fullName: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  car: Car;
  details: BookingDetails;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

// ─── Search / Filter Types ───────────────────────────────────────────────────

export interface SearchFilters {
  brand: string;
  model: string;
  dateTime: string;
  category?: CarCategory;
  minPrice?: number;
  maxPrice?: number;
  noDeposit?: boolean;
  unlimitedMileage?: boolean;
}

// ─── Navigation Types ────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
