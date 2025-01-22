export interface ScheduleItem {
  id: string;
  activity: string;
  date: string;
  time: string;
  notes?: string;
}

export interface WellnessCheck {
  id: string;
  sign: string;
  selected: boolean;
}

export interface WellnessReflection {
  action: string;
  importance: string;
  capability: string;
}

export interface AnticipatedEvent {
  id: string;
  event: string;
  action: string;
  importance: string;
  capability: string;
}

