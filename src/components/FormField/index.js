import React from 'react';

// const FormField = ({ label, type, name, classe, ...rest}) => {
//     if(type === "textarea"){
//         return(
//             <div>
//                 <label>
//                     {label}
//                 </label>
//                 <textarea
//                     type = {type}
//                     {...rest}
//                 />
//             </div>
//         );
//     }else{
//         return(
//             <div>
//                 <label>
//                     {label}
//                 </label>
//                 <input
//                     type = {type}
//                     {...rest}
//                 />
//             </div>
//         );
//     }
// }


function FormField({ label, type, name, value, classe, onChange }){ 
    if(type === 'textarea'){
        return(
            <div className={classe}>
                <label htmlFor={name}>{ label }</label>
                <textarea
                   type={type}
                   name={name}
                   value={value}
                   onChange={onChange}
                />
            </div>
        );
    }else{
        return(
            <div className={classe}>
                <label htmlFor={name}>{ label }</label>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default FormField;

