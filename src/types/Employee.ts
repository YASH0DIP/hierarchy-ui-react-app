export type Employee = {
    id: string;
    name: string;
    position: string;
    phoneNumber: string;
    emailId: string;
    department: string;
    teamId?: string; 
    children?: Employee[];
};
