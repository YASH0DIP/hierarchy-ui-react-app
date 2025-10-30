import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    ListSubheader
} from '@mui/material';
import { useEmployee } from '../../hooks/useEmployee';
import { getTeamsWithMoreThan2Members, getTeamsByDepartment } from '../../utils/employeeHelpers';
import type { Employee } from '../../types/Employee';
import { toast } from 'react-toastify'

interface Props {
    open: boolean;
    onClose: () => void;
    departmentHead: Employee;
}

const AddTeamModal: React.FC<Props> = ({ open, onClose, departmentHead }) => {
    const { employees, addTeam } = useEmployee();
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        emailId: '',
    });
    const [selectedLeader, setSelectedLeader] = useState('');

    const eligibleTeams = getTeamsWithMoreThan2Members(employees, departmentHead.department);

    if (eligibleTeams.length === 0) {
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
                <DialogTitle>Cannot Create New Team</DialogTitle>
                <DialogContent>
                    <Typography color="error">
                        No teams in this department have more than 2 members.
                        At least one team needs more than 2 members to select a team leader.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    const handleSubmit = () => {
        if (!formData.name || !formData.phoneNumber || !formData.emailId || !selectedLeader) {
            return;
        }

        const teamsInDept = getTeamsByDepartment(employees, departmentHead.department);

        const isDuplicate = teamsInDept.some(
            (team) => team.name.toLowerCase() === formData.name.toLowerCase()
        );

        if (isDuplicate) {
            toast.error("This team already exists in this department");
            return;
        }

        const newTeam: Omit<Employee, 'id'> = {
            ...formData,
            position: 'Team',
            department: departmentHead.department,
            children: []
        };

        addTeam(newTeam, departmentHead.id, selectedLeader);
        onClose();
        setFormData({ name: '', phoneNumber: '', emailId: '' });
        setSelectedLeader('');
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
            <DialogTitle>Add New Team</DialogTitle>
            <hr className='text-white' />
            <DialogContent sx={{ minWidth: 400 }}>
                <div className="flex flex-col gap-4">
                    <TextField
                        fullWidth
                        required
                        label="Team Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        required
                        label="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        required
                        label="Email ID"
                        type="email"
                        value={formData.emailId}
                        onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                    />
                    <FormControl fullWidth required>
                        <InputLabel>Select Team Leader</InputLabel>
                        <Select
                            value={selectedLeader}
                            label="Select Team Leader"
                            required
                            onChange={(e) => setSelectedLeader(e.target.value)}
                        >
                            {eligibleTeams.map(({ team, eligibleMembers }) => [
                                <ListSubheader key={`header-${team.id}`}>
                                    {team.name}
                                </ListSubheader>,
                                ...eligibleMembers.map(member => (
                                    <MenuItem key={member.id} value={member.id}>
                                        {member.name}
                                    </MenuItem>
                                ))
                            ])}
                        </Select>
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!formData.name || !formData.phoneNumber || !formData.emailId || !selectedLeader}
                >
                    Add Team
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTeamModal;