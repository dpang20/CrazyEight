// hoffy.mjs
const getEvenParam = (...args) =>
{
    return args.filter((_, index) => index % 2 === 0);
}

const maybe = (fn) =>
{
    return function(...args)
    {
        if(args.some(arg => arg === null || arg === undefined))
        {
            return undefined;
        }
        return fn(...args);
    }
}

export function filterWith() { 
    throw new Error("Implement me!");
}

export function repeatCall() { 
    throw new Error("Implement me!");
}

export function limitCallsDecorator() { 
    throw new Error("Implement me!");
}

export function rowsToObjects() { 
    throw new Error("Implement me!");
}



export
{
    getEvenParam,
    maybe
};