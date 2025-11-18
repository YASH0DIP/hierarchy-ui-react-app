import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import type { Employee } from '../types/Employee';
import { Trash2Icon, UserPen, UserPlus } from 'lucide-react';

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
    <div className="flex gap-2 flex-wrap mt-2" onClick={e => e.stopPropagation()}>
      {employee.position !== 'CEO' && (
        <Tooltip title="Update Employee">
          <span className='rounded-xl border border-blue-600 hover:bg-blue-50'>
            <IconButton
              color="primary"
              size="small"
              aria-label='Update Employee'
              onClick={(e) => handleClick(e, 'update')}
              sx={{
                paddingX: 1.5
              }}
            >
              <UserPen size={16} />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {employee.position.includes('Head') && (
        <Tooltip title="Add Team">
          <span className='rounded-xl border border-purple-600 hover:bg-purple-50'>
            <IconButton
              sx={{
                paddingX: 1.25,
                fontSize: "10px",
                fontWeight: "bold"
              }}
              color="secondary"
              aria-label='Add Team'
              size="small"
              onClick={(e) => handleClick(e, 'addTeam')}
            >
              Add Team
            </IconButton>
          </span>
        </Tooltip>
      )}

      {employee.position === 'Team Member' && (
        <>
          <Tooltip title={teamSize < 3 ? "Cannot delete: Team requires minimum 2 members" : "Delete Employee"}>
            <span className={`rounded-xl border ${teamSize < 3 ? "border-gray-300" : "border-red-600"} rounded hover:bg-red-50`}>
              <IconButton
                color="error"
                size="small"
                aria-label='Delete Employee'
                disabled={teamSize < 3}
                sx={{
                  paddingX: 1.5,
                }}
                onClick={(e) => handleClick(e, 'delete')}
              >
                <Trash2Icon size={16} />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={teamSize < 3 ? "Cannot move: Team requires minimum 2 members" : "Move Employee"}>
            <span className={`rounded-xl border ${teamSize < 3 ? "border-gray-300" : "border-amber-700"} rounded hover:bg-yellow-50`}>
              <IconButton
                color="warning"
                size="small"
                aria-label='Move Employee'
                onClick={(e) => handleClick(e, "move")}
                disabled={teamSize < 3}
                sx={{
                  paddingX: 1.5,
                  fontSize: "10px",
                  fontWeight: "bold"
                }}
              >
                Change Team
              </IconButton>
            </span>
          </Tooltip>

        </>
      )}

      {employee.position === 'Team' && (
        <Tooltip title="Add Employee">
          <span className='rounded-xl border border-green-800 hover:bg-green-50'>
            <IconButton
              color="success"
              aria-label='Add Employee'
              size="small"
              onClick={(e) => handleClick(e, 'add')}
              sx={{
                paddingX: 1.5,
              }}
            >
              <UserPlus size={16} />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default EmployeeActions;