export interface AuthenticatedUserObject {
  id: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface InvitationInfo {
  id: string;
  username: string;
  inviter: string;
  inviterId: number;
  createdAt: string;
}