import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import type { Employee } from '../types/Employee';
import { DeleteSharp, EditNote, GroupAdd, MoveUp, PersonAddAlt1, } from '@mui/icons-material';

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
    <div className="flex gap-2 flex-wrap justify-end" onClick={e => e.stopPropagation()}>
      {employee.position !== 'CEO' && (
        <Tooltip title="Update Employee">
          <span className='border border-blue-600 rounded hover:bg-blue-50'>
            <IconButton
              color="primary"
              size="small"
              aria-label='Update Employee'
              onClick={(e) => handleClick(e, 'update')}
              sx={{
                width: 34,
                height: 34,
                "& svg": { fontSize: 28 },
                borderRadius: "2px",
              }}
            >
              <EditNote/>
            </IconButton>
          </span>
        </Tooltip>
      )}

      {employee.position.includes('Head') && (
        <Tooltip title="Add Team">
        <span className='border border-purple-600 rounded hover:bg-purple-50'>
          <IconButton
            sx={{
                width: 34,
                height: 34,
                borderRadius: "2px",
                "& svg": { fontSize: 28 }
              }}
            color="secondary"
            aria-label='Add Team'
            size="small"
            onClick={(e) => handleClick(e, 'addTeam')}
          >
            <GroupAdd/>
          </IconButton>
          </span>
        </Tooltip>
      )}

      {employee.position === 'Team Member' && (
        <>
          <Tooltip title={teamSize < 3 ? "Cannot move: Team requires minimum 2 members" : "Move Employee"}>
            <span className={`border ${teamSize<3?"border-gray-300":"border-amber-700"} rounded hover:bg-yellow-50`}>
              <IconButton
                color="warning"
                size="small"
                aria-label='Move Employee'
                onClick={(e) => handleClick(e, "move")}
                disabled={teamSize < 3}
                sx={{
                  width: 34,
                  height: 34,
                  "& svg": { fontSize: 28 },
                  borderRadius: "2px"
                }}
              >
                <MoveUp/>
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={teamSize < 3 ? "Cannot delete: Team requires minimum 2 members" : "Delete Employee"}>
            <span className={`border ${teamSize<3?"border-gray-300":"border-red-600"} rounded hover:bg-red-50`}>
              <IconButton
                color="error"
                size="small"
                aria-label='Delete Employee'
                disabled={teamSize < 3}
                sx={{
                  width: 34,
                  height: 34,
                  "& svg": { fontSize: 28 },
                  borderRadius: "2px",
                }}
                onClick={(e) => handleClick(e, 'delete')}
              >
                <DeleteSharp/>
              </IconButton>
            </span>
          </Tooltip>
        </>
      )}

      {employee.position === 'Team' && (
        <Tooltip title="Add Employee">
          <span className='border border-green-800 rounded hover:bg-green-50'>
            <IconButton
              color="success"
              aria-label='Add Employee'
              size="small"
              onClick={(e) => handleClick(e, 'add')}
              sx={{
                width: 34,
                height: 34,
                "& svg": { fontSize: 28 },
                borderRadius: "2px",
              }}
            >
              <PersonAddAlt1/>
            </IconButton>
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default EmployeeActions;