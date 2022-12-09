
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

    def calcPartOne(s: String): Int32 = {
        s
        |> String.splitAt(String.length(s) / 2)
        |> findShareItem
        |> Set.map(findPriority)
        |> Set.sum
    }

    ///
    /// Split the list into smaller chunks of size n.
    ///
    def chunk(n: Int32, xs: List[a]): List[List[a]] =
        def aux(acc, nn, xxs) = match List.splitAt(nn, xxs) {
            case (remain, Nil) => acc ::: remain :: Nil
            case (h, t) => aux(acc ::: h :: Nil, n, t)
        };
        aux(Nil, n, xs)

    def processChunk(lines: List[String]): Int32 = lines
        |> List.map(toSetChar)
        |> xs -> match xs {
            case h :: t => List.foldLeft(Set.intersection, h, t)
            case Nil => Set.empty()
        }
        |> Set.map(findPriority)
        |> Set.sum

    pub def partOne(): Result[Int32, String] \ IO =  readInput()
        |> Result.map(List.map(calcPartOne) >> List.sum)

    pub def partTwo(): Result[Int32, String] \ IO = readInput()
        |> Result.map(chunk(3) >> List.map(processChunk) >> List.sum)
}
