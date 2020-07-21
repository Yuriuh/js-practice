var log = console.log.bind(console)

function randomNum(m, n) {
  if(n < m) return undefined   
  var r = (Math.random() * (n-m) + m)  
  return Math.floor(r)  
}

function findIndex(s1, s2) {
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] === s2) return i
  }
  return -1
}

function shiftChar(char, step=0) {
  const LOWERS = 'abcdefghijklmnopqrstuvwxyz'
  const UPPERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerIndex = findIndex(LOWERS, char)
  const upperIndex = findIndex(UPPERS, char)
  if (lowerIndex > -1) {
    const index = (lowerIndex + step + 26) % 26
    return LOWERS[index]
  }
  if (upperIndex > -1) {
    const index = (upperIndex + step + 26) % 26
    return UPPERS[index]
  }
  return char
}

// log(shiftChar('a', 1))

function encode(string, step) {
  let result = ''
  for (let i = 0; i < string.length; i++) {
    const s = shiftChar(string[i], step)
    result += s
  }
  return result
}

function encodeRandom(string) {
  let result = ''
  const step = randomNum(1, 26)
  for (let i = 0; i < string.length; i++) {
    const s = shiftChar(string[i], step)
    result += s
  }
  log('result in encode random', result)
  return result
}

log(encode('abc', 1))

function decode(string, step) {
  let result = ''
  for (let i = 0; i < string.length; i++) {
    const s = shiftChar(string[i], -step)
    result += s
  }
  return result
}

function decodeLoop(string) {
  let result = []
  for (let i = 0; i < 26; i++) {
    const r = decode(string, i)
    result.push(r)
  }
  return result
}

let randomString = encodeRandom('I miss you, but I can not say')

log(decodeLoop(randomString))
