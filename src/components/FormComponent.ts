import { BaseComponent } from "./BaseComponent.ts"
import { StateManagement } from "./StateManagement.ts";

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

    handleSubmit(event: Event): void {
        this.validateBeforeSubmit();
        event.preventDefault();

        // emit form sumit event with form data  
    
        const name = (document.getElementById("fullName") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const gender = (document.getElementById("gender") as HTMLInputElement).value;
        const address = (document.getElementById("address") as HTMLInputElement).value;
        const birthday = (document.getElementById("birthday") as HTMLInputElement).value;
    
        const submit = document.getElementById("submit") as HTMLElement;
    
        if (this.isValid) {
            const oldPeoples = [...this.stateManager.getPeoples()];
    
            if (this.row == null) {
                this.stateManager.addPeoples({ name, email, phone , password ,gender ,address ,birthday });
                this.toastCustomEvent("Form Submitted Successfully", "safe");
            } else {
                const cells = this.row.getElementsByTagName("td");
                
                const objIndex = oldPeoples.findIndex((pep) => pep.email === cells[1].innerText);
    
                if (objIndex !== -1) {
                    oldPeoples[objIndex] = { name, email, phone , password ,gender ,address , birthday };
                    this.stateManager.notifyStateChange(true, oldPeoples);
                    
                    cells[0].innerText = name;
                    cells[1].innerText = email;
                    cells[2].innerText = phone;
    
                    submit.innerText = "Submit";
                    this.row = null;
    
                    this.stateManager.setPeoples(oldPeoples);
                    this.stateManager.notifyStateChange(false, []);
                    
                    this.toastCustomEvent("Form Edited Successfully", "safe");
                }
            }
    
            this.isValid = true;
            (document.getElementById("userForm") as HTMLFormElement).reset();
        } else {
            this.toastCustomEvent("Enter All Fields Before Submitting", "danger");
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