import { useEffect, useCallback, DependencyList } from "react"

export default function useDebounce<T extends (...args: any[]) => any>(
    effect: T,
    dependencies: DependencyList,
    delay: number
): void {
    const callback = useCallback(effect, dependencies)

    useEffect(() => {
        const timeout = setTimeout(callback, delay)
        return () => clearTimeout(timeout)
    }, [callback, delay])
}
