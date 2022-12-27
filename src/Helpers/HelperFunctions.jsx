export const CompareArrayMembers = (arrayA, arrayB) => {
    const result = arrayA.every(el => arrayB.includes(el));
    return result;
}

export const GetArrayIdFromArrayObject = (arrObj) => {
    arrObj.map(el => el?._id)
}