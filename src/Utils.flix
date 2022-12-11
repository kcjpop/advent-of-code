namespace Utils {
    pub def readToLines(filename: String): Result[List[String], String] \ IO = {
        let path = "resources/${filename}";

        File.read(path)
        |> Result.map(String.trim >> String.lines)
    }
}
