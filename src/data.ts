import type { Employee } from './types/Employee';

export const EmployeesData: Employee = {
  name: "Michael Roberts",
  id: "CEO001",
  phoneNumber: "9876543210",
  emailId: "michael.roberts@company.com",
  position: "CEO",
  department: "Executive",
  children: [
    {
      name: "Sarah Johnson",
      id: "HR001",
      phoneNumber: "8765432109",
      emailId: "sarah.johnson@company.com",
      position: "Head of Human Resources",
      department: "HR",
      children: [
        {
          name: "HR Team Alpha",
          id: "HRT1",
          department: "HR",
          position: "Team",
          emailId: "",
          phoneNumber: "",
          children: [
            {
              name: "Olivia Carter",
              id: "HRT1L001",
              phoneNumber: "7654321098",
              emailId: "olivia.carter@company.com",
              position: "Team Leader",
              department: "HR",
              teamId: "HRT1"
            },
            {
              name: "Ethan Hughes",
              id: "HRT1M001",
              phoneNumber: "7543210987",
              emailId: "ethan.hughes@company.com",
              position: "Team Member",
              department: "HR",
              teamId: "HRT1"
            }
          ]
        },
        {
          name: "HR Team Beta",
          id: "HRT2",
          department: "HR",
          position: "Team",
          emailId: "",
          phoneNumber: "",
          children: [
            {
              name: "Sophia Martinez",
              id: "HRT2L001",
              phoneNumber: "7432109876",
              emailId: "sophia.martinez@company.com",
              position: "Team Leader",
              department: "HR",
              teamId: "HRT2"
            },
            {
              name: "Noah Patel",
              id: "HRT2M001",
              phoneNumber: "7321098765",
              emailId: "noah.patel@company.com",
              position: "Team Member",
              department: "HR",
              teamId: "HRT2"
            }
          ]
        }
      ]
    },
    {
      name: "David Anderson",
      id: "ENG001",
      phoneNumber: "8210987654",
      emailId: "david.anderson@company.com",
      position: "Head of Engineering",
      department: "Engineering",
      children: [
        {
          name: "Engineering Team Orion",
          id: "ENGT1",
          department: "Engineering",
          position: "Team",
          emailId: "",
          phoneNumber: "",
          children: [
            {
              name: "Isabella Thomas",
              id: "ENG_T1_L001",
              phoneNumber: "8109876543",
              emailId: "isabella.thomas@company.com",
              position: "Team Leader",
              department: "Engineering",
              teamId: "ENGT1"
            },
            {
              name: "Liam Walker",
              id: "ENGT1M001",
              phoneNumber: "8098765432",
              emailId: "liam.walker@company.com",
              position: "Team Member",
              department: "Engineering",
              teamId: "ENGT1"
            }
          ]
        }
      ]
    },
    {
      name: "Emily Davis",
      id: "DES001",
      phoneNumber: "9988776655",
      emailId: "emily.davis@company.com",
      position: "Head of Design",
      department: "Design",
      children: [
        {
          name: "Design Team Nova",
          id: "DEST1",
          department: "Design",
          position: "Team",
          emailId: "",
          phoneNumber: "",
          children: [
            {
              name: "Ava Parker",
              id: "DEST1L001",
              phoneNumber: "9877665544",
              emailId: "ava.parker@company.com",
              position: "Team Leader",
              department: "Design",
              teamId: "DEST1"
            },
            {
              name: "Lucas Evans",
              id: "DEST1M001",
              phoneNumber: "9766554433",
              emailId: "lucas.evans@company.com",
              position: "Team Member",
              department: "Design",
              teamId: "DEST1"
            }
          ]
        }
      ]
    }
  ]
};