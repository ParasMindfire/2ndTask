export class StateManagement{
    private static instance:StateManagement;

    private peoples: { name: string; email: string; phone: string }[] = [];

    private constructor(){}

    public static getInstance():StateManagement{
        if(!StateManagement.instance){
            StateManagement.instance=new StateManagement();
        }
        return StateManagement.instance;
    }

    addPeoples(people:{name: string; email: string; phone: string}):void{
        console.log("array ara ??")
        this.peoples.push(people);
        this.notifyStateChange();
    }

    getPeoples():{ name: string; email: string; phone: string }[]{
        return this.peoples;
    }

    notifyStateChange():void{
        document.dispatchEvent(new CustomEvent("StateChange"));
    }

    buttonOnEdit(row:any):void{
        document.dispatchEvent(new CustomEvent("onEdit",{detail:{row}}));
    }

    openToast(message:string,style:string){
        document.dispatchEvent(new CustomEvent("openToast",{detail:{message,style}}));
    }
    
}