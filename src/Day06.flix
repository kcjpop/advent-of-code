
namespace Day06 {
    use Utils.{readFile}

    // Should be Ok(1542)
    pub def partOne(): Result[Int32, String] \ IO =  {
        readFile("day06.txt")
        |> Result.map(String.toList >> findSignal(1))
    }

    def findSignal(n: Int32, xs: List[Char]): Int32 = {
        let s = xs |> List.take(4) |> List.toSet;
        let size = Set.size(s);

        if (size == 4) n + 3 else findSignal(n + 1, List.drop(1, xs))
    }
}
