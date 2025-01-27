export class Toast{
    private static instance:Toast;

    private constructor(){};

    public static getInstance():Toast{
        if(!Toast.instance){
            Toast.instance=new Toast();
        }

        return Toast.instance;
    }
    
    public openToast(message:string,action:string){
        const toaster=document.getElementById("toast");   
        if(toaster){
            toaster.classList.remove("hide");
            if(action=="safe"){
                toaster.style.backgroundColor="green";
                toaster.innerText=message;
            }else{
                toaster.style.backgroundColor="red";
                toaster.innerText=message;
            }

            setTimeout(()=>{
                toaster.innerText="";
                toaster.classList.add("hide");
            },3000)
        }
    }
}