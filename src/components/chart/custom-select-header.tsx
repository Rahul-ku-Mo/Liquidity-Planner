import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Color, BackgroundColor } from "../../types/types-interfaces";
import React from "react";

type CustomSelectHeaderProps = {
  color: Color;
  backgroundColor: BackgroundColor;
  handleColor: (event: SelectChangeEvent) => void;
  handleBackgroundColor: (event: SelectChangeEvent) => void;
};
const CustomSelectHeader: React.FC<CustomSelectHeaderProps> = ({
  color,
  backgroundColor,
  handleColor,
  handleBackgroundColor,
}) => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          width: 120,
          position: "absolute",
          zIndex: 20,
          p: 1,
          backgroundColor: "white",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <div className="text-sn px-2 tracking-tighter font-bold">
          Table Header Color
        </div>
        <FormControl fullWidth>
          <InputLabel id="color-select-label">Color</InputLabel>
          <Select
            labelId="color-select-label"
            id="color-select"
            value={color}
            label="Color"
            sx={{
              height: 40,
              fontWeight: "500",
              borderRadius: "12px",
            }}
            onChange={handleColor}
          >
            <MenuItem value="White">White</MenuItem>
            <MenuItem value="Black">Black</MenuItem>
            <MenuItem value="Blue">Blue</MenuItem>
            <MenuItem value="Grey">Grey</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="background-color-select-label">
            Background Color
          </InputLabel>
          <Select
            labelId="background-color-select-label"
            id="background-color-select"
            value={backgroundColor}
            label="Background Color"
            sx={{
              height: 40,
              fontWeight: "500",
              borderRadius: "12px",
            }}
            onChange={handleBackgroundColor}
          >
            <MenuItem value="Green">Green</MenuItem>
            <MenuItem value="Red">Red</MenuItem>
            <MenuItem value="Yellow">Yellow</MenuItem>
            <MenuItem value="Violet">Violet</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};

export default CustomSelectHeader;
