import { TableComponent } from "./Table.ts";
import { FormComponent } from "./Form.ts";
import { BaseComponent } from "./Base.ts";
import { StateManagement } from "./State.ts";

export class AppComponent extends BaseComponent {
    private static instance: AppComponent;
    protected table : TableComponent;
    protected form : FormComponent;
    protected stateManagement: StateManagement;

    private constructor() {
        super();
        console.log("Hello App");
        this.stateManagement=StateManagement.getInstance();
        this.table=TableComponent.getInstance(this.stateManagement);
        this.form=FormComponent.getInstance(this.stateManagement);
    }

    public static getInstance():AppComponent{
        if(!AppComponent.instance){
            AppComponent.instance=new AppComponent();
        }

        return AppComponent.instance;
    }

    render(): string {
        return `   
            <div id="left">
            </div>

            <div id="right">
            </div>
        `;
    }

    openToast(message:string,action:string){
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

    mount(containerID:string): void {
        super.mount(containerID);
        this.form.mount("left");
        this.table.mount("right");

        document.addEventListener("StateChange",()=>{
            this.table.mount("right");
        })

        document.addEventListener("onEdit",(e:Event)=>{
            this.form.row=(e as CustomEvent).detail.row;
        })

        document.addEventListener("openToast",(e:Event)=>{
            this.openToast((e as CustomEvent).detail.message,(e as CustomEvent).detail.style);
        })
    }
}