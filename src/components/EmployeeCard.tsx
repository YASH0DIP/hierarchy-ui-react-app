import React from "react";
import type { Employee } from "../types/Employee";
import EmployeeActions from "./EmployeeActions";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useEmployee } from "../hooks/useEmployee";
import { getTeamSize } from "../utils/employeeHelpers";
import { SupervisedUserCircleSharp } from "@mui/icons-material";

interface Props {
  employee: Employee;
  onAction: (action: "update" | "move" | "add" | "delete" | "addTeam") => void;
  ArrowIcon: React.ElementType;
}

const EmployeeCard: React.FC<Props> = ({ employee, onAction, ArrowIcon }) => {
  const { employees } = useEmployee();
  const teamSize = employee.teamId ? getTeamSize(employees, employee.teamId) : 0;

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #e3f2fd",
        transition: "0.2s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(33, 150, 243, 0.1)",
          transform: "scale(1.01)",
        },
        m:0,
        p:0
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <SupervisedUserCircleSharp fontSize="large" />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {employee.name} 
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
                {employee.position} {employee.children && employee.children.length > 0 ? `(${employee.children.length})` : ""}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" className="flex-col">
            <Box display="flex" flexWrap="wrap" alignItems="center" gap={1} justifyContent="end">
              <EmployeeActions employee={employee} onAction={onAction} teamSize={teamSize} />
              {employee.children && employee.children.length > 0 && (
                <ArrowIcon style={{ opacity: 0.6 }}/>
              )}
            </Box>
            {employee.position === "Team" && (employee.children?.length ?? 0) < 2 && (
              <Typography variant="caption" color="warning" mt={2} display="block" fontWeight="bold">
                Each team must have at least 2 members
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
