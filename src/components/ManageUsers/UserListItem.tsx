import { Chip, ListItem, ListItemSecondaryAction, ListItemText, Stack } from "@mui/material";

import { UserObject } from "../../repository/types/user";
import { DeleteButton } from "./DeleteBtn";

export const UserListItem = ({ user, canDelete }: {user: UserObject, canDelete: boolean}) => (
  <ListItem sx={{ pl: 0 }}>
    <ListItemText
      primary={
        <Stack direction="row" spacing={1} alignItems="center" useFlexGap>
          {user.name}
          {user.isAdmin && <AdminBadge />}
        </Stack>
      }
      secondary={
        "Created at " + new Date(user.createdAt).toLocaleString("en", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      }
    />
    <ListItemSecondaryAction>
      {canDelete && <DeleteButton onClick={console.log} tooltip="Delete account" />}
    </ListItemSecondaryAction>
  </ListItem>
);

const AdminBadge = () => (
  <Chip label="Admin" size="small" variant="outlined" color="primary" sx={{
    borderRadius: "4px",
    fontSize: 12,
    height: "18px",
  }} />
);

