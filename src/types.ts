export type Photo={id:string;url:string;staged?:boolean};
export type UserRole = 'student' | 'owner' | 'admin';
export type User = { id: string; name: string; email: string; role: UserRole };
export type ListingStatus = 'pending' | 'published' | 'paused' | 'rejected';
export type Listing = {
  id: string; title: string; city: string; district: string; address: string;
  price: number; capacity: number; gender: 'any' | 'male' | 'female';
  description: string; image: string; status: ListingStatus;
  photos:Photo[]; amenities:string[]; kind:string; rules:string; deposit:number; universityId?:string|null; views:number;
  ownerName?: string; createdAt: string; isDemo: boolean;
};
export type University = { id: string; name: string };
export type CampusDorm = { id: string; universityId: string; universityName: string; name: string; address: string; beds: number; occupied: number; isDemo: boolean };
export type ApiError = { error: string };
