function cachedFib(n) {
  if (!cachedFib.answers) {
    cachedFib.answers = {}
  }
  if (cachedFib.answers[n] !== undefined) {
    return cachedFib.answers[n]
  }
  if (n <= 0) return
  if (n === 1 || n === 2) {
    return 1
  } else {
    return cachedFib.answers[n] = (fib(n - 1) + fib(n - 2))
  }
}

// 1 1 2 3 5 8 13
// f(3) = f(2) + f(1)
// f(1) = f(2) = 1

// 递归实现
function fib(n) {
  if (n <= 0) return
  if (n === 1 || n === 2) {
    return 1
  } else {
    return fib(n - 1) + fib(n - 2)
  }
}

// 循环实现
function fib2(n) {
  let fibArr = [1, 1]
  if (n <= 0) return
  if (n === 1 || n === 2) {
    return 1
  }
  for (let i = 2; i < n; i++) {
    fibArr[i] = fibArr[i - 2] + fibArr[i - 1]
  }
  return fibArr[n - 1]
}

console.time('fib1 test')
fib(45)
console.timeEnd('fib1 test')


const memo = (fn) => {
  const hash = {}
  return function () {
    const firstParam = arguments[0]
    if (hash[firstParam]) {
      return hash[firstParam]
    } else {
      return hash[firstParam] = fn(firstParam)
    }
  }
}

const x2 = memo((x) => {
  console.log('执行了一次')
  return x * 2
})
// 第一次调用 x2(1)
console.log(x2(1)) // 打印出执行了，并且返回2
// 第二次调用 x2(1)
console.log(x2(1)) // 不打印执行，并且返回上次的结果2
// 第三次调用 x2(1)
console.log(x2(1)) // 不打印执行，并且返回上次的结果2
