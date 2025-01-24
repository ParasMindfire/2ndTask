export abstract class BaseComponent{
    abstract render():string;
    mount(containerID:string){
        document.getElementById(containerID)!.innerHTML=this.render();
    }
}