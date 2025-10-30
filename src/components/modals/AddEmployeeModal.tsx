import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useEmployee } from '../../hooks/useEmployee';
import type { Employee } from '../../types/Employee';
import { toast } from 'react-toastify';

interface Props {
  open: boolean;
  onClose: () => void;
  parentId: string;
  department: string;
}

const AddEmployeeModal: React.FC<Props> = ({ open, onClose, parentId, department }) => {
  const { addEmployee } = useEmployee();
  const [formData, setFormData] = React.useState({
    name: '',
    phoneNumber: '',
    emailId: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.phoneNumber || !formData.emailId) {
      toast.error("All fields are required");
      return;
    }

    if(formData.name.length < 3) { 
      toast.error("Name should be at least 3 characters long");
      return;
    }

    if(!/\S+@\S+\.\S+/.test(formData.emailId)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if(formData.phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const newEmployee: Omit<Employee, 'id'> = {
      ...formData,
      position: 'Team Member',
      department,
      teamId: parentId,
    };
    
    addEmployee(newEmployee, parentId);
    onClose();
  };

  return (
    <Dialog
          open={open}
          onClose={onClose}
          maxWidth={false}
          PaperProps={{
            sx: {
              width: { xs: "90%", sm: "80%", md: "600px", lg: "700px" },
              borderRadius: 3,
              p: 1,
            },
          }}
        >
      <DialogTitle>Add New Employee</DialogTitle>
      <hr className='text-white' />
      <DialogContent className="flex flex-col gap-3">
        <TextField
          label="Name"
          value={formData.name}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Phone Number"
          value={formData.phoneNumber}
          required
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
        <TextField
          label="Email ID"
          value={formData.emailId}
          required
          type='email'
          onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!formData.name || !formData.phoneNumber || !formData.emailId} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;