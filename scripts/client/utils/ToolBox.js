function merge(defaults, other){
  var out = {}
  for(var key in defaults){
  	out[key] = defaults[key]
  }
  for(key in other){
  	out[key] = other[key]
  }
  return out
}

export {merge}