import { Task } from "@/src/types/task";

interface Props {
    editingTask: Task | null;
    editForm: {
        title: string;
        description: string;
        priority: string;
        due_date: string;
        category: string;
        estimated_duration: number;
    };
    setEditingTask: (task: Task | null) => void;
    setEditForm: React.Dispatch<React.SetStateAction<any>>;
    handleEditSubmit: (e: React.FormEvent) => void;
}

export default function TaskEditModal({
    editingTask,
    editForm,
    setEditingTask,
    setEditForm,
    handleEditSubmit,
}: Props) {
    if (!editingTask) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

                <h2 className="mb-6 text-xl font-bold">Edit Task</h2>

                <form onSubmit={handleEditSubmit} className="space-y-4">

                    <input
                        className="w-full rounded border p-2"
                        placeholder="Title"
                        value={editForm.title}
                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                        required
                    />

                    <textarea
                        className="w-full rounded border p-2"
                        placeholder="Description"
                        value={editForm.description}
                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                        rows={3}
                    />

                    <select
                        className="w-full rounded border p-2"
                        value={editForm.priority}
                        onChange={e => setEditForm({ ...editForm, priority: e.target.value })}
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="CRITICAL">CRITICAL</option>
                    </select>

                    <input
                        className="w-full rounded border p-2"
                        type="date"
                        value={editForm.due_date}
                        onChange={e => setEditForm({ ...editForm, due_date: e.target.value })}
                    />

                    <input
                        className="w-full rounded border p-2"
                        placeholder="Category"
                        value={editForm.category}
                        onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                    />

                    <input
                        className="w-full rounded border p-2"
                        type="number"
                        placeholder="Duration (min)"
                        value={editForm.estimated_duration}
                        onChange={e => setEditForm({ ...editForm, estimated_duration: Number(e.target.value) })}
                    />

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="flex-1 rounded bg-zinc-200 px-4 py-2 hover:bg-zinc-300"
                            onClick={() => setEditingTask(null)}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
