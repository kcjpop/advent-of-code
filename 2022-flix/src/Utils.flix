namespace Utils {
    pub def readFile(filename: String): Result[String, String] \ IO = {
        let path = "resources/${filename}";

        File.read(path)
        |> Result.map(String.trim)
    }

    pub def readToLines(filename: String): Result[List[String], String] \ IO = {
        readFile(filename)
        |> Result.map(String.lines)
    }

    pub def listToPair(xs: List[a]): Option[(a, a)] = match xs {
        case f :: s :: _t => Some((f, s))
        case _ :: Nil => None
        case Nil => None
    }

    @Test
    def testListToPair01(): Bool = Assert.eq(listToPair(1 :: 2 :: Nil), Some((1, 2)))
}
