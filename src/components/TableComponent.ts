import { BaseComponent } from "./BaseComponent.ts";
import { StateManagement } from "./StateManagement.ts";

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
            <div class="table-container">
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
                                <td>
                                    <div class="tableBtn">
                                        <button id="edit">edit</button>
                                        <button id="delete">delete</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
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
            (document.getElementById("fullName") as HTMLInputElement).value=cells[0].innerText ;
            (document.getElementById("email") as HTMLInputElement).value=cells[1].innerText ;
            (document.getElementById("phone") as HTMLInputElement).value=cells[2].innerText;
            (document.getElementById("submit") as HTMLElement).innerText = "Edit";

            this.buttonOnEdit(row);
        }
    }

    buttonOnEdit(row:any):void{
        document.dispatchEvent(new CustomEvent("onEdit",{detail:{row}}));
    }

    handleDelete(element: HTMLElement): void {
        const row = element.closest("tr");
        // const peoples = this.stateManager.getPeoples();
        const oldPeoples = [...this.stateManager.getPeoples()];
    
        if (row) {
            const cells = row.getElementsByTagName("td");
            const emailToDelete = cells[1].innerText;

            // this.stateManager.notifyStateChange(true, oldPeoples);

            const objIndex = oldPeoples.findIndex((pep: { name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}) => {
                return pep.email === emailToDelete;
            });

            
            if (objIndex !== -1) {
                oldPeoples.splice(objIndex, 1);
                // console.log("people after delete", peoples);
                this.stateManager.setPeoples(oldPeoples);
                this.stateManager.notifyStateChange(true, oldPeoples);
                // this.stateManager.notifyStateChange(false, []);
            }

            this.toastCustomEvent("Form deleted Successfully","safe");
        }
    }

    toastCustomEvent(message:string,action:string):void{
        const toastDetails={message:message,action:action};
        document.dispatchEvent(new CustomEvent("onToast",{detail:{toastDetails}}))
    }


}