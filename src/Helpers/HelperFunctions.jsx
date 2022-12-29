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

export const formatMinutes = (minutes) => {
    return minutes < 10 ? `0${minutes}` : minutes;
}

export const formatSeconds = (seconds) => {
    return seconds < 10 ? `0${seconds}` : seconds;
}
