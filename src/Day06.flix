
namespace Day06 {
    use Utils.{readFile}

    // Should be Ok(1542)
    pub def partOne(): Result[Int32, String] \ IO =  {
        readFile("day06.txt")
        |> Result.map(String.toList >> findSignal(1, 4))
    }

    pub def partTwo(): Result[Int32, String] \ IO =  {
        readFile("day06.txt")
        |> Result.map(String.toList >> findSignal(1, 14))
    }

    def findSignal(n: Int32, distinctSize: Int32, xs: List[Char]): Int32 = {
        let s = xs |> List.take(distinctSize) |> List.toSet;
        let size = Set.size(s);

        if (size == distinctSize) n + distinctSize - 1
        else findSignal(n + 1, distinctSize, List.drop(1, xs))
    }
}
