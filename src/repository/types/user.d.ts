export interface UserObject {
  id: number;
  name: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface InvitationInfo {
  id: string;
  username: string;
  inviter: string;
  inviterId: number;
  createdAt: string;
}