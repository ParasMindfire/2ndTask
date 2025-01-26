import { BaseComponent } from "./Base.ts";
import { StateManagement } from "./State.ts";

export class HistoryComponent extends BaseComponent {
    private static instance: HistoryComponent;
    private stateManager: StateManagement;
    private history: Array<{ name: string; email: string; phone: string }[]> = [];

    private constructor(stateManager: StateManagement) {
        super();
        this.stateManager = stateManager;
        // document.addEventListener("StateChange", () => this.updateHistory());
    }

    public static getInstance(stateManager: StateManagement): HistoryComponent {
        if (!HistoryComponent.instance) {
            HistoryComponent.instance = new HistoryComponent(stateManager);
        }
        return HistoryComponent.instance;
    }

    render(): string {
        return `
            <div class="topbar">
                <h2>History</h2>
                <select id="historyDropdown">
                    ${this.history.map((_, index) => `<option value="${index}">State ${index}</option>`).join('')}
                </select>
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

    public updateHistory(): void {
        const peoples = this.stateManager.getPeoples();
        this.history.push([...peoples]);
        this.mount("top"); 
    }

    private loadState(index: number): void {
        if (this.history[index]) {
            this.stateManager.setPeoples(this.history[index]);
            this.stateManager.notifyStateChange(false);
        }
    }
}