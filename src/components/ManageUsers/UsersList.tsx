import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { CircularProgress, Divider, List, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

import { useFetchUsers } from "../../repository/api/useFetchUsers";
import { useGetOrFetchMe } from "../../repository/commands/useGetOrFetchMe";
import useUsersSelector from "../../repository/redux/selectors/useUsersSelector";
import { UserObject } from "../../repository/types/user";
import { UserListItem } from "./UserListItem";

function canDeleteUser(user: UserObject, { me, userList }: {me: UserObject, userList: UserObject[]}) {
  // check if user is not me
  if (user.id === me.id) {
    return false;
  }
  // check if user is not the only user
  if (userList.length === 1) {
    return false;
  }
  // check if user is not the only admin
  if (user.isAdmin && userList.filter((u) => u.isAdmin).length === 1) {
    return false;
  }
  return true;
}

export const UsersList = () => {
  const { user: authenticatedUser } = useGetOrFetchMe();
  const { data, error, loading, fetchUsersCommand } = useFetchUsers();
  const users = useUsersSelector();

  if (!data && !loading && !error) {
    fetchUsersCommand();
  }

  const Content = () => {
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
    if (!users || !authenticatedUser) {
      return <CircularProgress color="secondary" />;
    }
    const sortedUsers = Object.values(users).sort((a, b) => a.name.localeCompare(b.name));

    return (
      <List>
        {sortedUsers.map((user, index) => (
          <Fragment key={user.id}>
            {(index !== 0) && <Divider />}
            <UserListItem
              user={user}
              canDelete={canDeleteUser(user, { me: authenticatedUser, userList: sortedUsers })}
            />
          </Fragment>
        ))}
      </List>
    );
  };

  return (
    <Stack flex={1}>
      <Typography variant="h5" noWrap sx={{ display: "flex", alignItems: "center" }}>
        <GroupOutlinedIcon sx={{ mr: 1 }} />
        User list
      </Typography>

      <Content />
    </Stack>
  );
};