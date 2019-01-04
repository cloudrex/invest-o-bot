export default abstract class GameMath {
    public static changePercent(initial: number, change: number): number {
        return (change / initial) * 100;
    }
}