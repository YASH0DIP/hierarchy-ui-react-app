import React from "react";
import { EmployeeProvider } from "./contexts/EmployeeProvider";
import EmployeeNode from "./components/EmployeeNode";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { useEmployee } from "./hooks/useEmployee";
import { Box, Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent: React.FC = () => {
  const { employees, filter } = useEmployee();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: { xs: "0.125rem", md: "1rem" },
        scale: 0.95
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "99%",
          maxWidth: "1365px",
        }}
      >
        <div>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            fontSize={"1.725rem"}
            sx={{
              mb: 4,
              background: "linear-gradient(90deg, #000, #000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 0.5,
            }}
          >
            Company Hierarchy
          </Typography>

          <Box sx={{ mb: 1 }}>
            <SearchBar />
          </Box>

          <Box>
            {filter ? (
              <SearchResults />
            ) : (
              <EmployeeNode employee={employees} />
            )}
          </Box>
        </div>
      </Container>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <EmployeeProvider>
      <AppContent />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        toastStyle={{fontFamily: "inherit", color: "black", backgroundBlendMode: "color"}}
      />
    </EmployeeProvider>
  );
};

export default App;
