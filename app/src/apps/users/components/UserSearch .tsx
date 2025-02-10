import React from "react";
import { TextField, Box } from "@mui/material";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const UserSearch: React.FC<SearchProps> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
      <TextField
        fullWidth
        placeholder="Search users by name"
        value={value}
        onChange={handleInputChange}
        sx={{
          maxWidth: "500px",
          "& .MuiInputBase-root": {
            borderRadius: "50px",
            paddingLeft: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </Box>
  );
};
