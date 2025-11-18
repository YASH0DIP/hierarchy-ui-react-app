import React from "react";
import type { Employee } from "../types/Employee";
import EmployeeActions from "./EmployeeActions";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useEmployee } from "../hooks/useEmployee";
import { getTeamSize } from "../utils/employeeHelpers";
import { User } from "lucide-react";

interface Props {
  employee: Employee;
  onAction: (action: "update" | "move" | "add" | "delete" | "addTeam") => void;
  ArrowIcon: React.ElementType;
}

const EmployeeCard: React.FC<Props> = ({ employee, onAction, ArrowIcon }) => {
  const { employees } = useEmployee();
  const teamSize = employee.teamId
    ? getTeamSize(employees, employee.teamId)
    : 0;

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #e3f2fd",
        backgroundColor: "#ffffff",
        transition: "0.25s",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(33, 150, 243, 0.15)",
          transform: "scale(1.001)",
          border: "1px solid gray"
        },
        m: 0,
        p: 0,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          {/* LEFT SIDE INFO */}
          <Box display="flex" alignItems="center" gap={1.5}>
            <div className="flex flex-col items-center gap-1 justify-around"><div className="text-[#9f6c58] p-1 border-2 border-gray-400 rounded-3xl"><User size={24} color="gray" /></div> </div>

            <Box>
              <div className="flex flex-col">
                <Typography variant="h6" fontSize={"1.125rem"} fontWeight="bold" color="text.primary">
                  {employee.name}
                </Typography>

                <Typography fontSize="0.75rem" fontWeight="bold" color="text.secondary">
                  {employee.position}
                </Typography>
              </div>

              {/* Email Below */}
              {/* <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontSize: "0.8rem", fontWeight: "500" }}
              >
                {employee.emailId}
              </Typography> */}

              <Typography>
                <EmployeeActions
                  employee={employee}
                  onAction={onAction}
                  teamSize={teamSize}
                />
              </Typography>

              {employee.position === "Team" &&
                (employee.children?.length ?? 0) < 2 && (
                  <Typography
                    variant="caption"
                    color="warning.main"
                    fontWeight="bold"
                    sx={{ mt: 0.3 }}
                  >
                    Each team must have at least 2 members
                  </Typography>
                )}
            </Box>
          </Box>

          {/* ACTIONS + COLLAPSE */}
          {employee.children && employee.children.length > 0 ? (
          <Box display="flex" flexDirection="column" alignItems="end" gap={1}>
              <ArrowIcon style={{ opacity: 0.6, cursor: "pointer" }} />
          </Box>
          ):null}
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(EmployeeCard);
