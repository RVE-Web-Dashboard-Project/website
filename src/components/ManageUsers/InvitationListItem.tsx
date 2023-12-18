import { ListItem, ListItemSecondaryAction, ListItemText, Stack } from "@mui/material";

import { useDeleteInvitation } from "../../repository/api/useDeleteInvitation";
import { InvitationInfo } from "../../repository/types/user";
import { DeleteButton } from "./DeleteBtn";

interface InvitationListItemProps {
  invite: InvitationInfo
}

export const InvitationListItem = ({ invite }: InvitationListItemProps) => {
  const { deleteInvitation, loading } = useDeleteInvitation();

  function handleDelete() {
    console.log("Deleting invitation", invite.id);
    deleteInvitation(invite.id);
  }

  return (
    <ListItem sx={{ pl: 0 }}>
      <ListItemText
        primary={
          <Stack direction="row" spacing={1} alignItems="center" useFlexGap>
            {invite.username}
          </Stack>
        }
        secondary={<InvitationSecondaryInfo invite={invite} />}
      />
      <ListItemSecondaryAction>
        <DeleteButton
          onClick={handleDelete}
          tooltip="Delete invitation"
          loading={loading}
          confirmTitle={`Delete ${invite.username} invitation`}
          confirmMessage="Are you sure you want to delete this invitation?"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const InvitationSecondaryInfo = ({ invite }: InvitationListItemProps) => {
  const creationDateLabel = "Created at " + new Date(invite.createdAt).toLocaleString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  if (!invite.inviter) return <span>{creationDateLabel}</span>;
  return <span>{creationDateLabel} by <i>{invite.inviter}</i></span>;
};

