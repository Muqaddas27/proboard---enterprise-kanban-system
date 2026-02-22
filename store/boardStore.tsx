
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Board, List, Card, Role, Priority, BoardContextType } from '../types';
import { emailService } from '../services/emailService';
import { useAuth } from '../contexts/AuthContext';

export interface Invitation {
  id: string;
  email: string;
  boardId: string;
  sentAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const STORAGE_KEY = 'proboard_data';

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'ALL'>('ALL');
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    setLoading(true);
    setActiveBoard(null);

    if (!user?.email) {
      setBoards([]);
      setLoading(false);
      return;
    }

    const userStorageKey = `${STORAGE_KEY}_${user.email.toLowerCase()}`;
    const saved = localStorage.getItem(userStorageKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBoards(parsed);
      } catch {
        setBoards([]);
      }
      setLoading(false);
      return;
    }

    const legacy = localStorage.getItem(STORAGE_KEY);
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy);
        setBoards(parsed);
        localStorage.setItem(userStorageKey, JSON.stringify(parsed));
      } catch {
        setBoards([]);
      }
    } else {
      // New users start with blank boards
      setBoards([]);
    }
    setLoading(false);
  }, [user?.email]);

  useEffect(() => {
    if (!loading && user?.email) {
      const userStorageKey = `${STORAGE_KEY}_${user.email.toLowerCase()}`;
      localStorage.setItem(userStorageKey, JSON.stringify(boards));
    }
  }, [boards, loading, user?.email]);

  const updateBoards = useCallback((updater: (prev: Board[]) => Board[]) => {
    setBoards(prev => {
      const next = updater(prev);
      if (activeBoard) {
        const updatedActive = next.find(b => b.id === activeBoard.id);
        if (updatedActive) setActiveBoard(updatedActive);
      }
      return next;
    });
  }, [activeBoard]);

  const createBoard = (title: string) => {
    if (!user) return;
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      title,
      ownerId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: [{ id: `m-${Date.now()}`, boardId: `board-${Date.now()}`, userId: user.id, role: Role.OWNER }],
      lists: []
    };
    updateBoards(prev => [...prev, newBoard]);
  };

  const deleteBoard = (id: string) => {
    updateBoards(prev => prev.filter(b => b.id !== id));
    if (activeBoard?.id === id) setActiveBoard(null);
  };

  const renameBoard = (id: string, title: string) => {
    updateBoards(prev => prev.map(b => b.id === id ? { ...b, title, updatedAt: new Date().toISOString() } : b));
  };

  const addList = (title: string) => {
    if (!activeBoard) return;
    const newList: List = {
      id: `list-${Date.now()}`,
      boardId: activeBoard.id,
      title,
      order: activeBoard.lists.length,
      cards: []
    };
    updateBoards(prev => prev.map(b => b.id === activeBoard.id ? { ...b, lists: [...b.lists, newList] } : b));
  };

  const deleteList = (listId: string) => {
    if (!activeBoard) return;
    updateBoards(prev => prev.map(b => b.id === activeBoard.id ? { ...b, lists: b.lists.filter(l => l.id !== listId) } : b));
  };

  const renameList = (listId: string, title: string) => {
    if (!activeBoard) return;
    updateBoards(prev => prev.map(b => b.id === activeBoard.id ? { 
      ...b, 
      lists: b.lists.map(l => l.id === listId ? { ...l, title } : l) 
    } : b));
  };

  const reorderLists = (newLists: List[]) => {
    if (!activeBoard) return;
    updateBoards(prev => prev.map(b => b.id === activeBoard.id ? { ...b, lists: newLists } : b));
  };

  const addCard = (listId: string, title: string) => {
    if (!activeBoard) return;
    const newCard: Card = {
      id: `card-${Date.now()}`,
      title,
      description: '',
      listId,
      order: 999,
      priority: Priority.MEDIUM,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    updateBoards(prev => prev.map(b => b.id === activeBoard.id ? {
      ...b,
      lists: b.lists.map(l => l.id === listId ? { ...l, cards: [...l.cards, newCard] } : l)
    } : b));
  };

  const updateCard = (cardId: string, updates: Partial<Card>) => {
    if (!activeBoard) return;
    updateBoards(prev => prev.map(b => b.id === activeBoard.id ? {
      ...b,
      lists: b.lists.map(l => ({
        ...l,
        cards: l.cards.map(c => c.id === cardId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c)
      }))
    } : b));
  };

  const deleteCard = (cardId: string) => {
    if (!activeBoard) return;
    updateBoards(prev => prev.map(b => b.id === activeBoard.id ? {
      ...b,
      lists: b.lists.map(l => ({
        ...l,
        cards: l.cards.filter(c => c.id !== cardId)
      }))
    } : b));
  };

  const moveCard = (cardId: string, newListId: string, newOrder: number) => {
    if (!activeBoard) return;
    updateBoards(prev => {
      const board = prev.find(b => b.id === activeBoard.id);
      if (!board) return prev;

      let cardToMove: Card | undefined;
      const filteredLists = board.lists.map(l => {
        const found = l.cards.find(c => c.id === cardId);
        if (found) cardToMove = { ...found, listId: newListId };
        return { ...l, cards: l.cards.filter(c => c.id !== cardId) };
      });

      if (!cardToMove) return prev;

      return prev.map(b => b.id === activeBoard.id ? {
        ...b,
        lists: filteredLists.map(l => {
          if (l.id === newListId) {
            const newCards = [...l.cards];
            newCards.splice(newOrder, 0, cardToMove!);
            return { ...l, cards: newCards.map((c, i) => ({ ...c, order: i })) };
          }
          return l;
        })
      } : b);
    });
  };

  const sendInvitation = async (email: string, boardId: string) => {
    if (!activeBoard) return false;
    try {
      // Use email service to send actual invitation
      const success = await emailService.sendInvitationEmail(email, activeBoard.title);
      
      if (!success) {
        return false;
      }

      // Add to local invitations tracking
      const newInvitation: Invitation = {
        id: `inv-${Date.now()}`,
        email,
        boardId,
        sentAt: new Date().toISOString(),
        status: 'pending'
      };
      setInvitations(prev => [...prev, newInvitation]);

      return true;
    } catch (error) {
      console.error('Failed to send invitation:', error);
      return false;
    }
  };

  const getInvitationsSent = (boardId: string) => {
    return invitations.filter(inv => inv.boardId === boardId);
  };

  return (
    <BoardContext.Provider value={{
      boards, activeBoard, loading, searchQuery, filterPriority, setSearchQuery, setFilterPriority,
      createBoard, deleteBoard, renameBoard, setActiveBoard,
      addList, deleteList, renameList, reorderLists, addCard, updateCard, deleteCard, moveCard,
      sendInvitation, getInvitationsSent
    }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error('useBoard must be used within BoardProvider');
  return context;
};
