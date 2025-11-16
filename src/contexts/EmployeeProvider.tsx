import React, { useState, useEffect } from 'react';
import type { Employee } from '../types/Employee';
import { EmployeesData } from '../data';
import { EmployeeContext } from './EmployeeContext';

export interface EmployeeContextType {
  employees: Employee;
  setEmployees: React.Dispatch<React.SetStateAction<Employee>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee>(() => {
    const saved = localStorage.getItem('companyHierarchy_v2');
    return saved ? JSON.parse(saved) : EmployeesData;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('oraganizationHierarchy_v2', JSON.stringify(employees));
  }, [employees]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, filter, setFilter }}>
      {children}
    </EmployeeContext.Provider>
  );
};