export class Validation {
    private validationRules: { [key: string]: RegExp } = {
        fullName: /^[a-zA-Z\s]+$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /^[0-9]{10}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        gender: /^(Male|Female|Other)$/,
        address: /^.+$/,
        birthday: /^\d{4}-\d{2}-\d{2}$/
    };

    private errorMessages: { [key: string]: string } = {
        fullName: "Full name must contain only letters and spaces.",
        email: "Please enter a valid email address.",
        phone: "Phone number must be 10 digits.",
        password: "Password must contain at least 8 characters, including uppercase, lowercase, and a number.",
        gender: "Please select a valid gender.",
        address: "Address cannot be empty.",
        birthday: "Please enter a valid date (YYYY-MM-DD)."
    };


    validateField(field: string, value: string): boolean {
        // console.log("field ",field)
        const isValid = this.validationRules[field]?.test(value);
        // console.log("Is Valid ? ",isValid);
        this.showValidationMessage(field, isValid);

        return isValid;
    }

    private showValidationMessage(field: string, isValid: boolean): void {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            if (!isValid) {
                errorElement.textContent = this.errorMessages[field];
                setTimeout(() => {
                    errorElement.textContent = "";
                }, 3000);
            } else {
                errorElement.textContent = "";
            }
        }
    }

    public validateFormBeforeSubmit(): boolean {
        let allValid = true;
        for (const field in this.validationRules) {
            const inputElement = document.getElementById(field) as HTMLInputElement;
            if (inputElement) {
                const value = inputElement.value.trim();
                const isValid = this.validateField(field, value);
                if (!isValid) {
                    allValid = false;
                }

                // console.log("field ",field);
                // console.log("value ",value);
                // console.log("is VAlid before",allValid);
            }
            
        }
        return allValid;
    }
}
