import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import { ChatThread, Member } from '../../types';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Shield,
  MoreVertical,
  ArrowLeft,
  VolumeX,
  Ban,
  Flag,
  Check,
  CheckCheck,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const {
    threads,
    activeThreadId,
    setActiveThreadId,
    sendMessage,
    currentUser,
    setViewingMember,
    navigate,
    showToast,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;

    sendMessage(activeThread.id, inputText);
    setInputText('');
  };

  const filteredThreads = threads.filter((t) =>
    t.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8.5rem)] lg:h-[calc(100vh-6rem)] flex bg-[#1C1333] border border-[#3A2E5C] rounded-2xl overflow-hidden">
      {/* ZONE 1: Conversations List (Left) */}
      <div
        className={`w-full lg:w-80 border-r border-[#3A2E5C] flex flex-col bg-[#17102A] ${
          mobileChatOpen ? 'hidden lg:flex' : 'flex'
        }`}
      >
        <div className="p-3.5 border-b border-[#3A2E5C] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-sm text-[#F3EEFF]">Messages</h2>
            <span className="text-[10px] text-[#2DD4BF] font-semibold bg-[#2DD4BF]/10 px-2 py-0.5 rounded-full">
              Encrypted
            </span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#A99CCB] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full nc-input pl-8 py-1.5 text-xs"
            />
          </div>
        </div>

        {/* Thread items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#3A2E5C]/40">
          {filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A99CCB] space-y-1">
              <MessageSquare className="w-6 h-6 text-[#FFB547] mx-auto mb-2" />
              <p className="font-semibold text-[#F3EEFF]">No chats active</p>
              <p>Connect with someone to start talking.</p>
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const isSelected = activeThread?.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    setMobileChatOpen(true);
                  }}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#22183B] border-l-2 border-[#FFB547]' : 'hover:bg-[#22183B]/50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={thread.participant.avatar}
                      alt={thread.participant.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#3A2E5C]"
                    />
                    {thread.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFB547] text-[#17102A] text-[9px] font-bold flex items-center justify-center">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-[#F3EEFF] truncate">
                        {thread.participant.name}
                      </h4>
                      <span className="text-[10px] text-[#7C6F9B]">{thread.lastMessageTime}</span>
                    </div>
                    <RoleBadge role={thread.participant.role} size="sm" />
                    <p className="text-[11px] text-[#A99CCB] truncate mt-1">
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ZONE 2: Active Chat Window (Center) */}
      {activeThread ? (
        <div
          className={`flex-1 flex flex-col bg-[#1C1431] ${
            !mobileChatOpen ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="h-16 px-4 border-b border-[#3A2E5C] flex items-center justify-between bg-[#17102A]/70">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileChatOpen(false)}
                className="lg:hidden p-1 text-[#A99CCB] hover:text-[#F3EEFF]"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <img
                src={activeThread.participant.avatar}
                alt={activeThread.participant.name}
                className="w-9 h-9 rounded-full object-cover border border-[#3A2E5C]"
              />

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#F3EEFF]">
                    {activeThread.participant.name}
                  </h3>
                  <RoleBadge role={activeThread.participant.role} size="sm" />
                </div>
                <span className="text-[10px] text-[#2DD4BF] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active in Hyderabad Cohort
                </span>
              </div>
            </div>

            {/* Quick Profile Open */}
            <button
              onClick={() => {
                setViewingMember(activeThread.participant);
                navigate('/member-profile');
              }}
              className="text-xs text-[#FFB547] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {activeThread.messages.map((msg) => {
              const isMe = msg.senderId === 'user-self';
              const isSystem = msg.senderId === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center my-3">
                    <span className="text-[11px] px-3 py-1 rounded-full bg-[#17102A] border border-[#3A2E5C] text-[#A99CCB]">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[#FFB547] text-[#17102A] font-medium rounded-br-none shadow-sm'
                        : 'bg-[#22183B] text-[#F3EEFF] border border-[#3A2E5C] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-[#7C6F9B] px-1">
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#17102A]" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-[#3A2E5C] bg-[#17102A] flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => showToast('File attachments supported in project build room.', 'info')}
              className="p-2 text-[#A99CCB] hover:text-[#F3EEFF]"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeThread.participant.name.split(' ')[0]}...`}
              className="flex-1 nc-input py-2 text-xs"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="nc-button-primary p-2.5 rounded-xl disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-[#A99CCB]">
          Select a chat to begin messaging.
        </div>
      )}

      {/* ZONE 3: Right Info Panel (Desktop only) */}
      {activeThread && (
        <div className="hidden xl:flex w-72 border-l border-[#3A2E5C] bg-[#17102A] p-5 flex-col justify-between text-xs space-y-4">
          <div className="space-y-4 text-center">
            <img
              src={activeThread.participant.avatar}
              alt={activeThread.participant.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#FFB547]/50 mx-auto"
            />
            <div>
              <h3 className="font-heading font-bold text-sm text-[#F3EEFF]">
                {activeThread.participant.name}
              </h3>
              <p className="text-[#A99CCB] text-[11px]">{activeThread.participant.roleTitle}</p>
              <div className="flex items-center justify-center gap-1.5 mt-1.5">
                <RoleBadge role={activeThread.participant.role} size="sm" />
                <span className="text-[10px] text-[#7C6F9B]">{activeThread.participant.location}</span>
              </div>
            </div>

            <div className="p-3 bg-[#22183B] border border-[#3A2E5C] rounded-xl text-left space-y-1">
              <span className="text-[10px] font-bold text-[#FFB547] uppercase">Shared Project</span>
              <p className="font-semibold text-xs text-[#F3EEFF]">KisanAI Voice System</p>
              <p className="text-[10px] text-[#A99CCB]">Active Team of Five</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-4 border-t border-[#3A2E5C]">
            <button
              onClick={() => showToast(`Notifications muted for ${activeThread.participant.name}.`, 'info')}
              className="w-full text-left p-2 rounded-lg text-[#A99CCB] hover:text-[#F3EEFF] hover:bg-[#22183B] flex items-center gap-2"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Mute notifications</span>
            </button>
            <button
              onClick={() => showToast(`${activeThread.participant.name} reported for review.`, 'info')}
              className="w-full text-left p-2 rounded-lg text-[#A99CCB] hover:text-[#F3EEFF] hover:bg-[#22183B] flex items-center gap-2"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Report conversation</span>
            </button>
            <button
              onClick={() => showToast(`${activeThread.participant.name} blocked.`, 'warning')}
              className="w-full text-left p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Block builder</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
