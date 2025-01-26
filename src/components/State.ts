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
        this.notifyStateChange(true);
    }

    getPeoples():{ name: string; email: string; phone: string }[]{
        return this.peoples;
    }

    notifyStateChange(flag:boolean):void{
        document.dispatchEvent(new CustomEvent("StateChange",{detail:{flag}}));
    }

    setPeoples(peoples: { name: string; email: string; phone: string }[]):void{
        this.peoples=peoples;
    }
}