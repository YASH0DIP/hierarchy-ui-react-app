import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type { Employee } from '../../types/Employee';
import { useEmployee } from '../../hooks/useEmployee';
import { getTeamsByDepartment, getTeamSize } from '../../utils/employeeHelpers';

interface Props {
  open: boolean;
  onClose: () => void;
  employee: Employee;
  currentTeamId: string;
}

const MoveEmployeeModal: React.FC<Props> = ({ open, onClose, employee, currentTeamId }) => {
  const { employees, moveEmployee } = useEmployee();
  const [targetTeam, setTargetTeam] = React.useState('');

  const currentTeamSize = getTeamSize(employees, currentTeamId);

  if (currentTeamSize <= 2) {
    onClose();
    return null;
  }

  const teams = getTeamsByDepartment(employees, employee.department)
    .filter(team => team.id !== currentTeamId);

  const handleMove = () => {
    if (!targetTeam) return;
    moveEmployee(employee.id, targetTeam);
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
      <DialogTitle>Move Employee</DialogTitle>
      <hr className='text-white' />
      <DialogContent sx={{
        width: '100%',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <FormControl fullWidth>
          <InputLabel>Select Team</InputLabel>
          <Select
            value={targetTeam}
            label="Select Team"
            onChange={(e) => setTargetTeam(e.target.value)}
          >
            {teams.map(team => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleMove}
          variant="contained"
          color="primary"
          disabled={!targetTeam}
        >
          Move
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveEmployeeModal;