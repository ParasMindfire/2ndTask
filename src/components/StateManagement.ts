export class StateManagement{
    private static instance:StateManagement;

    private peoples: { name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}[] = [];

    private constructor(){}

    public static getInstance():StateManagement{
        if(!StateManagement.instance){
            StateManagement.instance=new StateManagement();
        }
        return StateManagement.instance;
    }

    addPeoples(people: { name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}):void{
        console.log("array ara ??")
        this.peoples.push(people);
        this.notifyStateChange(true,this.peoples);
    }

    getPeoples():{ name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}[]{
        return this.peoples;
    }

    notifyStateChange(flag:boolean,peoples: { name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}[]):void{
        document.dispatchEvent(new CustomEvent("StateChange",{detail:{flag,peoples}}));
    }

    setPeoples(peoples: { name: string; email: string; phone: string ; password:string ; gender:string ; address:string ;birthday:string}[]):void{
        this.peoples=peoples;
    }
}