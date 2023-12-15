import { ListItem, ListItemSecondaryAction, ListItemText, Stack } from "@mui/material";

import { InvitationInfo } from "../../repository/types/user";
import { DeleteButton } from "./DeleteBtn";

interface InvitationListItemProps {
  invite: InvitationInfo
}

export const InvitationListItem = ({ invite }: InvitationListItemProps) => (
  <ListItem>
    <ListItemText
      primary={
        <Stack direction="row" spacing={1} alignItems="center" useFlexGap>
          {invite.username}
        </Stack>
      }
      secondary={
        "Created at: " + new Date(invite.createdAt).toLocaleString("en", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      }
    />
    <ListItemSecondaryAction>
      <DeleteButton onClick={console.log} tooltip="Delete invitation" />
    </ListItemSecondaryAction>
  </ListItem>
);

