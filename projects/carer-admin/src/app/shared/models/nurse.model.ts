export interface Nurse {
    name?: string;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    post_code?: string;
    phone?: string;
    dob?: string[];
    band?: string;
    registration?: { something: string, date: string[]};
    start_date?: string[];
    probation_end?: string[];
    available?: {[key: string]: string};
}
