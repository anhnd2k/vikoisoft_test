const data = require("../answer_3/src/data.json");

// const linkArr = [1, 2, 3, 4, 5];
// const length = linkArr.length;
// const newArr = [];

// for (let i = 0; i < length; i++) {
//   if (i - 1 !== length - (i + 1)) newArr.push(linkArr[i]);
//   if (length - (i + 1) > i) {
//     newArr.push(linkArr[length - (i + 1)]);
//   } else {
//     break;
//   }
// }

// console.log("==>>>", newArr);

const newData = data.map((item, _) => {
  return { ...item, childCmt: [] };
});
const dataChild_1 = newData.filter((item) => item.replyingTo !== undefined);
const dataParent = newData.filter((item) => item.replyingTo === undefined);

for (let i = 0; i < dataChild_1.length; i++) {
  for (let j = 0; j < dataChild_1.length; j++) {
    if (dataChild_1[i].id === dataChild_1[j].replyingTo) {
      dataChild_1[i].childCmt.push(dataChild_1[j]);
    }
  }
}

for (let i = 0; i < dataParent.length; i++) {
  for (let j = 0; j < dataChild_1.length; j++) {
    if (dataParent[i].id === dataChild_1[j].replyingTo) {
      dataParent[i].childCmt.push(dataChild_1[j]);
    }
  }
}

console.log("==>> newww 7");
console.log(JSON.stringify(dataParent));
