export interface MockLocation {
  placeId: string;
  addressName: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export const mockLocations: MockLocation[] = [
  {
    placeId: 'mock_takoradi_ssnit',
    addressName: 'Takoradi SSNIT',
    formattedAddress: 'Takoradi SSNIT, Takoradi, Western Region, Ghana',
    latitude: 4.8967,
    longitude: -1.7581,
    city: 'Takoradi',
    state: 'Western Region',
    country: 'Ghana',
  },
  {
    placeId: 'mock_accra_circle',
    addressName: 'Circle, Accra',
    formattedAddress: 'Circle, Accra, Greater Accra Region, Ghana',
    latitude: 5.5600,
    longitude: -0.2057,
    city: 'Accra',
    state: 'Greater Accra Region',
    country: 'Ghana',
  },
  {
    placeId: 'mock_kumasi_kejetia',
    addressName: 'Kejetia Market, Kumasi',
    formattedAddress: 'Kejetia Market, Kumasi, Ashanti Region, Ghana',
    latitude: 6.6885,
    longitude: -1.6244,
    city: 'Kumasi',
    state: 'Ashanti Region',
    country: 'Ghana',
  },
  {
    placeId: 'mock_tema_community_1',
    addressName: 'Community 1, Tema',
    formattedAddress: 'Community 1, Tema, Greater Accra Region, Ghana',
    latitude: 5.6698,
    longitude: -0.0166,
    city: 'Tema',
    state: 'Greater Accra Region',
    country: 'Ghana',
  },
  {
    placeId: 'mock_cape_coast_university',
    addressName: 'University of Cape Coast',
    formattedAddress: 'University of Cape Coast, Cape Coast, Central Region, Ghana',
    latitude: 5.1056,
    longitude: -1.2927,
    city: 'Cape Coast',
    state: 'Central Region',
    country: 'Ghana',
  },
  {
    placeId: 'mock_tamale_central',
    addressName: 'Tamale Central Market',
    formattedAddress: 'Central Market, Tamale, Northern Region, Ghana',
    latitude: 9.4034,
    longitude: -0.8424,
    city: 'Tamale',
    state: 'Northern Region',
    country: 'Ghana',
  },
  {
    placeId: 'mock_ho_volta',
    addressName: 'Ho Municipal Assembly',
    formattedAddress: 'Ho Municipal Assembly, Ho, Volta Region, Ghana',
    latitude: 6.6110,
    longitude: 0.4720,
    city: 'Ho',
    state: 'Volta Region',
    country: 'Ghana',
  },
  {
    placeId: 'mock_sunyani_bono',
    addressName: 'Sunyani Central',
    formattedAddress: 'Sunyani Central, Sunyani, Bono Region, Ghana',
    latitude: 7.3392,
    longitude: -2.3265,
    city: 'Sunyani',
    state: 'Bono Region',
    country: 'Ghana',
  },
];

// Mock function to simulate location search
export function searchMockLocations(query: string): MockLocation[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase();
  return mockLocations.filter(location => 
    location.addressName.toLowerCase().includes(normalizedQuery) ||
    location.city.toLowerCase().includes(normalizedQuery) ||
    location.state.toLowerCase().includes(normalizedQuery) ||
    location.formattedAddress.toLowerCase().includes(normalizedQuery)
  ).slice(0, 5); // Return max 5 results
}

// Mock function to get current location
export function getMockCurrentLocation(): MockLocation {
  return {
    placeId: 'mock_current_location',
    addressName: 'Current Location',
    formattedAddress: 'Takoradi, Western Region, Ghana',
    latitude: 4.8967,
    longitude: -1.7581,
    city: 'Takoradi',
    state: 'Western Region',
    country: 'Ghana',
  };
}
