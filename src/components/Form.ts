import { BaseComponent } from "./Base.ts"
import { StateManagement } from "./State.ts";

export class FormComponent extends BaseComponent{
    private static instance: FormComponent;
    protected stateManager:StateManagement;
    public row:any;
    public isValid:boolean;

    constructor(stateManager:StateManagement){
        super();
        this.stateManager=stateManager;
        this.row=null;
        this.isValid=true;
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
                        <input type="text" id="fullName" name="fullName">
                        <span id="fullName-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" id="email" name="email">
                        <span id="email-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="text" id="phone" name="phone">
                        <span id="phone-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="text" id="password" name="password">
                        <span id="password-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender:</label>
                        <select id="gender" name="gender">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <span id="gender-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="address">Address:</label>
                        <input type="text" id="address" name="address">
                        <span id="address-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="birthday">Birthday:</label>
                        <input type="date" id="birthday" name="birthday">
                        <span id="birthday-error" class="error-message"></span>
                    </div>
                    <button type="submit" id="submit" class="btn">Submit</button>
                </form>
            </div>
        `;
    }

    mount(containerID:string):void{
        super.mount(containerID);
        document.getElementById("userForm")!.addEventListener("submit",(event)=>{
            this.handleSubmit(event);
        })
        this.handleValidation();
    }

    handleSubmit(event:Event):void{

        this.validateBeforeSubmit();

        console.log("IsvALid main",this.isValid);

        event.preventDefault();
        const name=(document.getElementById("fullName") as HTMLInputElement).value;
        const email=(document.getElementById("email") as HTMLInputElement).value;
        const phone=(document.getElementById("phone") as HTMLInputElement).value;

        const submit=(document.getElementById("submit") as HTMLElement);

        if(this.isValid){
            if(this.row==null){
                this.stateManager.addPeoples({name,email,phone});
                this.toastCustomEvent("Form Submitted Successfully","safe");
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
    
                this.stateManager.notifyStateChange(true);
                this.toastCustomEvent("Form edited Successfully","safe");
            }

            this.isValid=true;

            const resetForm = <HTMLFormElement>document.getElementById("userForm");
            resetForm?.reset();
        }else{
            this.toastCustomEvent("Enter All Fields Before Submitting","danger");
        }   
    }

    toastCustomEvent(message:string,action:string):void{
        const toastDetails={message:message,action:action};
        document.dispatchEvent(new CustomEvent("onToast",{detail:{toastDetails}}))
    }

    validateBeforeSubmit():void{
        document.dispatchEvent(new CustomEvent("beforeSubmit"));
    }

    handleValidation(): void {
        const inputs = document.querySelectorAll<HTMLInputElement>("#userForm input, #userForm select");
        inputs.forEach(input => {
            input.addEventListener("blur", () => {
                // console.log("form Input",input.name);
                this.validationOnBlur({field:input.name,value:input.value})
            });
        });
    }

    validationOnBlur(details: { field: string, value: string }){
        // console.log("State field",details.field);
        document.dispatchEvent(new CustomEvent("onBlurValidation",{detail:{details}}));
    }
}