export interface Doctor {
    id: string;
    name: string;
    name_initials: string;
    photo: string;
    doctor_introduction: string;
    specialities: Specialty[];
    fees: string;
    experience: string;
    languages: string[];
    clinic: Clinic;
    video_consult: boolean;
    in_clinic: boolean;
  }
  
  export interface Specialty {
    name: string;
  }
  
  export interface Clinic {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  }
  
  export interface FilterState {
    search: string;
    consultationType: 'video_consult' | 'in_clinic' | null;
    specialties: string[];
    sortBy: 'fees' | 'experience' | null;
  }