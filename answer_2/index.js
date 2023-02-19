const linkArr = [1, 2, 3, 4, 5];
const length = linkArr.length;
const newArr = [];

for (let i = 0; i < length; i++) {
  if (i - 1 !== length - (i + 1)) newArr.push(linkArr[i]);
  if (length - (i + 1) > i) {
    newArr.push(linkArr[length - (i + 1)]);
  } else {
    break;
  }
}

console.log("==>>>", newArr);
