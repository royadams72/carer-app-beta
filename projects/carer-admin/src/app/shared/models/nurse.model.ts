export interface NurseClients {
    client_ids?: string[];
    client_types?: string[];
    current_amount_of_clients?: number;
    max_clients?: number;
    visit_notes?: string[];
}
export interface NurseAppraisal {
    next_appraisal?: string;
    nurse_appraisals?: Array<{
        appraisals_date?: string;
        notes?: string;
    }>;
}

export interface Schedule {
    calendar: string;
    id: string;
    description: string;
    end: string;
    location?: string;
    recurrenceRule: string;
    recurrenceException?: string;
    start: string;
    subject?: string;
}
export interface ScheduleData {
        appointment: Schedule;
        originalData: Schedule;
}
export interface Nurse {
    id?: string;
    address_line1?: string;
    appraisals?: NurseAppraisal;
    address_line2?: string;
    band?: string;
    city?: string;
    clients?: NurseClients;
    dbs?: string;
    distance_willing_to_work?: string;
    delete_date?: string[];
    dob?: string;
    first_name?: string;
    last_name?: string;
    post_code?: string;
    phone?: string;
    probation_end?: string;
    registration?: { something?: string, date?: string};
    schedule?: any;
    skills?: string[];
    start_date?: string;
    training_review_date?: string;
    willing_to_work: number;
}

