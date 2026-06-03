/**
 * Types for the prestigious Dr. Sherif Hussein Cardiology Clinic Platform
 */

export interface Service {
  id: string;
  title: string;
  category: 'diagnostic' | 'interventional' | 'valves' | 'pacemaker';
  description: string;
  details: string[];
  icon: string;
}

export interface Achievement {
  id: string;
  value: string;
  numericValue: number;
  label: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  relation: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Appointment {
  fullName: string;
  phone: string;
  serviceId: string;
  appointmentDay: string;
  appointmentTime: string;
  symptoms: string[];
  notes: string;
}
