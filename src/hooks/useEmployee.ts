import { useContext, useCallback } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import type { Employee } from "../types/Employee";
import { findEmployeeById } from "../utils/employeeHelpers";
import { toast } from "react-toastify";

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }

  const { employees, setEmployees, filter, setFilter } = context;

  const updateNodeRecursive = useCallback(
    (
      node: Employee,
      predicate: (n: Employee) => boolean,
      updater: (n: Employee) => Employee
    ): Employee => {
      if (predicate(node)) return updater(node);
      if (!node.children?.length) return node;

      const updatedChildren = node.children.map((child) =>
        updateNodeRecursive(child, predicate, updater)
      );

      if (updatedChildren === node.children) return node;

      return { ...node, children: updatedChildren };
    },
    []
  );

  const addEmployee = useCallback(
    (newEmployee: Omit<Employee, "id">, parentId: string) => {
      setEmployees((prev) => {
        const updated = updateNodeRecursive(
          prev,
          (node) => node.id === parentId,
          (node) => ({
            ...node,
            children: [
              ...(node.children || []),
              { ...newEmployee, id: `emp-${Date.now()}`, children: [] },
            ],
          })
        );
        return updated;
      });
      toast.success("Employee added successfully!");
    },
    [setEmployees, updateNodeRecursive]
  );

  const updateEmployee = useCallback(
    (updates: Partial<Employee>, employeeId: string) => {
      setEmployees((prev) =>
        updateNodeRecursive(
          prev,
          (node) => node.id === employeeId,
          (node) => ({ ...node, ...updates })
        )
      );
      toast.success("Employee updated successfully!");
    },
    [setEmployees, updateNodeRecursive]
  );

  const moveEmployee = (employeeId: string, newTeamId: string) => {
    setEmployees((prev) => {
      const employeeToMove = findEmployeeById(prev, employeeId);
      if (!employeeToMove) return prev;
      const removeFromOldTeam = (node: Employee): Employee => {
        if (node.children) {
          return {
            ...node,
            children: node.children
              .filter((child) => child.id !== employeeId)
              .map(removeFromOldTeam),
          };
        }
        return node;
      };
      const addToNewTeam = (node: Employee): Employee => {
        if (node.id === newTeamId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              { ...employeeToMove, teamId: newTeamId },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: node.children.map(addToNewTeam) };
        }
        return node;
      };
      const removedEmployee = removeFromOldTeam(prev);
      return addToNewTeam(removedEmployee);
    });
    toast.success("Employee moved successfully!");
  };

  const deleteEmployee = useCallback(
    (employeeId: string, teamId: string) => {
      setEmployees((prev) =>
        updateNodeRecursive(
          prev,
          (node) => node.id === teamId,
          (node) => {
            if ((node.children?.length || 0) <= 2) {
              toast.warning(
                "Cannot delete — team must have at least 2 members!"
              );
              return node;
            }
            return {
              ...node,
              children:
                node.children?.filter((child) => child.id !== employeeId) || [],
            };
          }
        )
      );
      toast.success("Employee deleted successfully!");
    },
    [setEmployees, updateNodeRecursive]
  );

  const addTeam = useCallback(
    (
      newTeam: Omit<Employee, "id">,
      departmentHeadId: string,
      teamLeaderId: string
    ) => {
      setEmployees((prev) => {
        let teamLeader: Employee | null = null;

        // Remove team leader from their old team
        const removeLeader = (node: Employee): Employee => {
          if (!node.children) return node;

          const leaderIndex = node.children.findIndex(
            (child) => child.id === teamLeaderId
          );
          if (leaderIndex !== -1) {
            teamLeader = {
              ...node.children[leaderIndex],
              position: "Team Leader",
            };
            const newChildren = node.children.filter(
              (child) => child.id !== teamLeaderId
            );
            return { ...node, children: newChildren };
          }

          return { ...node, children: node.children.map(removeLeader) };
        };

        const removedTree = removeLeader(prev);

        // Add new team with the team leader under department head
        const updatedTree = updateNodeRecursive(
          removedTree,
          (node) => node.id === departmentHeadId && !!teamLeader,
          (node) => ({
            ...node,
            children: [
              ...(node.children || []),
              { ...newTeam, id: `team-${Date.now()}`, children: [teamLeader!] },
            ],
          })
        );

        return updatedTree;
      });

      toast.success("New team created successfully!");
    },
    [setEmployees, updateNodeRecursive]
  );

  return {
    employees,
    filter,
    setFilter,
    addEmployee,
    updateEmployee,
    moveEmployee,
    deleteEmployee,
    addTeam,
  };
};
