import { Car, CarCategory } from '@/app/types';

// ─── Brand Data ──────────────────────────────────────────────────────────────

export const CAR_BRANDS = [
  { name: 'Porsche',      logo: '/assets/brands/porsche.png',      carCount: 380 },
  { name: 'Audi',         logo: '/assets/brands/audi.png',         carCount: 130 },
  { name: 'Subaru',       logo: '/assets/brands/subaru.png',       carCount: 90  },
  { name: 'Fiat',         logo: '/assets/brands/fiat.png',         carCount: 20  },
  { name: 'Land Rover',   logo: '/assets/brands/land-rover.png',   carCount: 90  },
  { name: 'Brabus',       logo: '/assets/brands/brabus.png',       carCount: 120 },
  { name: 'Mazda',        logo: '/assets/brands/mazda.png',        carCount: 245 },
  { name: 'Ford',         logo: '/assets/brands/ford.png',         carCount: 780 },
  { name: 'Cadillac',     logo: '/assets/brands/cadillac.png',     carCount: 430 },
  { name: 'Toyota Crown', logo: '/assets/brands/toyota-crown.png', carCount: 500 },
  { name: 'KIA',          logo: '/assets/brands/kia.png',          carCount: 720 },
];

// ─── Category Data ───────────────────────────────────────────────────────────

export const CAR_CATEGORIES: {
  id: CarCategory;
  label: string;
  carCount: number;
  fromPrice: number;
  image: string;
  gradient: string;
}[] = [
  { id: 'super',          label: 'SUPER',          carCount: 150, fromPrice: 1200, image: '/assets/categories/super.png',          gradient: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 37%), linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0) 100%)' },
  { id: 'luxury',         label: 'LUXURY',         carCount: 150, fromPrice: 1200, image: '/assets/categories/luxury.png',         gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 34%, rgba(0,0,0,0) 100%)' },
  { id: 'suv',            label: "SUV's",          carCount: 150, fromPrice: 1200, image: '/assets/categories/suv.png',            gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 37%, rgba(0,0,0,0) 100%)' },
  { id: 'convertible',    label: 'CONVERTIBLE',    carCount: 150, fromPrice: 1200, image: '/assets/categories/convertible.png',    gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 37%, rgba(0,0,0,0) 100%)' },
  { id: 'driver-service', label: 'DRIVER SERVICE', carCount: 150, fromPrice: 1200, image: '/assets/categories/driver-service.png', gradient: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 12%, rgba(0,0,0,0) 100%)' },
  { id: 'economy',        label: 'ECONOMY',        carCount: 150, fromPrice: 1200, image: '/assets/categories/economy.png',        gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)' },
];

