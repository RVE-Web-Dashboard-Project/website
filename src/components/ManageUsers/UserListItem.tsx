import { Chip, ListItem, ListItemSecondaryAction, ListItemText, Stack } from "@mui/material";

import { useDeleteUser } from "../../repository/api/useDeleteUser";
import { UserObject } from "../../repository/types/user";
import { DeleteButton } from "./DeleteBtn";

export const UserListItem = ({ user, canDelete }: {user: UserObject, canDelete: boolean}) => {
  const { deleteUser, loading } = useDeleteUser();

  function handleDelete() {
    console.log("Deleting user", user.id);
    deleteUser(user.id);
  }

  return (
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
        {canDelete && <DeleteButton
          onClick={handleDelete}
          tooltip="Delete account"
          loading={loading}
          confirmTitle={`Delete ${user.name} account`}
          confirmMessage="Are you sure you want to delete this account?"
        />}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const AdminBadge = () => (
  <Chip label="Admin" size="small" variant="outlined" color="primary" sx={{
    borderRadius: "4px",
    fontSize: 12,
    height: "18px",
  }} />
);

