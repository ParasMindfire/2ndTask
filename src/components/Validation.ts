// export class Validation{
//     private static instance:Validation;

//     private constructor(){};

//     public static getInstance(){
//         if(!Validation.instance){
//             Validation.instance=new Validation();
//         }

//         return Validation.instance;
//     }

//     const validateFirstName(){

//         fnameError.text("");

//         if (!firstName.trim()) {
//             fnameError.text("First name should not be empty");
//             return false;
//         }

//         fnameError.text("");
//         return true;
//     }

//     const validateEmail = () => {
//         const email = $("#mail").val();
//         const emailError = $("#mail-error");

//         emailError.text("");

//         const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         if (!emailPattern.test(email)) {
//             emailError.text("Enter the correct email id");
//             return false;
//         }

//         return true;
//     }
    
// } 