let set = new Set(); // set을 만든다.

// 요소를 추가할땐 add 메서드를 사용한다.
set.add(5);
set.add("5");

console.log(set.size); // 2

// 배열을 사용하여 초기화 할 수 있다.
// 중복된 요소가 있다면 제거하여 유일한 값만 사용한다.

let setArr = new Set([1, 2, 3, 4, 1, 2, 3, 4]);

console.log(setArr.size); // 4 [1,2,3,4] 중복된 요소는 제거되었다.

// has 메서드로 값이 있는지 확인할 수 있다.

console.log(setArr.has(5)); // false
console.log(setArr.has(3)); // true

// delete 메서드로 하나의 요소를 제거하거나
// clear 메서드를 사용하여 Set의 모든 요소를 제거할 수 있다.

set.delete(5);
console.log(set.size); // 1

setArr.clear();
console.log(setArr.size); // 0

// set에서도 forEach 메서드를 쓸 수 있다.
// forEach는 함수를 인자로 받는데, 이 함수는 세가지 인자를 받는다.
// 1. set에서 다음 위치의 값. 2. 첫 번째 인자와 같은 값. 3. 값을 읽어들인 Set
// 첫 번째와 두 번째 인자는 항상 같다.
// Array와 Map과의 기능적인 일관성을 유지하기 위해 이렇게 설계 되었다.

let setEach = new Set(["고", "승", "민"]);

setEach.forEach(function(value, key, set) {
  console.log(value, key);
  console.log(set);
});

let setThis = new Set(["고", "승", "민"]);

let obj = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach(value => {
      this.output(value);
    });
  }
};

obj.process(setThis);

// set을 배열로 돌릴수도 있다.
// 전개 연산자를 사용하면 된다.

let setToArr = new Set([1, 2, 3, 1, 2, 3]),
  spreadArr = [...setToArr];
console.log(spreadArr); // 1,2,3

let weakSet = new WeakSet(); // WeakSet 만들기

weakSet.add({}); // WeakSet의 요소는 원시값이 올 수 없다. 객체값만 추가가 가능하다.

// WeakSet은 add, delete, has 메서드 사용이 가능하다.
// WeakSet은 전개연산자로 변환 불가능하다.

let key = {};
set.add(key);

console.log(set.has(key)); // true;
key = null;
console.log(set.has(key)); // false;
