import React, { createContext, useContext, useState } from "react";
import { QuizResult } from "@/types/quiz";

interface Room {
  code: string;
  quizId: string;
  hostEmail: string;
  status: "waiting" | "started" | "completed";
  players: {
    email: string;
    result?: QuizResult;
    joinedAt: number;
  }[];
  createdAt: number;
  quizDetails?: {
    subject: string;
    chapter: string;
    totalQuestions: number;
  };
}

interface RoomContextType {
  room: Room | null;

  createRoom: (
    quizId: string,
    email: string,
    quizDetails?: {
      subject: string;
      chapter: string;
      totalQuestions: number;
    }
  ) => string;

  joinRoom: (code: string, email: string) => boolean;

  submitResult: (email: string, result: QuizResult) => void;

  startRoom: () => void;

  leaveRoom: () => void;

  updateRoomDetails: (details: {
    subject: string;
    chapter: string;
    totalQuestions: number;
  }) => void;
}

const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [room, setRoom] = useState<Room | null>(null);

  const getRooms = (): Room[] =>
    JSON.parse(localStorage.getItem("rooms") || "[]");

  const saveRooms = (rooms: Room[]) =>
    localStorage.setItem("rooms", JSON.stringify(rooms));

  const createRoom = (
    quizId: string,
    email: string,
    quizDetails?: any
  ) => {
    localStorage.removeItem("rooms");
    localStorage.removeItem("currentRoom");
    sessionStorage.clear();

    setRoom(null);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const newRoom: Room = {
      code,
      quizId,
      hostEmail: email,
      status: "waiting",
      players: [{ email, joinedAt: Date.now() }],
      createdAt: Date.now(),
      quizDetails,
    };

    saveRooms([newRoom]);
    setRoom(newRoom);

    return code;
  };

  const joinRoom = (code: string, email: string): boolean => {
    localStorage.removeItem("currentRoom");
    sessionStorage.clear();

    setRoom(null);

    const rooms = getRooms();

    const found = rooms.find(
      (r) => r.code === code.toUpperCase()
    );

    if (!found) return false;

    if (found.status !== "waiting") return false;

    const already = found.players.some(
      (p) => p.email === email
    );

    if (!already) {
      found.players.push({
        email,
        joinedAt: Date.now(),
      });
    }

    saveRooms([found]);
    setRoom(found);

    return true;
  };

  const startRoom = () => {
    if (!room) return;

    const rooms = getRooms();

    const updated: Room[] = rooms.map((r) =>
      r.code === room.code
        ? { ...r, status: "started" }
        : r
    );

    saveRooms(updated);

    const started = updated.find(
      (r) => r.code === room.code
    );

    if (started) setRoom(started);
  };

  const submitResult = (
    email: string,
    result: QuizResult
  ) => {
    if (!room) return;

    const rooms = getRooms();

    const updated: Room[] = rooms.map((r) => {
      if (r.code === room.code) {
        return {
          ...r,
          players: r.players.map((p) =>
            p.email === email
              ? { ...p, result }
              : p
          ),
        };
      }
      return r;
    });

    saveRooms(updated);

    const updatedRoom = updated.find(
      (r) => r.code === room.code
    );

    if (!updatedRoom) return;

    const allSubmitted =
      updatedRoom.players.every((p) => p.result);

    if (
      allSubmitted &&
      updatedRoom.status === "started"
    ) {
      const completed: Room = {
        ...updatedRoom,
        status: "completed",
      };

      saveRooms([completed]);
      setRoom(completed);
    } else {
      setRoom(updatedRoom);
    }
  };

  const leaveRoom = () => {
    localStorage.removeItem("rooms");
    localStorage.removeItem("currentRoom");
    sessionStorage.clear();

    setRoom(null);
  };

  const updateRoomDetails = (details: {
    subject: string;
    chapter: string;
    totalQuestions: number;
  }) => {
    if (!room) return;

    const rooms = getRooms();

    const updated = rooms.map((r) =>
      r.code === room.code
        ? { ...r, quizDetails: details }
        : r
    );

    saveRooms(updated);

    const updatedRoom = updated.find(
      (r) => r.code === room.code
    );

    if (updatedRoom) setRoom(updatedRoom);
  };

  return (
    <RoomContext.Provider
      value={{
        room,
        createRoom,
        joinRoom,
        submitResult,
        startRoom,
        leaveRoom,
        updateRoomDetails,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const ctx = useContext(RoomContext);

  if (!ctx) {
    return {
      room: null,
      createRoom: () => "",
      joinRoom: () => false,
      submitResult: () => {},
      startRoom: () => {},
      leaveRoom: () => {},
      updateRoomDetails: () => {}
    };
  }

  return ctx;
};

