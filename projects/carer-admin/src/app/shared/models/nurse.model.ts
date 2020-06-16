export interface NurseClients {
    client_types?: string[];
    client_ids?: string[];
    visits?: string[];
    max_clients?: number;
    current_amount_of_clients?: number;
    available_days?: string[];
    holiday?: string[];
}
export interface NurseAppraisal {
    next_appraisal?: string;
    nurse_appraisals?: Array<{
        appraisals_date?: string;
        notes?: string;
    }>;
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
    skills?: string[];
    start_date?: string;
    training_review_date?: string;
    willing_to_work: number;
}

