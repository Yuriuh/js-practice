function starCube(number) {
  let cube = []
  for (let i = 0; i < number; i++) {
    let square = []
    for (let i = 0; i < number; i++) {
      let line = []
      for (let i = 0; i < number; i++) {
        line.push('*')
      }
      square.push(line)
    }
    cube.push(square)
  }
  return cube
}

var star = () => '*'

var starLine = (number) => {
  let line = []
  for (let i = 0; i < number; i++) {
    line.push(star())
  }
  return line
}

var starSquare = (number) => {
  let square = []
  for (let i = 0; i < number; i++) {
    square.push(starLine(number))
  }
  return square
}

var starCube = (number) => {
  let cube = []
  for (let i = 0; i < number; i++) {
    cube.push(starSquare(number))
  }
  return cube
}
