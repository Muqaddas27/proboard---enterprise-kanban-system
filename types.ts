
export enum Role {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface BoardMember {
  id: string;
  boardId: string;
  userId: string;
  role: Role;
  user?: User;
}

export interface Board {
  id: string;
  title: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  members: BoardMember[];
  lists: List[];
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  order: number;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  description: string;
  listId: string;
  order: number;
  priority: Priority;
  dueDate?: string;
  members?: string[];
  comments?: Array<{ id: string; text: string; author: string; timestamp: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface BoardContextType {
  boards: Board[];
  activeBoard: Board | null;
  loading: boolean;
  searchQuery: string;
  filterPriority: Priority | 'ALL';
  setSearchQuery: (query: string) => void;
  setFilterPriority: (priority: Priority | 'ALL') => void;
  createBoard: (title: string) => void;
  deleteBoard: (id: string) => void;
  renameBoard: (id: string, title: string) => void;
  setActiveBoard: (board: Board | null) => void;
  addList: (title: string) => void;
  deleteList: (listId: string) => void;
  renameList: (listId: string, title: string) => void;
  reorderLists: (lists: List[]) => void;
  addCard: (listId: string, title: string) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, newListId: string, newOrder: number) => void;
  sendInvitation: (email: string, boardId: string) => Promise<boolean>;
  getInvitationsSent: (boardId: string) => any[];
}
