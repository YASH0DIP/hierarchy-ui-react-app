import { createContext } from "react";
import type { EmployeeContextType } from "./EmployeeProvider";

export const EmployeeContext = createContext<EmployeeContextType>({} as EmployeeContextType);
