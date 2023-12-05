namespace Day08 {
    use Utils.{readToLines}

    type alias Coord = (Int32, Int32)
    type alias ForestMapIndex = Map[Int32, Map[Int32, Char]]
    type alias ForestMap = { width = Int32, height = Int32, index = ForestMapIndex }

    def _forestMapToString(m: ForestMap) : String = "width = ${m.width}, height = ${m.height}, index = " + Map.toString(m.index)

    pub def partOne(): Result[Int32, String] \ IO =  {
        readToLines("day08.txt")
            |> Result.map(toForestMap >> calculatePartOne)
    }

    def calculatePartOne(m: ForestMap): Int32 = {
        let interior = List.range(1, m.width - 1)
            |> List.flatMap(x -> List.range(1, m.height - 1) |> List.map(y -> (x, y)));

        let interiorCount = interior
            |> List.map(checkVisible(m))
            |> List.count(x -> x == true);

        interiorCount + (m.width + m.height - 2) * 2
    }

    def toForestMap(lines: List[String]): ForestMap = {
        let width = match List.head(lines) {
            case Some(x) => String.length(x)
            case None => 0
        };
        let height = List.length(lines);
        let index = toForestMapIndex(lines);

        { width = width, height = height, index = index }
    }

    def getFromMap(c: Coord, m: ForestMap): Char = c
        ||> (x, y) -> Map.getWithDefault(x, '0', Map.getWithDefault(y, Map.empty(), m.index))

    def checkVisible(m: ForestMap, treeIndex: Coord): Bool = {
        let (x, y) = treeIndex;

        let toX = List.map(z -> (z, y));
        let toY = List.map(z -> (x, z));

        let fromLeft = List.range(0, x) |> toX;
        let fromRight = List.range(x + 1, m.width) |> toX;
        let fromTop = List.range(0, y) |> toY;
        let fromBottom = List.range(y + 1, m.height) |> toY;

        let currentIndexValue = getFromMap(treeIndex, m);
        let isVisible = List.forAll(c -> getFromMap(c, m) < currentIndexValue);

        List.exists(isVisible, fromTop :: fromRight :: fromBottom :: fromLeft :: Nil)
    }

    def zipToMap(len: Int32, xs: List[a]): Map[Int32, a] = xs
        |> List.zip(List.range(0, len))
        |> List.toMap

    def toForestMapIndex(lines: List[String]): ForestMapIndex = lines
        |> List.map(toMap)
        |> zipToMap(List.length(lines))

    def toMap(s: String): Map[Int32, Char] = String.toList(s)
        |> zipToMap(String.length(s))
}
