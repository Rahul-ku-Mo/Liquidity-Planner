import { styled } from "@mui/material";

import { Color, BackgroundColor } from "../../types/types-interfaces";

interface CustomHeaderProps {
  BackgroundColor: BackgroundColor;
  Color: Color;
  Width?: number;
}
const CustomHeader = styled("div")<CustomHeaderProps>(
  ({ BackgroundColor, Color, Width }) => ({
    backgroundColor: BackgroundColor,
    color: Color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    width: "100%",
    minWidth: Width,
    textAlign: "center",
  })
);

export default CustomHeader;
