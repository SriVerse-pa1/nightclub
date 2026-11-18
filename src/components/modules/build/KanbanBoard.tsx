import React, { useState } from 'react';
import { Project, KanbanTask } from '../../../types';
import { Plus, Clock, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface KanbanBoardProps {
  project: Project;
  onMoveTask: (taskId: string, newStatus: 'todo' | 'in_progress' | 'done') => void;
  onAddTask: (task: Omit<KanbanTask, 'id'>) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  project,
  onMoveTask,
  onAddTask,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAssigneeId, setNewAssigneeId] = useState(project.members[0]?.id || '');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High'>('High');
  const [newDueDate, setNewDueDate] = useState('Nov 25');
  const [filterPriority, setFilterPriority] = useState<'all' | 'High' | 'Medium'>('all');

  const visibleTasks = filterPriority === 'all'
    ? project.tasks
    : project.tasks.filter((t) => t.priority === filterPriority);

  const columns: Array<{
    id: 'todo' | 'in_progress' | 'done';
    title: string;
    count: number;
  }> = [
    {
      id: 'todo',
      title: 'To Do',
      count: visibleTasks.filter((t) => t.status === 'todo').length,
    },
    {
      id: 'in_progress',
      title: 'Doing',
      count: visibleTasks.filter((t) => t.status === 'in_progress').length,
    },
    {
      id: 'done',
      title: 'Done',
      count: visibleTasks.filter((t) => t.status === 'done').length,
    },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const assignee = project.members.find((m) => m.id === newAssigneeId) || project.members[0];

    onAddTask({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Coordinate with complementary team member',
      status: 'todo',
      assignee,
      priority: newPriority,
      dueDate: newDueDate,
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Board Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
            Team Tasks & Sprints
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#E7DCCB] border border-[#DCD1C0] text-[#29251F] font-medium">
            {visibleTasks.length} tasks
          </span>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 ml-2">
            {(['all', 'High', 'Medium'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-colors ${
                  filterPriority === p
                    ? 'bg-[#805536] text-white shadow-sm'
                    : 'bg-[#FFFFFF] border border-[#DCD1C0] text-[#665E54] hover:text-[#29251F]'
                }`}
              >
                {p === 'all' ? 'All' : `${p} Priority`}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="nc-button-primary text-xs py-1.5 px-3"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = visibleTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="bg-[#E7DCCB]/40 border border-[#DCD1C0] rounded-2xl p-3 sm:p-4 flex flex-col min-h-[420px]"
            >
              {/* Col Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCD1C0]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md border border-[#DCD1C0] bg-[#FFFFFF] text-[#29251F] shadow-sm">
                    {col.title}
                  </span>
                  <span className="text-xs text-[#8C8173] font-semibold">{col.count}</span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#DCD1C0] rounded-xl text-xs text-[#8C8173]">
                    <span>No tasks in {col.title}</span>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="nc-card p-3.5 hover:border-[#805536] space-y-2.5 transition-all text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-[#29251F] text-xs leading-snug">
                          {task.title}
                        </h4>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold shrink-0 ${
                            task.priority === 'High'
                              ? 'bg-[#805536]/10 text-[#805536] border border-[#805536]/30'
                              : task.priority === 'Medium'
                              ? 'bg-[#E7DCCB] text-[#29251F] border border-[#DCD1C0]'
                              : 'bg-[#F3EDE3] text-[#665E54] border border-[#DCD1C0]'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#665E54] line-clamp-2">
                        {task.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-[#DCD1C0] text-[11px]">
                        {/* Assignee */}
                        <div className="flex items-center gap-1.5">
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            className="w-5 h-5 rounded-full object-cover border border-[#DCD1C0]"
                          />
                          <span className="text-[#665E54] truncate max-w-[80px]">
                            {task.assignee.name.split(' ')[0]}
                          </span>
                        </div>

                        {/* Due Date */}
                        <div className="flex items-center gap-1 text-[#8C8173]">
                          <Clock className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>

                      {/* Move Quick Actions */}
                      <div className="flex items-center justify-end gap-1.5 pt-1">
                        {col.id !== 'todo' && (
                          <button
                            onClick={() =>
                              onMoveTask(
                                task.id,
                                col.id === 'done' ? 'in_progress' : 'todo'
                              )
                            }
                            className="p-1 rounded bg-[#FFFFFF] border border-[#DCD1C0] text-[#665E54] hover:text-[#29251F] hover:border-[#805536] text-[10px] flex items-center gap-0.5"
                            title="Move back"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {col.id !== 'done' && (
                          <button
                            onClick={() =>
                              onMoveTask(
                                task.id,
                                col.id === 'todo' ? 'in_progress' : 'done'
                              )
                            }
                            className="p-1 px-2 rounded bg-[#805536] hover:bg-[#6C462B] text-white text-[10px] flex items-center gap-0.5 font-medium transition-colors shadow-sm"
                            title="Advance status"
                          >
                            <span>Move</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29251F]/40 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-card-hover">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCD1C0]">
              <h3 className="font-heading font-bold text-base text-[#29251F]">
                Add Task to {project.title.split('—')[0]}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#665E54] hover:text-[#29251F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#665E54] mb-1 font-medium">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Fine-tune Whisper on dialect data"
                  className="w-full nc-input"
                />
              </div>

              <div>
                <label className="block text-[#665E54] mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detailed deliverables or notes..."
                  className="w-full nc-input resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#665E54] mb-1 font-medium">Assignee</label>
                  <select
                    value={newAssigneeId}
                    onChange={(e) => setNewAssigneeId(e.target.value)}
                    className="w-full nc-input"
                  >
                    {project.members.map((m) => (
                      <option key={m.id} value={m.id} className="bg-white text-[#29251F]">
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#665E54] mb-1 font-medium">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full nc-input"
                  >
                    <option value="High" className="bg-white text-[#29251F]">High</option>
                    <option value="Medium" className="bg-white text-[#29251F]">Medium</option>
                    <option value="Low" className="bg-white text-[#29251F]">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#665E54] mb-1 font-medium">Due Date</label>
                <input
                  type="text"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full nc-input"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="nc-button-secondary py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="nc-button-primary py-2 px-4">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
