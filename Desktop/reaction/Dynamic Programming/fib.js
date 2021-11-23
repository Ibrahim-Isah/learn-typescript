// Implement a fibonacci series using the dynamic programming principles and make the time complexity of the code not to be an exponential
const fib = (n, memo = {}) => {
  //where n is the number given to find the fib
  if (n in memo) return memo[n]; //This is where the main memoization takes place where it return a value if its in the memo
  if (n <= 2) return 1; // When we have a root of 2 we dont want to go any lower
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo); // This is where the recursion takes place until the root is reached
  return memo[n];
};

console.log(fib(6));
console.log(fib(20));
