import { TableComponent } from "./TableComponent.ts";
import { FormComponent } from "./FormComponent.ts";
import { BaseComponent } from "./BaseComponent.ts";
import { StateManagement } from "./StateManagement.ts";
import { Validation } from "./Validation.ts";
import { CustomEventHandler } from "./CustomEventHandler.ts";
import { Toast } from "./Toast.ts";
import { HistoryComponent } from "./HistoryComponent.ts";
import { ModalComponent } from "./ModalComponent.ts";

export class AppComponent extends BaseComponent {
    private static instance: AppComponent;
    protected table : TableComponent;
    protected form : FormComponent;
    protected stateManagement: StateManagement;
    protected validator:Validation;
    protected customEvent:CustomEventHandler;
    protected Toast:Toast;
    protected History:HistoryComponent;
    protected Modal:ModalComponent;
                                        
    private constructor() {
        super();
        console.log("Hello App");
        this.stateManagement=StateManagement.getInstance();
        this.table=TableComponent.getInstance(this.stateManagement);
        this.form=FormComponent.getInstance(this.stateManagement);
        this.validator=Validation.getInstance();
        this.Toast=Toast.getInstance();
        this.customEvent=new CustomEventHandler(this);
        this.Modal=ModalComponent.getInstance(this.stateManagement);
        this.History=HistoryComponent.getInstance(this.stateManagement,this.Modal);
    }

    public static getInstance():AppComponent{
        if(!AppComponent.instance){
            AppComponent.instance=new AppComponent();
        }

        return AppComponent.instance;
    }

    render(): string {
        return `  
            <div class="hide" id="modal">
            </div>
        
            <div id="top">
            </div>

            <div id="mainComponent">
                <div id="left">
                </div>

                <div id="right">
                </div>
            </div>
        `;
    }

    mount(containerID:string): void {
        super.mount(containerID);
        this.History.mount("top");
        this.form.mount("left");
        this.table.mount("right");
        this.Modal.mount("modal");
        this.customEvent.initEventListeners();
    }
}