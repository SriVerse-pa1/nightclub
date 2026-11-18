import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Circle } from '../../types';
import {
  Calendar,
  MessageSquare,
  ThumbsUp,
  Flag,
  HelpCircle,
  Send,
} from 'lucide-react';

export const CirclesPage: React.FC = () => {
  const { circles, toggleJoinCircle, addCirclePost, showToast } = useApp();

  const [selectedCircle, setSelectedCircle] = useState<Circle>(circles[0]);
  const [newPostText, setNewPostText] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    addCirclePost(selectedCircle.id, newPostText);
    setNewPostText('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD1C0]">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
            Community Circles
          </h1>
          <p className="text-xs text-[#665E54] mt-0.5">
            Calm, moderated domain circles for Telugu AI builders to exchange benchmarks and insights.
          </p>
        </div>

        <button
          onClick={() => showToast('Guidelines: Respectful debate, authentic benchmarks, zero self-promotional spam.', 'info')}
          className="nc-button-secondary text-xs py-2 px-3"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#805536]" />
          <span>Circle Guidelines</span>
        </button>
      </div>

      {/* Varied Size Tiles Circle Browse Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {circles.map((cir) => {
          const isSelected = selectedCircle.id === cir.id;
          return (
            <div
              key={cir.id}
              onClick={() => setSelectedCircle(cir)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#FFFFFF] border-[#805536] ring-2 ring-[#805536]/20 shadow-md'
                  : 'bg-[#FFFFFF] border-[#DCD1C0] hover:border-[#805536] shadow-sm'
              }`}
            >
              <span className="text-[10px] text-[#805536] font-bold uppercase tracking-wider">{cir.tag}</span>
              <h3 className="font-heading font-bold text-sm text-[#29251F] mt-1">{cir.name}</h3>
              <div className="flex items-center justify-between text-[11px] text-[#8C8173] mt-3 pt-2 border-t border-[#DCD1C0]">
                <span>{cir.memberCount} members</span>
                {cir.isJoined && <span className="text-[#805536] font-bold">Joined ✓</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inside Circle View (Posts, Events, Members) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Posts & Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Circle Banner */}
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card">
            <div>
              <span className="text-xs font-bold text-[#805536] uppercase tracking-wider">{selectedCircle.tag}</span>
              <h2 className="font-heading font-bold text-lg text-[#29251F] mt-0.5">
                {selectedCircle.name}
              </h2>
              <p className="text-xs text-[#665E54] mt-0.5">{selectedCircle.description}</p>
            </div>

            <button
              onClick={() => toggleJoinCircle(selectedCircle.id)}
              className={`text-xs py-2 px-5 font-semibold shrink-0 rounded-xl transition-all ${
                selectedCircle.isJoined
                  ? 'bg-[#F3EDE3] text-[#29251F] border border-[#DCD1C0]'
                  : 'nc-button-primary shadow-glow-accent'
              }`}
            >
              {selectedCircle.isJoined ? 'Joined ✓' : 'Join Circle'}
            </button>
          </div>

          {/* New Post Input */}
          <form
            onSubmit={handlePostSubmit}
            className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-4 space-y-3 text-xs shadow-card"
          >
            <textarea
              rows={2}
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder={`Share an experiment, question, or benchmark with ${selectedCircle.name}...`}
              className="w-full nc-input resize-none"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-[#8C8173]">
                Moderated community • Respectful language required
              </span>
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="nc-button-primary text-xs py-1.5 px-4 disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
                <span>Post</span>
              </button>
            </div>
          </form>

          {/* Posts List */}
          <div className="space-y-4">
            {selectedCircle.posts.map((post) => (
              <div key={post.id} className="nc-card p-5 space-y-3 text-xs bg-[#FFFFFF] border border-[#DCD1C0] shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#DCD1C0]"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-[#29251F]">
                        {post.author.name}
                      </h4>
                      <span className="text-[10px] text-[#665E54]">{post.author.roleTitle}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#8C8173]">{post.timestamp}</span>
                </div>

                <p className="text-xs text-[#29251F] leading-relaxed">{post.content}</p>

                <div className="pt-2 border-t border-[#DCD1C0] flex items-center justify-between text-xs text-[#665E54]">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => showToast('Upvoted post!', 'info')}
                      className="flex items-center gap-1.5 hover:text-[#805536] transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-[#805536]" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-[#805536] transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.replies} replies</span>
                    </button>
                  </div>

                  <button
                    onClick={() => showToast('Reported post for moderator inspection.', 'info')}
                    className="hover:text-[#805536] p-1 text-[#8C8173] transition-colors"
                    title="Report post"
                  >
                    <Flag className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => showToast('All current posts loaded.', 'info')}
              className="nc-button-secondary text-xs py-2 px-6"
            >
              Load more posts
            </button>
          </div>
        </div>

        {/* Sidebar: Upcoming Events (4 cols) */}
        <div className="lg:col-span-4 space-y-5 text-xs">
          <div className="nc-card p-5 space-y-3 bg-[#FFFFFF] border border-[#DCD1C0] shadow-card">
            <span className="font-bold text-[#29251F] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#805536]" />
              Circle Events
            </span>

            {selectedCircle.events.length === 0 ? (
              <p className="text-[#8C8173] text-[11px]">No upcoming events scheduled.</p>
            ) : (
              <div className="space-y-3">
                {selectedCircle.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] space-y-1.5"
                  >
                    <h4 className="font-semibold text-xs text-[#29251F]">{ev.title}</h4>
                    <span className="text-[10px] text-[#665E54] block">{ev.date}</span>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[#8C8173]">
                        {ev.attendees} RSVP'd
                      </span>
                      <button
                        onClick={() => showToast(`You RSVP'd for "${ev.title}"`, 'success')}
                        className="text-[11px] text-[#805536] hover:underline font-semibold"
                      >
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
