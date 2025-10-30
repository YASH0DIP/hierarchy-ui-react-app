import { useContext } from 'react';
import { EmployeeContext } from '../contexts/EmployeeContext';
import type { Employee } from '../types/Employee';
import { findEmployeeById } from '../utils/employeeHelpers';
import { toast } from 'react-toastify';

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }

  const { employees, setEmployees, filter, setFilter } = context;

  const addEmployee = (newEmployee: Omit<Employee, 'id'>, parentId: string) => {
    setEmployees(prev => {
      const addToTeam = (node: Employee): Employee => {
        if (node.id === parentId) {
          const employee: Employee = {
            ...newEmployee,
            id: `emp-${Date.now()}`,
            children: []
          };
          return {
            ...node,
            children: [...(node.children || []), employee]
          };
        }
        if (node.children) {
          return {
            ...node,
            children: node.children.map(addToTeam)
          };
        }
        return node;
      };
      return addToTeam(prev);
    });
    toast.success('Employee added');
  };

  const updateEmployee = (updates: Partial<Employee>, employeeId: string) => {
    setEmployees(prev => {
      const updateNode = (node: Employee): Employee => {
        if (node.id === employeeId) {
          return { ...node, ...updates };
        }
        if (node.children) {
          return {
            ...node,
            children: node.children.map(updateNode)
          };
        }
        return node;
      };
      return updateNode(prev);
    });
    toast.success('Employee updated successfully!');
  };

  const moveEmployee = (employeeId: string, newTeamId: string) => {
    setEmployees(prev => {
      const employeeToMove = findEmployeeById(prev, employeeId);
      if (!employeeToMove) return prev;

      const removeFromOldTeam = (node: Employee): Employee => {
        if (node.children) {
          return {
            ...node,
            children: node.children
              .filter(child => child.id !== employeeId)
              .map(removeFromOldTeam)
          };
        }
        return node;
      };

      const addToNewTeam = (node: Employee): Employee => {
        if (node.id === newTeamId) {
          return {
            ...node,
            children: [...(node.children || []), { ...employeeToMove, teamId: newTeamId }]
          };
        }
        if (node.children) {
          return {
            ...node,
            children: node.children.map(addToNewTeam)
          };
        }
        return node;
      };



      const removedEmployee = removeFromOldTeam(prev);
      return addToNewTeam(removedEmployee);
    });
    toast.success('Employee moved successfully!');
  };

  const deleteEmployee = (employeeId: string, teamId: string) => {
    setEmployees(prev => {
      const deleteFromTeam = (node: Employee): Employee => {
        if (node.id === teamId) {
          // Only allow delete if team has more than 2 members
          if ((node.children?.length || 0) <= 2) {
            return node;
          }
          return {
            ...node,
            children: node.children?.filter(child => child.id !== employeeId)
          };
        }
        if (node.children) {
          return {
            ...node,
            children: node.children.map(deleteFromTeam)
          };
        }
        return node;
      };
      return deleteFromTeam(prev);
    });
    toast.success('Employee deleted');
  };

  const addTeam = (newTeam: Omit<Employee, 'id'>, departmentHeadId: string, teamLeaderId: string) => {
    setEmployees(prev => {
      // First find and remove the team leader from their current team
      let teamLeader: Employee | null = null;

      const removeTeamLeader = (node: Employee): Employee => {
        if (node.children) {
          const leaderIndex = node.children.findIndex(child => child.id === teamLeaderId);
          if (leaderIndex !== -1) {
            teamLeader = { ...node.children[leaderIndex], position: 'Team Leader' };
            return {
              ...node,
              children: node.children.filter(child => child.id !== teamLeaderId)
            };
          }
          return {
            ...node,
            children: node.children.map(removeTeamLeader)
          };
        }
        return node;
      };

      // Then add the new team with the leader
      const addTeamToDepartment = (node: Employee): Employee => {
        if (node.id === departmentHeadId && teamLeader) {
          const team: Employee = {
            ...newTeam,
            id: `team-${Date.now()}`,
            children: [teamLeader]
          };
          return {
            ...node,
            children: [...(node.children || []), team]
          };
        }
        if (node.children) {
          return {
            ...node,
            children: node.children.map(addTeamToDepartment)
          };
        }
        return node;
      };

      const updatedEmployees = removeTeamLeader(prev);
      return addTeamToDepartment(updatedEmployees);
    });
    toast.success('Team added');
  };

  return {
    employees,
    filter,
    setFilter,
    addEmployee,
    updateEmployee,
    moveEmployee,
    deleteEmployee,
    addTeam
  };
};