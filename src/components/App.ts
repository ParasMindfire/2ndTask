import { TableComponent } from "./Table.ts";
import { FormComponent } from "./Form.ts";
import { BaseComponent } from "./Base.ts";
import { StateManagement } from "./State.ts";
import { Validation } from "./Validation.ts";
import { CustomEventHandler } from "./CustomeEvents.ts";
import { Toast } from "./Toast.ts";
import { HistoryComponent } from "./History.ts";

export class AppComponent extends BaseComponent {
    private static instance: AppComponent;
    protected table : TableComponent;
    protected form : FormComponent;
    protected stateManagement: StateManagement;
    protected validator:Validation;
    protected customEvent:CustomEventHandler;
    protected Toast:Toast;
    protected History:HistoryComponent;

    private constructor() {
        super();
        console.log("Hello App");
        this.stateManagement=StateManagement.getInstance();
        this.table=TableComponent.getInstance(this.stateManagement);
        this.form=FormComponent.getInstance(this.stateManagement);
        this.validator=new Validation();
        this.Toast=new Toast();
        this.History=HistoryComponent.getInstance(this.stateManagement);
        this.customEvent=new CustomEventHandler(this);
    }

    public static getInstance():AppComponent{
        if(!AppComponent.instance){
            AppComponent.instance=new AppComponent();
        }

        return AppComponent.instance;
    }

    render(): string {
        return `   
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

        this.customEvent.initEventListeners();
    }
}