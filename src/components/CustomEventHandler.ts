export class CustomEventHandler {
    private appInstance: any;

    constructor(appInstance: any) {
        this.appInstance = appInstance;
    }

    public initEventListeners(): void {
        document.addEventListener("StateChange", (e:Event) => {
            const {flag,peoples}=(e as CustomEvent).detail;
            if(flag)this.appInstance.History.updateHistory(peoples);
            this.appInstance.table.mount("right");
            // this.appInstance.History.updateStateDropdown(peoples);
        });

        document.addEventListener("onEdit", (e: Event) => {
            this.appInstance.form.row = (e as CustomEvent).detail.row;
        });

        document.addEventListener("onBlurValidation", (e: Event) => {
            const { field, value } = (e as CustomEvent).detail.details;
            // console.log("app field", field);
            this.appInstance.validator.validateField(field, value);
        });

        document.addEventListener("beforeSubmit", () => {
            const areAllValid:boolean=this.appInstance.validator.validateFormBeforeSubmit();
            this.appInstance.form.isValid = areAllValid
            // console.log("Are All Valid",areAllVAlid);
        });
        
        document.addEventListener("onToast",(e : Event)=>{
            const { message, action } = (e as CustomEvent).detail.toastDetails;
            this.appInstance.Toast.openToast(message,action);
        })
    }
}