// ─── Mock Cars Data ──────────────────────────────────────────────────────────
// Car images & brand logos sourced directly from Figma API (node: 8940:52698)

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    slug: 'rolls-royce-cullinan-mansory-2024',
    brand: 'Rolls Royce',
    brandLogo: '/assets/brands/porsche.png', // placeholder until RR node fetched
    model: 'Cullinan Mansory 2024',
    year: 2024,
    category: 'super',
    images: [
      '/assets/cars/ferrari-812-gts.png',
      '/assets/cars/mercedes-sl63-amg.png',
      '/assets/cars/ferrari-purosangue.png',
      '/assets/cars/porsche-gt3-rs.png',
    ],
    pricePerDay: 2000,
    pricePerMonth: 45000,
    specs: {
      topSpeed: '325 km/h',
      engine: '5.2-L V10',
      acceleration: '2.9 sec',
      horsepower: '650 hp',
      seats: 4,
      color: 'Yellow',
      transmission: 'Automatic',
      fuelType: 'Petrol',
    },
    noDeposit: true,
    mileagePerDay: 750,
    minAge: 21,
    securityDeposit: false,
    fuelPolicy: 'Same to Same',
    insurance: 'Basic Comprehensive Insurance',
    languages: ['English', 'Arabic', 'Russian', 'French', 'Italian', 'German'],
    payments: ['Credit Card', 'Bank Card', 'Cash', 'Crypto'],
    documents: ['Driving License', 'Emirates ID or Passport', 'International Driving Permit (IDP)'],
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    slug: 'ferrari-812-gts-2023',
    brand: 'Ferrari',
    brandLogo: '/assets/brands/ferrari.png',
    model: '812 GTS 2023',
    year: 2023,
    category: 'super',
    // Image: Figma node I8940:52742;5385:29819 | imageRef: ee42c8cf...
    images: ['/assets/cars/ferrari-812-gts.png'],
    pricePerDay: 7000,
    specs: {
      topSpeed: '325 km/h',
      engine: 'V12',
      acceleration: '2.9 sec',
      horsepower: '800 hp',
      seats: 2,
      color: 'Red',
      transmission: 'Automatic',
      fuelType: 'Petrol',
    },
    noDeposit: true,
    mileagePerDay: 325,
    minAge: 25,
    securityDeposit: false,
    fuelPolicy: 'Same to Same',
    insurance: 'Basic Comprehensive Insurance',
    languages: ['English', 'Arabic'],
    payments: ['Credit Card', 'Cash'],
    documents: ['Driving License', 'Emirates ID or Passport'],
  },
  {
    id: '3',
    slug: 'mercedes-sl63-amg-2022',
    brand: 'Mercedes',
    brandLogo: '/assets/brands/mercedes.png',
    model: 'SL 63 AMG 2022',
    year: 2022,
    category: 'luxury',
    // Image: Figma node I8940:52743;5385:29819
    images: ['/assets/cars/mercedes-sl63-amg.png'],
    pricePerDay: 1900,
    specs: {
      topSpeed: '250 km/h',
      engine: '4.0L',
      acceleration: '3.5 sec',
      horsepower: '585 hp',
      seats: 4,
      color: 'Black',
      transmission: 'Automatic',
      fuelType: 'Petrol',
    },
    noDeposit: true,
    mileagePerDay: 325,
    minAge: 21,
    securityDeposit: false,
    fuelPolicy: 'Same to Same',
    insurance: 'Basic Comprehensive Insurance',
    languages: ['English', 'Arabic'],
    payments: ['Credit Card', 'Cash'],
    documents: ['Driving License', 'Emirates ID or Passport'],
  },
  {
    id: '4',
    slug: 'ferrari-purosangue-2024',
    brand: 'Ferrari',
    brandLogo: '/assets/brands/ferrari.png',
    model: 'Purosangue 2024',
    year: 2024,
    category: 'super',
    // Image: Figma node I8940:52744;5385:29819
    images: ['/assets/cars/ferrari-purosangue.png'],
    pricePerDay: 6700,
    specs: {
      topSpeed: '310 km/h',
      engine: 'V12',
      acceleration: '3.3 sec',
      horsepower: '640 hp',
      seats: 4,
      color: 'Blue',
      transmission: 'Automatic',
      fuelType: 'Petrol',
    },
    noDeposit: true,
    mileagePerDay: 325,
    minAge: 25,
    securityDeposit: false,
    fuelPolicy: 'Same to Same',
    insurance: 'Basic Comprehensive Insurance',
    languages: ['English', 'Arabic'],
    payments: ['Credit Card', 'Cash'],
    documents: ['Driving License', 'Emirates ID or Passport'],
  },
  {
    id: '5',
    slug: 'porsche-gt3-rs-2024',
    brand: 'Porsche',
    brandLogo: '/assets/brands/porsche.png',
    model: 'GT3 RS 2024',
    year: 2024,
    category: 'super',
    // Image: Figma node I8940:52745;5385:29819
    images: ['/assets/cars/porsche-gt3-rs.png'],
    pricePerDay: 4500,
    specs: {
      topSpeed: '296 km/h',
      engine: '4.0L',
      acceleration: '3.2 sec',
      horsepower: '525 hp',
      seats: 2,
      color: 'Yellow',
      transmission: 'Automatic',
      fuelType: 'Petrol',
    },
    noDeposit: true,
    mileagePerDay: 325,
    minAge: 25,
    securityDeposit: false,
    fuelPolicy: 'Same to Same',
    insurance: 'Basic Comprehensive Insurance',
    languages: ['English', 'Arabic'],
    payments: ['Credit Card', 'Cash'],
    documents: ['Driving License', 'Emirates ID or Passport'],
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  { question: 'Lorem ipsum dolor sit amet consect.', answer: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.' },
  { question: 'Lorem ipsum dolor sit amet consect.', answer: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.' },
  { question: 'Lorem ipsum dolor sit amet consect.', answer: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.' },
  { question: 'Lorem ipsum dolor sit amet consect.', answer: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.' },
  { question: 'Lorem ipsum dolor sit amet consect.', answer: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.' },
  { question: 'Lorem ipsum dolor sit amet consect.', answer: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.' },
];

// ─── Footer Links ─────────────────────────────────────────────────────────────

export const FOOTER_COLUMNS = {
  company: ['About us', 'Our Blogs', 'FAQ', 'Contact', 'Sitemap XML', 'Privacy Policy', 'Terms of Service'],
  renters: ['Create an account', 'Login', 'Help Center'],
  rentalCompanies: ['Join us', 'Login', 'Request a Demo', 'Advantages', 'Pricing & Plans'],
};

export const FOOTER_SEO_LINKS = [
  { heading: 'Rent by type of Car', links: ['Rent a Supercar in Dubai', 'Rent a Luxury Car in Dubai', 'Rent a SUV in Dubai', 'Rent a Sports Car in Dubai', 'Rent a Convertible Car in Dubai', 'Rent an Economy Car in Dubai'] },
  { heading: 'Rent by type of Car', links: ['Rent a Lamborghini in Dubai', 'Rent a Ferrari Car in Dubai', 'Rent a Rolls Royce in Dubai', 'Rent a McLaren Car in Dubai', 'Rent a Aston Martin Car in Dubai', 'Rent a Bentley Car in Dubai'] },
  { heading: 'Rent by type of Car', links: ['Rent a Mercedes in Dubai', 'Rent an Audi Car in Dubai', 'Rent a BMW in Dubai', 'Rent a Range Rover Car in Dubai', 'Rent a Porsche Car in Dubai', 'Rent a Cadillac Car in Dubai'] },
  { heading: 'Rent by type of Car', links: ['Rent a Ford in Dubai', 'Rent a Nissan Car in Dubai', 'Rent a Chevrolet in Dubai', 'Rent a KIA in Dubai', 'Rent an Mini Car in Dubai', 'Rent a Cadillac Car in Dubai'] },
];

// ─── Country Codes ────────────────────────────────────────────────────────────

export const COUNTRY_CODES = [
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+1',   country: 'US',  flag: '🇺🇸' },
  { code: '+44',  country: 'UK',  flag: '🇬🇧' },
  { code: '+91',  country: 'IN',  flag: '🇮🇳' },
  { code: '+966', country: 'SA',  flag: '🇸🇦' },
];
