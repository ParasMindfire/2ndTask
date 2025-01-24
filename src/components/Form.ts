import { BaseComponent } from "./Base.ts"
import { StateManagement } from "./State.ts";

export class FormComponent extends BaseComponent{
    private static instance: FormComponent;
    protected stateManager:StateManagement;
    public row:any;

    constructor(stateManager:StateManagement){
        super();
        this.stateManager=stateManager;
        this.row=null;
        // console.log("heloo form");
    }

    public static getInstance(stateManager:StateManagement): FormComponent {
        if (!FormComponent.instance) {
            FormComponent.instance = new FormComponent(stateManager);
        }
        return FormComponent.instance;
    }

    render():string{
        return `
            <div class="form-container">
                <h2>Submit Your Details</h2>
                <div id="toast" class="hide snackbar"></div>
                <form id="userForm">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <button type="submit" id="submit">Submit</button>
                </form>
            </div>
        `
    }

    mount(containerID:string):void{
        super.mount(containerID);
        document.getElementById("userForm")!.addEventListener("submit",(event)=>{
            this.handleSubmit(event);
        })
    }

    handleSubmit(event:Event):void{
        event.preventDefault();
        const name=(document.getElementById("name") as HTMLInputElement).value;
        const email=(document.getElementById("email") as HTMLInputElement).value;
        const phone=(document.getElementById("phone") as HTMLInputElement).value;

        const submit=(document.getElementById("submit") as HTMLElement);

        if(this.row==null){
            this.stateManager.addPeoples({name,email,phone});
            this.stateManager.openToast("Form Submitted Successfully","safe");
        }else{
            const cells = this.row.getElementsByTagName("td");
            const peoples = this.stateManager.getPeoples();
            const obj:{ name: string; email: string; phone: string}=peoples.find((pep:{name:string,email:string,phone:string})=>{
                return pep.email==cells[1].innerText;
            })

            const idx:number=peoples.indexOf(obj);

            peoples[idx]={name,email,phone};

            cells[0].innerText=name;
            cells[1].innerText=email;
            cells[2].innerText=phone;

            submit.innerText="Submit";
            this.row=null;

            this.stateManager.notifyStateChange();
            this.stateManager.openToast("Form edited Successfully","safe");
        }
        

        const resetForm = <HTMLFormElement>document.getElementById("userForm");
        resetForm?.reset();
    }
}