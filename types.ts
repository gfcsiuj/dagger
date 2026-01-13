import { LucideIcon } from 'lucide-react';

export interface NavLink {
  name: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Stat {
  label: string;
  value: string;
}
