
namespace Day03 {
    def readInput(): Result[List[String], String] \ IO = {
        let path = "resources/day03.txt";

        File.read(path)
        |> Result.map(String.trim >> String.lines)
    }

    def toSetChar(str: String): Set[Char] = str
        |> String.toList
        |> List.foldLeft((s, i) -> Set.insert(i, s), Set.empty())


    def findShareItem(pair: (String, String)): Set[Char] = Set.intersection(
        fst(pair) |> toSetChar,
        snd(pair) |> toSetChar
    )

    def findPriority(c: Char): Int32 = match Char.toInt32(c) {
        case i if i >= 65 and i <= 90 => i - 38     // A-F
        case i if i >= 97 and i <= 122 => i - 96    // a-z
        case _ => 0
    }

    def calc(s: String): Int32 = {
        s
        |> String.splitAt(String.length(s) / 2)
        |> findShareItem
        |> Set.map(findPriority)
        |> Set.sum
    }

    pub def partOne(): Result[Int32, String] \ IO =  readInput()
        |> Result.map(List.map(calc) >> List.sum)
}
