interface Props {
    statusFilter: string;
    priorityFilter: string;
    sortBy: string;
    setStatusFilter: (value: string) => void;
    setPriorityFilter: (value: string) => void;
    setSortBy: (value: string) => void;
}

export default function TaskFilters({
    statusFilter,
    priorityFilter,
    sortBy,
    setStatusFilter,
    setPriorityFilter,
    setSortBy,
}: Props) {
    return (
        <div className="mb-4 flex gap-4">
            <select
                className="rounded border p-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
            </select>

            <select
                className="rounded border p-2 text-sm"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
            >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
            </select>

            <select
                className="rounded border p-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="CREATED">Newest First</option>
                <option value="DUE_DATE">Due Date</option>
                <option value="PRIORITY">Priority</option>
            </select>
        </div>
    );
}
