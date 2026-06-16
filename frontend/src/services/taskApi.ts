const API_URL="http://localhost:5000/tasks";
const AUTH_URL="http://localhost:5000/auth";

const getToken=():string=>
    localStorage.getItem("token") ?? "";

const authHeaders=()=>({
    "Content-Type":"application/json",
    Authorization:`Bearer ${getToken()}`
});

export const login=async(
    email:string,
    password:string
)=>{
    const r=await fetch(`${AUTH_URL}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    });

    const data=await r.json();

    console.log("LOGIN RESPONSE",data);

    if(data.token){
        localStorage.setItem(
            "token",
            data.token
        );
    }

    return data;
};

export const getTasks=async()=>{
    const r=await fetch(API_URL,{
        headers:authHeaders()
    });
    return r.json();
};

export const createTask=async(task:{
    title:string;
    description:string;
    priority:string;
})=>{
    const r=await fetch(API_URL,{
        method:"POST",
        headers:authHeaders(),
        body:JSON.stringify(task)
    });
    return r.json();
};

export const completeTask=async(id:number)=>{
    await fetch(`${API_URL}/${id}/complete`,{
        method:"PATCH",
        headers:authHeaders()
    });
};

export const deleteTask=async(id:number)=>{
    await fetch(`${API_URL}/${id}`,{
        method:"DELETE",
        headers:authHeaders()
    });
};

export const getAnalytics = async () => {
    const r = await fetch(
        "http://localhost:5000/analytics/productivity",
        {
            headers: authHeaders()
        }
    );

    return r.json();
};