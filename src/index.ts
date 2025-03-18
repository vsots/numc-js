type CJSType = 'JS_INT' | 'JS_UINT' | 'JS_FLOAT';

interface CJSArray {
    cjsType: CJSType;
    shape: number[];
    value: unknown[] | number;
}

const makeCJSArray = <T extends (unknown[] | number)>(numbers: T): CJSArray => {
    if (Array.isArray(numbers)) {
        const shape = [numbers.length];
        let elem = numbers[0];
        while (Array.isArray(elem)) {
            shape.push(elem.length);
            elem = elem[0];
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

        return { cjsType: currentType, shape, value: numbers } as CJSArray;
    }
    
    const num = numbers as number;
    let currentType: CJSType = "JS_INT";
    if (num > 2147483647) currentType = "JS_UINT";
    if (num % 1 !== 0) currentType = "JS_FLOAT";
    return { cjsType: currentType, shape: [1], value: num } as CJSArray;
};
