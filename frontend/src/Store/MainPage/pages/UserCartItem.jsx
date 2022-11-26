import { useState } from "react";
import {
  IconButton,
  TextField,
  TableCell,
  TableRow,
  CardMedia,
} from "@mui/material";
import { LabelTypography } from "LojaUniversal";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  DeleteOutline,
} from "@mui/icons-material";

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
      <TableCell>
        <CardMedia
          component="img"
          src={item.image}
          sx={{ height: 100, width: 100 }}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        <LabelTypography>{item.name}</LabelTypography>
      </TableCell>

      <TableCell align="center">
        <IconButton align="center" onClick={() => handleDecreaseAmount(item)}>
          <RemoveCircleOutline />
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
          <AddCircleOutline />
        </IconButton>
      </TableCell>

      <TableCell align="center">
        <LabelTypography>{item.value}</LabelTypography>
      </TableCell>
      <TableCell align="center">
        <LabelTypography>
          R${" "}
          {(
            ((item.value.replace("R$ ", "").replace(/,/g, "") / 100) *
            item.amount)
          ).toFixed(2).replace(".", ",")}
        </LabelTypography>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => props.onDelete(item)}>
          <DeleteOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
