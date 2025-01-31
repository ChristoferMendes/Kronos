type Result<T> = [Error, null] | [null, T];

export function errorAsValueSync<T>(fn: () => T): Result<T> {
  try {
    const result = fn();

    return [null, result];
  } catch (error) {
    const e = error as Error;
    return [e, null];
  }
}

export async function errorAsValue<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const result = await fn();

    return [null, result];
  } catch (error) {
    const e = error as Error;
    return [e, null];
  }
}
