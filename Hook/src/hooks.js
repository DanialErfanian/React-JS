import {useState} from 'react';

export function useStack() {
    const [stack, setStack] = useState([]);
    let push = function (v) {
        let x = stack.slice();
        x.push(v);
        setStack(x);
    };
    let pop = function () {
        let x = stack.slice();
        x.pop();
        setStack(x);
    };
    return {stack, push, pop}
}

export function useCounter(start, finish) {
    const [count, setCount] = useState(start);
    return [count, function () {
        let x = count + 1;
        if (x > finish)
            x = start;
        setCount(x)
    }]
}

