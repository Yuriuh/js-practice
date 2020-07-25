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

const star = '*'

const starLine = (number) => {
  let line = []
  for (let i = 0; i < number; i++) {
    line.push(star())
  }
  return line
}

const starSquare = (number) => {
  let square = []
  for (let i = 0; i < number; i++) {
    square.push(starLine(number))
  }
  return square
}

const starCube = (number) => {
  let cube = []
  for (let i = 0; i < number; i++) {
    cube.push(starSquare(number))
  }
  return cube
}
