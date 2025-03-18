type CJSType = 'JS_INT' | 'JS_UINT' | 'JS_FLOAT';

interface CJSArray {
    cjsType: CJSType;
    shape: number[];
    array: unknown[];
}

const makeCJSArray = <T extends unknown[]>(numbers: T): CJSArray => {
    const shape = [numbers.length];
    let elem = numbers[0];
    if (Array.isArray(elem)) {
        while (Array.isArray(elem)) {
            shape.push(elem.length);
            elem = elem[0];
        }
    }

    let currentType: CJSType = "JS_INT";
    let hasNegatives = false;
    const discernType = (num: number): CJSType => {
        if (num < 0) hasNegatives = true;
        else if (num > 2147483647 && !hasNegatives) currentType = "JS_UINT";
        if (num % 1 !== 0) currentType = "JS_FLOAT";
        return currentType;
    }

    const loopNArray = (arr: unknown[]) => {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) loopNArray(arr[i] as unknown[]);
            else currentType = discernType(arr[i] as number);
        }
    }

    loopNArray(numbers);

    return { cjsType: currentType, shape, array: numbers } as CJSArray
};
