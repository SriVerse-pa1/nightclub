import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Circle } from '../../types';
import {
  Layers,
  Users2,
  Calendar,
  MessageSquare,
  ThumbsUp,
  Share2,
  Flag,
  HelpCircle,
  Plus,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A2E5C]">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
            Community Circles
          </h1>
          <p className="text-xs text-[#A99CCB] mt-0.5">
            Calm, moderated domain circles for Telugu AI builders to exchange benchmarks and insights.
          </p>
        </div>

        <button
          onClick={() => showToast('Guidelines: Respectful debate, authentic benchmarks, zero self-promotional spam.', 'info')}
          className="nc-button-secondary text-xs py-2 px-3"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
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
                  ? 'bg-[#2B1E4A] border-[#FFB547] shadow-glow-accent'
                  : 'bg-[#22183B] border-[#3A2E5C] hover:border-[#A99CCB]'
              }`}
            >
              <span className="text-[10px] text-[#FFB547] font-bold">{cir.tag}</span>
              <h3 className="font-heading font-bold text-sm text-[#F3EEFF] mt-1">{cir.name}</h3>
              <div className="flex items-center justify-between text-[11px] text-[#7C6F9B] mt-3 pt-2 border-t border-[#3A2E5C]/50">
                <span>{cir.memberCount} members</span>
                {cir.isJoined && <span className="text-emerald-400 font-bold">Joined</span>}
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
          <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#FFB547]">{selectedCircle.tag}</span>
              <h2 className="font-heading font-bold text-lg text-[#F3EEFF]">
                {selectedCircle.name}
              </h2>
              <p className="text-xs text-[#A99CCB] mt-0.5">{selectedCircle.description}</p>
            </div>

            <button
              onClick={() => toggleJoinCircle(selectedCircle.id)}
              className={`text-xs py-2 px-5 font-semibold shrink-0 rounded-xl transition-all ${
                selectedCircle.isJoined
                  ? 'bg-[#22183B] text-[#A99CCB] border border-[#3A2E5C]'
                  : 'nc-button-primary shadow-glow-accent'
              }`}
            >
              {selectedCircle.isJoined ? 'Joined ✓' : 'Join Circle'}
            </button>
          </div>

          {/* New Post Input */}
          <form
            onSubmit={handlePostSubmit}
            className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-4 space-y-3 text-xs"
          >
            <textarea
              rows={2}
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder={`Share an experiment, question, or benchmark with ${selectedCircle.name}...`}
              className="w-full nc-input resize-none"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-[#7C6F9B]">
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
              <div key={post.id} className="nc-card p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#3A2E5C]"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-[#F3EEFF]">
                        {post.author.name}
                      </h4>
                      <span className="text-[10px] text-[#A99CCB]">{post.author.roleTitle}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#7C6F9B]">{post.timestamp}</span>
                </div>

                <p className="text-xs text-[#F3EEFF] leading-relaxed">{post.content}</p>

                <div className="pt-2 border-t border-[#3A2E5C] flex items-center justify-between text-xs text-[#A99CCB]">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => showToast('Upvoted post!', 'info')}
                      className="flex items-center gap-1.5 hover:text-[#FFB547]"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-[#F3EEFF]">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.replies} replies</span>
                    </button>
                  </div>

                  <button
                    onClick={() => showToast('Reported post for moderator inspection.', 'info')}
                    className="hover:text-rose-400 p-1"
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

        {/* Sidebar: Upcoming Events & Members (4 cols) */}
        <div className="lg:col-span-4 space-y-5 text-xs">
          {/* Upcoming Events */}
          <div className="nc-card p-5 space-y-3">
            <span className="font-bold text-[#F3EEFF] uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FFB547]" />
              Circle Events
            </span>

            {selectedCircle.events.length === 0 ? (
              <p className="text-[#A99CCB] text-[11px]">No upcoming events scheduled.</p>
            ) : (
              <div className="space-y-3">
                {selectedCircle.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] space-y-1.5"
                  >
                    <h4 className="font-semibold text-xs text-[#F3EEFF]">{ev.title}</h4>
                    <span className="text-[10px] text-[#2DD4BF] block">{ev.date}</span>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[#7C6F9B]">
                        {ev.attendees} RSVP'd
                      </span>
                      <button
                        onClick={() => showToast(`You RSVP'd for "${ev.title}"`, 'success')}
                        className="text-[11px] text-[#FFB547] hover:underline font-medium"
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
