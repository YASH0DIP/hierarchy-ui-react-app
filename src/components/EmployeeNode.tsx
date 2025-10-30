import React, { useState } from 'react';
import type { Employee } from '../types/Employee';
import { useEmployee } from '../hooks/useEmployee';
import EmployeeCard from './EmployeeCard';
import { getTeamSize } from '../utils/employeeHelpers';
import AddEmployeeModal from './modals/AddEmployeeModal';
import UpdateEmployeeModal from './modals/UpdateEmployeeModal';
import MoveEmployeeModal from './modals/MoveEmployeeModal';
import AddTeamModal from './modals/AddTeamModal';
import ConfirmationModal from './modals/ConfirmationModal';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';

interface Props {
  employee: Employee;
  isSearchResult?: boolean;
}

const EmployeeNode: React.FC<Props> = ({ employee, isSearchResult = false }) => {
  const { filter, employees, deleteEmployee } = useEmployee();
  const [showChildren, setShowChildren] = useState(false);
  const [openModal, setOpenModal] = useState<'update' | 'move' | 'add' | 'addTeam' | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false); // ✅ separate for delete confirmation

  const matchesFilter = (emp: Employee) => {
    const search = filter.toLowerCase();
    return (
      emp.name.toLowerCase().includes(search) ||
      emp.emailId.toLowerCase().includes(search) ||
      emp.phoneNumber.includes(search)
    );
  };

  if (!isSearchResult && filter && !matchesFilter(employee) &&
    (!employee.children || employee.children.every(c => !matchesFilter(c)))) {
    return null;
  }

  const handleAction = (action: 'update' | 'move' | 'add' | 'delete' | 'addTeam') => {
    if (action === 'delete') {
      const teamSize = employee.teamId ? getTeamSize(employees, employee.teamId) : 0;
      if (teamSize <= 2) {
        alert("A team must have at least 2 members. Cannot delete this member.");
        return;
      }
      setConfirmOpen(true); // ✅ open confirmation modal
    } else {
      setOpenModal(action);
    }
  };

  const handleConfirmDelete = () => {
    if (employee.teamId) {
      deleteEmployee(employee.id, employee.teamId);
    }
    setConfirmOpen(false);
  };

  return (
    <div className={`border border-white rounded py-2 mt-1 
      ${isSearchResult ? 'border-blue-500 shadow-md' : ''}`}>
      <div
        onClick={() => employee.children?.length && setShowChildren(!showChildren)}
        className={`cursor-pointer ${employee.children?.length ? 'hover:bg-gray-50' : ''}`}
      >
        <EmployeeCard
          employee={employee}
          onAction={handleAction}
          ArrowIcon={showChildren ? KeyboardArrowDown : KeyboardArrowRight}
        />
      </div>

      {showChildren && (employee.children?.length || 0) > 0 && (
        <div className="ml-4 mt-2 border-l-3 border-dashed border-gray-300 pl-4">
          {employee.children?.map(child => (
            <EmployeeNode key={child.id} employee={child} isSearchResult={isSearchResult} />
          ))}
        </div>
      )}

      {openModal === 'update' && (
        <UpdateEmployeeModal
          open={true}
          onClose={() => setOpenModal(null)}
          employee={employee}
        />
      )}

      {openModal === 'addTeam' && (
        <AddTeamModal
          open={true}
          onClose={() => setOpenModal(null)}
          departmentHead={employee}
        />
      )}

      {openModal === 'add' && (
        <AddEmployeeModal
          open={true}
          onClose={() => setOpenModal(null)}
          parentId={employee.id}
          department={employee.department}
        />
      )}

      {openModal === 'move' && (
        <MoveEmployeeModal
          open={true}
          onClose={() => setOpenModal(null)}
          employee={employee}
          currentTeamId={employee.teamId || ''}
        />
      )}

      <ConfirmationModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete ${employee.name}?`}
      />
    </div>
  );
};

export default EmployeeNode;
