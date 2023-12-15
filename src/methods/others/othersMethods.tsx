

export const cleanMessage = (func: Function, text: string, time: number) => {
    setTimeout(() => {
        func(text);
    }, time);
}