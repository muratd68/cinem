export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  halls: number;
  features: string[];
  phone: string;
}

export const cinemas: Cinema[] = [
  {
    id: '1',
    name: 'CineMAX Kadıköy',
    address: 'Caferağa Mah. Moda Cad. No:42',
    city: 'İstanbul',
    lat: 40.9833,
    lng: 29.0333,
    halls: 8,
    features: ['IMAX', 'Dolby Atmos', '4DX'],
    phone: '+90 216 123 45 67',
  },
  {
    id: '2',
    name: 'CineMAX Levent',
    address: 'Levent Mah. Büyükdere Cad. No:185',
    city: 'İstanbul',
    lat: 41.0797,
    lng: 29.0103,
    halls: 12,
    features: ['IMAX', 'Dolby Atmos', 'VIP Salon'],
    phone: '+90 212 234 56 78',
  },
  {
    id: '3',
    name: 'CineMAX Ankara',
    address: 'Kızılay Mah. Atatürk Bulvarı No:100',
    city: 'Ankara',
    lat: 39.9208,
    lng: 32.8541,
    halls: 10,
    features: ['IMAX', 'Dolby Atmos'],
    phone: '+90 312 345 67 89',
  },
  {
    id: '4',
    name: 'CineMAX İzmir',
    address: 'Alsancak Mah. Kordon Cad. No:55',
    city: 'İzmir',
    lat: 38.4237,
    lng: 27.1428,
    halls: 6,
    features: ['Dolby Atmos', '3D'],
    phone: '+90 232 456 78 90',
  },
  {
    id: '5',
    name: 'CineMAX Antalya',
    address: 'Lara Mah. Güllük Cad. No:88',
    city: 'Antalya',
    lat: 36.8969,
    lng: 30.7133,
    halls: 8,
    features: ['IMAX', '4DX'],
    phone: '+90 242 567 89 01',
  },
  {
    id: '6',
    name: 'CineMAX Bursa',
    address: 'Nilüfer Mah. Özlüce Cad. No:30',
    city: 'Bursa',
    lat: 40.2177,
    lng: 28.9554,
    halls: 7,
    features: ['Dolby Atmos', '3D'],
    phone: '+90 224 678 90 12',
  },
];
