import { BaseComponent } from "./BaseComponent.ts";
import { StateManagement } from "./StateManagement.ts";
import { ModalComponent } from "./ModalComponent.ts";

export class HistoryComponent extends BaseComponent {
    protected modal:ModalComponent;
    private static instance: HistoryComponent;
    private stateManager: StateManagement;
    private history: Array<{ name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}[]> = [];

    private constructor(stateManager: StateManagement,modal:ModalComponent) {
        super();
        this.stateManager = stateManager;
        this.modal=modal;
    }

    public static getInstance(stateManager: StateManagement,modal:ModalComponent): HistoryComponent {
        if (!HistoryComponent.instance) {
            HistoryComponent.instance = new HistoryComponent(stateManager,modal);
        }
        return HistoryComponent.instance;
    }

    render(): string {
        return `
            <div class="topbar">
                <div class="topbar-left">
                    <h2>Students Registration Form</h2>
                </div>

                <div class="topbar-right">
                    <h2>History</h2>
                    <select id="historyDropdown">
                        ${this.history.map((_, index) => `<option value="${index}">State ${index+1}</option>`).join('')}
                    </select>
                </div>
            </div>
        `;
    }

    mount(containerID: string): void {
        super.mount(containerID);
        document.getElementById("historyDropdown")!.addEventListener("change", (event) => {
            const target = event.target as HTMLSelectElement;
            this.loadState(parseInt(target.value));
        });
    }

    public updateHistory(peoples:{ name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}[]): void {
        // const peoples = this.stateManager.getPeoples();
        this.history.push([...peoples]);
        this.mount("top"); 
        const dropdown = document.getElementById("historyDropdown") as HTMLSelectElement;
        dropdown.value = (this.history.length - 1).toString();
    }

    private loadState(index: number): void {
        if (this.history[index]) {
            this.modal.openModal(this.history[index]);
            // this.stateManager.setPeoples(this.history[index]);
            // this.stateManager.notifyStateChange(false,[]);
        }
    }

    // updateStateDropdown(peoples:{ name: string; email: string; phone: string }[]){
    //     const length=this.history.length;
    //     console.log("History ",this.history);
    //     console.log("history len ",length);
    // }
}