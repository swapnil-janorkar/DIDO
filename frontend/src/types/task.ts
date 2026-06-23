export interface Task{
    id:number;
    title:string;
    description:string;
    priority:string;
    completed:boolean;
    created_at:string;
    due_date?:string;
    category?:string;
    estimated_duration?:number;
}