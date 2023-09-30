// hoffy.mjs
import {readFile} from 'fs';

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

const filterWith = (fn) =>
{
    return function(arr)
    {
        return arr.filter(fn);
    };
}

const repeatCall = (fn, n, arg) =>
{
    const callFn = (n) =>
    {
        if(n <= 0)
        {
            return ;
        }
        fn(arg);
        callFn(n-1);
    }

    callFn(n);
}

const limitCallsDecorator = (fn, n) =>
{
    let count = 0;

    return function(...args)
    {
        if(count < n)
        {
            count++;
            return fn(...args)
        }
        return undefined;
    };
}


const myReadFile = (fileName, successFn, errorFn) =>
{
    readFile(fileName, 'utf-8', (err, data) =>
    {
        if(err)
        {
            errorFn(err);
        }
        else
        {
            successFn(data);
        }
    });
}

const rowsToObjects = (data) =>
{
    const {headers, rows} = data;

    return rows.map(row =>
        {
            return headers.reduce((acc, header, index) =>
            {
                acc[header] = row[index];
                return acc;
            }, {});
        });
}

export
{
    getEvenParam,
    maybe,
    filterWith,
    repeatCall,
    limitCallsDecorator,
    myReadFile,
    rowsToObjects
};