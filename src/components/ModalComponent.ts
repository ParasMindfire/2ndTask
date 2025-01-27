import { BaseComponent } from "./BaseComponent"
import { StateManagement } from "./StateManagement";



export class ModalComponent extends BaseComponent{
    private static instance:ModalComponent;
    protected stateManagement:StateManagement;

    private peoples: { name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}[] = [];

    public constructor(stateManagement:StateManagement){
        super()
        this.stateManagement=stateManagement
    };

    public static getInstance(stateManagement:StateManagement){
        if(!ModalComponent.instance){
            ModalComponent.instance=new ModalComponent(stateManagement);
        }

        return ModalComponent.instance;
    }

    render():string{
        return `
            <div class="modal-wrapper">
                <div class="table-container">
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.peoples[0]?.name.length!=0 && this.peoples.map((people:{ name: string; email: string; phone: string }) => `
                                <tr>
                                    <td>${people.name}</td>
                                    <td>${people.email}</td>
                                    <td>${people.phone}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div id="modalButtons">
                        <button id="restore">Restore</button>
                        <button id="close">Close</button>
                    </div>
                </div>
            </div>
        `
    }

    mount(containerID:string){
        super.mount(containerID);
        this.closeModal();
        this.restoreState();
    }

    openModal(person:{ name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}[]):void{
        const modal=document.getElementById("modal") as HTMLInputElement;
        this.peoples=person;
        modal.classList.remove("hide");
        ModalComponent.instance.mount("modal")
        console.log("person ",this.peoples);
    }

    closeModal():void{
        const close =document.getElementById("close") as HTMLInputElement;

        close.addEventListener("click",()=>{
            const modal=document.getElementById("modal") as HTMLInputElement;

            modal.classList.add("hide");
        })
    }

    restoreState():void{
        const restore =document.getElementById("restore") as HTMLInputElement;

        restore.addEventListener("click",()=>{
            const modal=document.getElementById("modal") as HTMLInputElement;

            modal.classList.add("hide");
        })

        this.stateManagement.setPeoples(this.peoples);
        this.stateManagement.notifyStateChange(false,[]);
    }

    // onRestoreClick():void{
    //     document.dispatchEvent(new CustomEvent("onEdit",{detail:{row}}));
    // }

}