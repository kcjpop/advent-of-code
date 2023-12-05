
namespace Day04 {
    use Utils.{readToLines}

    type alias Section = Set[Int32]
    type alias SectionRec = { start = Int32, end = Int32 }

    def toSectionRecord(xs: List[Int32]): SectionRec = {
        let empty = { start = 0, end = 0 };

        match xs {
            case start :: end :: _t => { start = start, end = end + 1 }
            case _ :: Nil => empty
            case Nil => empty
        }
    }

    def recToSet(r: SectionRec): Section = Set.range(r.start, r.end)

    ///
    /// Split "3-50" on "-", convert them to { start = 3, end = 6 }, then
    /// Set.range(3, 6) -> Set#{3, 4, 5}
    ///

    def toSectionRange(code: String): Section = code
        |> String.splitOn({ substr = "-" })
        |> List.map(Int32.fromString)
        |> Option.sequence
        |> Option.getWithDefault(Nil)
        |> toSectionRecord
        |> recToSet

    def toSections(line: String): List[Section] = line
        |> String.splitOn({ substr = "," })
        |> List.map(toSectionRange)

    def isFullyContained(s1: Section, s2: Section): Bool =
        Set.isSubsetOf(s1, s2) or Set.isSubsetOf(s2, s1)

    def checkIfContains(xs: List[Section]): Bool = match xs {
        case s1 :: s2 :: _t => isFullyContained(s1, s2)
        case _ :: Nil => false
        case Nil => false
    }

    def countCommon(xs: List[Section]): Int32 = match xs {
        case s1 :: s2 :: _t => Set.intersection(s1, s2) |> Set.size
        case _ :: Nil => 0
        case Nil => 0
    }

    // Should be Ok(526)
    pub def partOne(): Result[Int32, String] \ IO =  {
        def calc(xs: List[String]) = xs
            |> List.map(toSections >> checkIfContains)
            |> List.count(b -> b == true);

        readToLines("day04.txt") |> Result.map(calc)
        // Actually I just realized there is ||> operator that can apply a
        // pair into a function, e.g.
        //   (3, 6) ||> Set.range should return Set#{3, 4, 5}
        // which is nicer and we don't really need to define a record at all.
    }

    // Should be Ok(886)
    pub def partTwo(): Result[Int32, String] \ IO =  {
        def calc(xs: List[String]) = xs
            |> List.map(toSections >> countCommon)
            |> List.count(b -> b > 0);

        readToLines("day04.txt") |> Result.map(calc)
    }
}
