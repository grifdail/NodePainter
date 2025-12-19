import { JavascriptFunction } from "../../Types/CodeBlock/JavascriptFunction";


export const createDefaultJavascriptFunction = (): JavascriptFunction => {
    return {
        code: `
return function (inputs) {
    //Your code here...
    
    return {
        //Your return value here
    }
}
    `,
        isModified: false,
        inputVariables: [],
        outputVariables: [],
    };
};
