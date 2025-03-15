type CJSType = 'JS_INT' | 'JS_UINT' | 'JS_FLOAT';

interface CJSArray {
    cjsType: CJSType;
    shape: number[];
    array: Array<number | Array<number>>;
}

const makeCJSarray = <T extends unknown[]>(...params: T): CJSArray => {
    if (!Array.isArray(params[0])) {
        const array = params as number[];
        let currentType: CJSType = "JS_INT";
        let hasNegatives = false;
        array.forEach((num) => {
            if (num < 0) hasNegatives = true;
            if (num > 2147483647 && !hasNegatives) currentType = "JS_UINT";
            if (num % 1 !== 0) currentType = "JS_FLOAT";
        })
        return { cjsType: currentType, shape: [array.length], array } as CJSArray
    }
    return { cjsType: "JS_INT", shape: [1], array: [1, 2, 3, 4] };
};
