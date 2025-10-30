import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { Employee } from '../../types/Employee';
import { useEmployee } from '../../hooks/useEmployee';
import { toast } from 'react-toastify';

interface Props {
  open: boolean;
  onClose: () => void;
  employee: Employee;
}

const UpdateEmployeeModal: React.FC<Props> = ({ open, onClose, employee }) => {
  const { updateEmployee } = useEmployee();
  const [formData, setFormData] = React.useState({
    name: employee.name,
    phoneNumber: employee.phoneNumber,
    emailId: employee.emailId,
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

    if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    updateEmployee(formData, employee.id);
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
      <DialogTitle>Update {employee.position}</DialogTitle>
      <hr className='text-white' />
      <DialogContent className="flex flex-col gap-3 ">
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
        <TextField
          label="Email ID"
          value={formData.emailId}
          onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateEmployeeModal;