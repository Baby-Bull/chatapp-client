export const CompareArrayMembers = (arrayA, arrayB) => {
    if (!arrayA) return undefined;
    else {
        const result = arrayA.every(el => arrayB.includes(el));
        return result;
    }
}

export const GetArrayIdFromArrayObject = (arrObj) => {
    if (!arrObj) return [];
    else
        return arrObj.map(el => el?._id);
}