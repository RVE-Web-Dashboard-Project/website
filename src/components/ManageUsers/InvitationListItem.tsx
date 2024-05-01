import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

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
            <CopyToClipboardButton id={invite.id} />
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

const CopyToClipboardButton = ({ id }: {id: string}) => {
  const [isCopied, setIsCopied] = useState(false);
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const URL = process.env.PUBLIC_URL + "/invitation/" + id;

  if (navigator.clipboard === undefined) {
    return <Typography variant="caption" color="gray">{URL}</Typography>;
  }

  return (
    <Tooltip title="Copy to clipboard" >
      <IconButton
        size="small"
        onClick={() => {
          navigator.clipboard.writeText(URL);
          setIsCopied(true);
          sleep(1000).then(() => setIsCopied(false));
        }}
      >
        {isCopied
          ? <CheckCircleOutlineOutlinedIcon fontSize="small" color="success" />
          : <FileCopyOutlinedIcon fontSize="small" />
        }
      </IconButton>
    </Tooltip>
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

