(defn read-file
  "Read and trim a file"
  [filepath]
  (-> (slurp filepath) string/trim))
