(use ./helpers)

(defn process-race
  "Calculate how many ways to win a race"
  [time record]
  (var count 0)
  (for speed 1 time
    (let [remaining-time (- time speed)
          traveled-distance (* speed remaining-time)]
      (+= count (if (> traveled-distance record) 1 0))))
  count)

(defn p1
  [input]
  (def peg
    (peg/compile ~{:main (* :time :s :distance -1)
                   :time (group (* "Time:" (any :num)))
                   :distance (group (* "Distance:" (any :num)))
                   :num (* (any :s) (number :d+))}))
  (let [[time distance] (peg/match peg input)]
    (* ;(map process-race time distance))))

(defn p2
  [input]
  (def no-space (string/replace-all " " "" input))
  (def peg
    (peg/compile ~{:main (* :a+ ":" (number :d+) :s :a+ ":" (number :d+))}))
  (def [time record] (peg/match peg no-space))
  # The weird thing for me is this takes around 1.8s to calculate, while the
  # JavaScript counterpart only takes 200-300ms.
  (process-race time record))

(def input (read-file "input/day06.txt"))
(def sample ```Time:      7  15   30
Distance:  9  40  200```)

(comment
  (print (p1 sample))
  (print (p1 input))
  (print (p2 sample))
  (print (p2 input)))
