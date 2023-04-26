import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

interface SearchBoxProps {
  placeholder?: string;
  icon: React.ReactNode;
}

export default function SearchBox({
  placeholder = "جستجو",
  icon,
  ...props
}: SearchBoxProps & InputBaseProps) {
  return (
    <Paper
      style={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        height: "100%",
        paddingBlock: 0.25,
        border: "1px solid rgba(0, 0, 0, 0.23)",
      }}
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
        {...props}
      />
    </Paper>
  );
}
