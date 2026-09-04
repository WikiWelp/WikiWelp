export interface UserDTO {
  id?: number;
  email: string;
  password?: string;
  admin?: boolean;
}

export interface TagDTO {
  id?: number;
  name: string;
}

export interface RevisionDTO {
  id?: number;
  content: string;
  createdAt: string;
}

export interface PageDTO {
  id?: number;
  title: string;
  content?: string;
  tags?: TagDTO[];
  revisions?: RevisionDTO[];
}

export interface WikipediaDTO {
  title: string;
  extract: string;
}
