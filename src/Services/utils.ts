export function copyAndRemoveKey(searchParams: URLSearchParams, keyToRemove: string): URLSearchParams {
    return new URLSearchParams(Array.from(searchParams).filter(([key]) => key !== keyToRemove));
}

export function enumFromStringValue<T>(enm: { [s: string]: T }, value: string | null): T | undefined {
    if (value == null) {
        return undefined;
    }
    return (Object.values(enm) as unknown as string[]).includes(value)
        ? value as unknown as T
        : undefined;
}