"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Send,
  Camera,
  Mic,
  MoreVertical,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// --- Mock Data ---

const conversations = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: true,
    },
    lastMessage: "I prefer a navy blue fabric with gold...",
    time: "now",
    unread: 2,
  },
  {
    id: "2",
    user: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: true,
    },
    lastMessage: "I prefer a navy blue fabric with gold...",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "3",
    user: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: true,
    },
    lastMessage: "I prefer a navy blue fabric with gold...",
    time: "5h ago",
    unread: 2,
  },
  {
    id: "4",
    user: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: true,
    },
    lastMessage: "I prefer a navy blue fabric with gold...",
    time: "Yesterday",
    unread: 3,
  },
  {
    id: "5",
    user: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: true,
    },
    lastMessage: "I prefer a navy blue fabric with gold...",
    time: "Monday",
    unread: 3,
  },
  {
    id: "6",
    user: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: true,
    },
    lastMessage: "I prefer a navy blue fabric with gold...",
    time: "12/08/2025",
    unread: 3,
  },
];

const messages = [
  {
    id: "m1",
    sender: "me",
    text: "Hello! I'm looking to redecorate my living room. Do you handle modern designs?",
    time: "4:56 pm",
    read: true,
  },
  {
    id: "m2",
    sender: "them",
    text: "Hi Joel Yes, I specialize in modern and contemporary interiors. Could you share a few details about your space?",
    time: "4:56 pm",
  },
  {
    id: "m3",
    sender: "me",
    text: "It's a medium-sized living room in East Legon. I'd like something simple but stylish, with neutral colors.",
    time: "4:56 pm",
    read: true,
  },
  {
    id: "m4",
    sender: "them",
    text: "Perfect Neutral tones with modern accents work really well. Do you have a budget range in mind?",
    time: "4:56 pm",
  },
  {
    id: "m5",
    sender: "me",
    text: "Around GHS 8,000 for the entire project.",
    time: "4:56 pm",
    read: true,
  },
];

export default function MessagesPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>("1");
  const activeConversation = conversations.find((c) => c.id === activeChatId);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-gray-200">
      {/* Sidebar List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-6 pb-2">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for chat"
              className="pl-9 bg-white border-gray-200 rounded-lg"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={cn(
                "w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-l-4 border-transparent",
                activeChatId === chat.id
                  ? "bg-green-50/50 border-green-600"
                  : ""
              )}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                {chat.user.online && (
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-gray-900 truncate">
                    {chat.user.name}
                  </span>
                  <span
                    className={cn(
                      "text-xs",
                      chat.unread > 0
                        ? "text-green-600 font-medium"
                        : "text-gray-500"
                    )}
                  >
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#157145] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50/30">
        {activeChatId ? (
          <>
            {/* Header */}
            <div className="h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={activeConversation?.user.avatar || ""}
                      alt={activeConversation?.user.name || ""}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {activeConversation?.user.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <span className="font-bold text-gray-900">
                  {activeConversation?.user.name}
                </span>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      isMe ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] lg:max-w-[70%] rounded-2xl px-5 py-3 text-sm leading-relaxed relative group",
                        isMe
                          ? "bg-[#157145] text-white rounded-tr-none"
                          : "bg-white text-gray-700 rounded-tl-none shadow-sm"
                      )}
                    >
                      <p>{msg.text}</p>
                      <div
                        className={cn(
                          "text-[10px] mt-1 flex items-center justify-end gap-1",
                          isMe ? "text-green-100" : "text-gray-400"
                        )}
                      >
                        {msg.time}
                        {isMe && msg.read && (
                          <CheckCheck className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-600 mb-0.5"
                >
                  <Plus className="w-6 h-6" />
                </Button>
                <div className="flex-1 bg-gray-50 rounded-2xl flex items-center px-4 py-2 gap-2 border border-transparent focus-within:border-gray-200 transition-colors">
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="flex-1 bg-transparent border-0 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                  />
                  <div className="flex items-center gap-2 text-gray-400">
                    <button className="hover:text-gray-600">
                      <Send className="w-5 h-5 -rotate-45" />
                    </button>
                    <button className="hover:text-gray-600">
                      <Camera className="w-5 h-5" />
                    </button>
                    <button className="hover:text-gray-600">
                      <Mic className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4 opacity-50">
              {/* Simple logo placeholder */}
              <div className="w-8 h-8 bg-gray-400 rounded-full" />
            </div>
            <p className="text-gray-500 font-medium">
              Client messages will appear here. Chat to discuss requirements,
              updates, and orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
