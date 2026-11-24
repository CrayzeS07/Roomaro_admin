export class ApiError extends Error {constructor(public status:number,message:string){super(message);}}
export async function api<T>(url:string, options:RequestInit={}):Promise<T>{
  const response=await fetch(url,{...options,credentials:'include',headers:{'Content-Type':'application/json', 'X-Roomora-Client':'web',...(options.headers||{})}});
  const body=await response.json().catch(()=>({}));
  if(!response.ok) throw new ApiError(response.status,body.error||'Server bilan bog‘lanib bo‘lmadi.');
  return body as T;
}
export const post = <T>(url:string,body:unknown)=>api<T>(url,{method:'POST',body:JSON.stringify(body)});
