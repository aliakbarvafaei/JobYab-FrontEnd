import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

interface SearchBoxProps {
  placeholder?: string;
  icon: React.ReactNode;
}

export default function SearchBox({
  placeholder = "جستجو",
  icon,
}: SearchBoxProps) {
  return (
    <Paper
      component="form"
      sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
    >
      <IconButton
        style={{ padding: 10, cursor: "auto" }}
        disableFocusRipple
        disableRipple
        disableTouchRipple
      >
        {icon}
      </IconButton>
      <InputBase
        placeholder={placeholder}
        fullWidth
        className="shadow-none"
        style={{ marginLeft: 10, boxShadow: "none" }}
      />
    </Paper>
  );
}
