import { BaseComponent } from "./Base.ts";
import { StateManagement } from "./State.ts";

export class TableComponent extends BaseComponent {

    private static instance:TableComponent;

    protected stateManager:StateManagement;

    constructor(stateManager:StateManagement){
        super();
        this.stateManager=stateManager;
        console.log("heloo Table");
    }

    public static getInstance(stateManager:StateManagement){
        if(!TableComponent.instance){
            TableComponent.instance=new TableComponent(stateManager);
        }

        return TableComponent.instance;
    }
    
    render(): string {  
        const peoples=this.stateManager.getPeoples();

        console.log("render ",peoples) ;
        return `
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${peoples[0]?.name.length!=0 && peoples.map((people:{ name: string; email: string; phone: string }) => `
                        <tr>
                            <td>${people.name}</td>
                            <td>${people.email}</td>
                            <td>${people.phone}</td>
                            <td><button id="edit">edit</button><button id="delete">delete</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }


    mount(containerID:string):void{
        super.mount(containerID);

        document.getElementById("right")?.addEventListener("click", (event) => {
            // console.log("event ,",event);
            console.log("eventTarget ,",event.target);
            const target = event.target as HTMLElement;
            if (target.id === "edit") {
                this.handleEdit(target);
            }else if(target.id === "delete"){
                this.handleDelete(target);
            }
        });
    }

    handleEdit(element: HTMLElement): void {
        const row = element.closest("tr");
        // const peoples=this.stateManager.getPeoples();

        if (row) {
            const cells = row.getElementsByTagName("td");
            (document.getElementById("name") as HTMLInputElement).value=cells[0].innerText ;
            (document.getElementById("email") as HTMLInputElement).value=cells[1].innerText ;
            (document.getElementById("phone") as HTMLInputElement).value=cells[2].innerText;
            (document.getElementById("submit") as HTMLElement).innerText = "Edit";

            this.stateManager.buttonOnEdit(row);
        }
    }

    handleDelete(element: HTMLElement): void {
        const row = element.closest("tr");
        const peoples = this.stateManager.getPeoples();
    
        if (row) {
            const cells = row.getElementsByTagName("td");
            const emailToDelete = cells[1].innerText;

            const objIndex = peoples.findIndex((pep: { name: string; email: string; phone: string }) => {
                return pep.email === emailToDelete;
            });
    
            if (objIndex !== -1) {
                peoples.splice(objIndex, 1);
                console.log("people after delete", peoples);
                this.stateManager.notifyStateChange();
            }

            this.stateManager.openToast("Form deleted Successfully","safe");
        }
    }


}