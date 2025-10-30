import type { Employee } from '../types/Employee';

export const findEmployeeById = (root: Employee, id: string): Employee | null => {
  if (root.id === id) return root;
  if (root.children) {
    for (const child of root.children) {
      const found = findEmployeeById(child, id);
      if (found) return found;
    }
  }
  return null;
};

export const getTeamsByDepartment = (root: Employee, department: string): Employee[] => {
  const teams: Employee[] = [];
  
  const traverse = (node: Employee) => {
    if (node.position === 'Team' && node.department === department) {
      teams.push(node);
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  traverse(root);
  return teams;
};

export const matchesSearchFilter = (employee: Employee, filter: string): boolean => {
  const searchTerm = filter.toLowerCase();
  return (
    employee.name.toLowerCase().includes(searchTerm) ||
    employee.emailId.toLowerCase().includes(searchTerm) ||
    employee.phoneNumber.includes(searchTerm) ||
    employee.position.toLowerCase().includes(searchTerm) ||
    employee.department.toLowerCase().includes(searchTerm)
  );
};

export const validateTeamSize = (teamSize: number): boolean => {
  return teamSize >= 2;
};

export const getTeamSize = (root: Employee, teamId: string): number => {
  const team = findEmployeeById(root, teamId);
  return team?.children?.length || 0;
};

export const getTeamsWithMoreThan2Members = (
  root: Employee, 
  department: string
): { team: Employee; eligibleMembers: Employee[] }[] => {
  const teams: { team: Employee; eligibleMembers: Employee[] }[] = [];
  
  const findTeams = (node: Employee) => {
    if (node.position === 'Team' && node.department === department) {
      if ((node.children?.length || 0) > 2) {
        const eligibleMembers = node.children?.filter(
          member => member.position === 'Team Member'
        ) || [];
        if (eligibleMembers.length > 0) {
          teams.push({ team: node, eligibleMembers });
        }
      }
    }
    node.children?.forEach(findTeams);
  };

  findTeams(root);
  return teams;
};

export const findEmployeeWithParentPath = (
  root: Employee, 
  id: string
): { node: Employee; path: string[] } | null => {
  const findNode = (
    node: Employee, 
    currentPath: string[] = []
  ): { node: Employee; path: string[] } | null => {
    if (node.id === id) {
      return { node: { ...node }, path: [...currentPath, node.id] };
    }

    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child, [...currentPath, node.id]);
        if (found) return found;
      }
    }
    return null;
  };

  return findNode(root);
};