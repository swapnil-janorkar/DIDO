const API_URL="http://localhost:5000/tasks";

export const getTasks=async()=>{
    const r=await fetch(API_URL);
    return r.json();
};

export const createTask=async(task:{
    title:string;
    description:string;
    priority:string;
})=>{
    const r=await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(task)
    });

    return r.json();
};

export const completeTask=async(id:number)=>{
    await fetch(
        `${API_URL}/${id}/complete`,
        {
            method:"PATCH"
        }
    );
};

export const deleteTask=async(id:number)=>{
    await fetch(
        `${API_URL}/${id}`,
        {
            method:"DELETE"
        }
    );
};