import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useEmployee } from '../hooks/useEmployee';
import type { Employee } from '../types/Employee';
import EmployeeNode from './EmployeeNode';
import { findEmployeeWithParentPath } from '../utils/employeeHelpers';

const SearchResults: React.FC = () => {
  const { employees, filter } = useEmployee();
  const [matchingNodes, setMatchingNodes] = useState<Employee[]>([]);

  useEffect(() => {
    if (!filter) {
      setMatchingNodes([]);
      return;
    }

    const search = filter.toLowerCase();
    const results: Employee[] = [];

    const collectMatches = (node: Employee) => {
      if (
        node.name.toLowerCase().includes(search) ||
        node.emailId.toLowerCase().includes(search) ||
        node.phoneNumber.includes(search)
      ) {
        const found = findEmployeeWithParentPath(employees, node.id);
        if (found?.node) results.push(found.node);
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => collectMatches(child));
      }
    };

    collectMatches(employees);
    setMatchingNodes(results);
  }, [filter, employees]);

  if (!filter || matchingNodes.length === 0) return null;

  return (
    <Paper className="p-4 space-y-4">

      {matchingNodes.map(node => (
        <EmployeeNode
          key={node.id}
          employee={node}
          isSearchResult={true}
        />
      ))}
    </Paper>
  );
};

export default SearchResults;
