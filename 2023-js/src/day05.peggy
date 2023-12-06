primary
  = seeds map*

seeds
  = "seeds:" integer* nl

map
  = name:map_name lines:integer_line* { return {...name, lines: lines.map(line => line[0]) } }

integer_line
  = integer+ nl

integer "integer"
  = _ [0-9]+ _ { return parseInt(text(), 10); }

map_name
  = from:[a-z]* "-to-" to:[a-z]+ " map:\n" { return {from: from.join(''), to: to.join('')} }

nl
 = [ \n]*

_ "whitespace"
  = [ ]*
