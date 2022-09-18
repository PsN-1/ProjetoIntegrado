import { IconButton, TextField } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import * as React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import LabelTypography from "../../../shared/components/LabelTypography";
import { useState } from "react";

export default function UserCartItem(props) {
  const { item } = props;
  const [amount, setAmount] = useState(item.amount);
  const handleAddAmount = (item) => {
    setAmount(props.onAddAmount(item));
  };

  const handleDecreaseAmount = (item) => {
    setAmount(props.onDecreaseAmount(item));
  };
  return (
    <TableRow
      key={item._id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        <LabelTypography>{item.name}</LabelTypography>
      </TableCell>

      <TableCell align="center">
        <IconButton align="center" onClick={() => handleDecreaseAmount(item)}>
          <RemoveCircleOutlineIcon />
        </IconButton>

        <TextField
          inputProps={{
            style: {
              textAlign: "center",
            },
          }}
          sx={{ width: "10ch" }}
          value={amount}
        />

        <IconButton onClick={() => handleAddAmount(item)}>
          <AddCircleOutlineIcon />
        </IconButton>
      </TableCell>

      <TableCell align="center">
        <LabelTypography>R$ {item.value}</LabelTypography>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => props.onDelete(item)}>
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
