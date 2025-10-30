import React from 'react';
import { Button, Tooltip } from '@mui/material';
import type { Employee } from '../types/Employee';
import { AddSharp, ArrowOutward, DeleteOutline, EditNote } from '@mui/icons-material';

interface Props {
  employee: Employee;
  onAction: (action: 'update' | 'move' | 'add' | 'delete' | 'addTeam') => void;
  teamSize: number;
}

const EmployeeActions: React.FC<Props> = ({
  employee,
  onAction,
  teamSize
}) => {
  const handleClick = (e: React.MouseEvent, action: 'update' | 'move' | 'add' | 'delete' | 'addTeam') => {
    e.stopPropagation();
    onAction(action);
  };

  return (
    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
      {employee.position !== 'CEO' && (
        <Tooltip title="Update Employee">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            aria-label='Update Employee'
            onClick={(e) => handleClick(e, 'update')}
          >
            <EditNote />
          </Button>
        </Tooltip>
      )}

      {employee.position.includes('Head') && (
        <Tooltip title="Add Team">
          <Button
            variant="outlined"
            color="secondary"
            aria-label='Add Team'
            size="small"
            onClick={(e) => handleClick(e, 'addTeam')}
          >
            Add Team
          </Button>
        </Tooltip>
      )}

      {employee.position === 'Team Member' && (
        <>
          <Tooltip title="Move employee to other team">
            <Button
              variant="outlined"
              color="warning"
              size="small"
              aria-label='Move Employee'
              onClick={(e) => handleClick(e, 'move')}
              disabled={teamSize <= 2}
              title={teamSize <= 2 ? "Cannot move: Team requires minimum 2 members" : ""}
            >
              <ArrowOutward />
            </Button>
          </Tooltip>
          <Tooltip title="Delete Employee">
            <Button
              variant="outlined"
              color="error"
              size="small"
              aria-label='Delete Employee'
              className={teamSize < 3 ? 'cursor-not-allowed' : ''}
              onClick={(e) => handleClick(e, 'delete')}
              disabled={teamSize < 3}
              title={teamSize < 3 ? "Cannot delete: Team requires minimum 2 members" : ""}
            >
              <DeleteOutline />
            </Button>
          </Tooltip>
        </>
      )}

      {employee.position === 'Team' && (
        <Tooltip title="Add Employee">
          <Button
            variant="outlined"
            color="success"
            aria-label='Add Employee'
            size="small"
            onClick={(e) => handleClick(e, 'add')}
          >
            <AddSharp />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default EmployeeActions;