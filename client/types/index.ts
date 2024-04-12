export interface Server {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: string;

  members: Member[];
  channels: Channel[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  profileId: string;
  serverId: string;
  message: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  profileId: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
  fileUrl: string;
  deleted: boolean;
}

export interface Conversation {
  id: string;
  memberOneId: string;
  memberTwoId: string;
  memberOne: Member;
  memberTwo: Member;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: string;
  profileId: string;
  serverId: string;
  role: MemberRole;
  createdAt: Date;
  updatedAt: Date;
}

export const MemberRole = {
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  GUEST: "GUEST",
};

export type MemberRole = "ADMIN" | "MODERATOR" | "GUEST";

export const ChannelType = {
  TEXT: "TEXT",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
};

export type ChannelType = "TEXT" | "AUDIO" | "VIDEO";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type MemberWithProfile = Member & { profile: Profile };

export interface SuccessResponse<Data> {
  data: Data;
  message: string;
  status: number;
}
