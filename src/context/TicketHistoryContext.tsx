'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Ticket {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  showtime: string;
  seats: string[];
  total: number;
  date: string;
  purchaseDate: string;
}

interface TicketHistoryContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'purchaseDate'>) => string;
  getTicketById: (id: string) => Ticket | undefined;
  clearHistory: () => void;
}

const TicketHistoryContext = createContext<TicketHistoryContextType | undefined>(undefined);

export function TicketHistoryProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ticketHistory');
    if (saved) {
      try {
        setTickets(JSON.parse(saved));
      } catch {
        setTickets([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticketHistory', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (ticket: Omit<Ticket, 'id' | 'purchaseDate'>): string => {
    const id = `CM${Date.now().toString(36).toUpperCase()}`;
    const newTicket: Ticket = {
      ...ticket,
      id,
      purchaseDate: new Date().toISOString(),
    };
    setTickets((prev) => [newTicket, ...prev]);
    return id;
  };

  const getTicketById = (id: string) => {
    return tickets.find((ticket) => ticket.id === id);
  };

  const clearHistory = () => {
    setTickets([]);
    localStorage.removeItem('ticketHistory');
  };

  return (
    <TicketHistoryContext.Provider value={{ tickets, addTicket, getTicketById, clearHistory }}>
      {children}
    </TicketHistoryContext.Provider>
  );
}

export function useTicketHistory() {
  const context = useContext(TicketHistoryContext);
  if (context === undefined) {
    throw new Error('useTicketHistory must be used within a TicketHistoryProvider');
  }
  return context;
}
