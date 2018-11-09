// 자바스크립트 엔진은 싱글 스레드 이벤트 루프 개념을 기반으로 함.
// 한 번에 한개의 코드만 실행된다는 의미이다.
const fs = require('fs');

// 코드는 실행될 준비가 될 때마다 작업큐에 추가된다.

// 프로미스는 비동기 연산의 결과를 위한 플레이스 홀더이다.

const promise2 = readFile('example.txt');

// 이 코드에서 readFile은 파일을 즉시 읽기 시작하지 않고, 나중에 읽을 것이다.

// 보류 프로미스는 미확정 상태로 간주된다. 위 코드의 프로미스는 함수가 그 프로미스를 반환하는 시점에 보류 상태에 놓인다.
// 비동기 연산이 완료되면 이 프로미스는 확정 상태로 간주되고 두 가지 가능한 상태 중 하나가 된다.

// then 메서드는 모든 프로미스에 존재하며 두 개의 인자를 받는다.
// 첫 번째 인자는 프로미스가 성공했을 때 호출할 함수, 두 번째 인자는 프로미스가 실패했을 때 호출할 함수다.

// 두 인자는 선택적이므로, 어떤 성공과 실패 조합도 받을 수 있다.

promise2.then(
  (contents) => {
    // 성공시
    console.log(contents);
  },
  (err) => {
    // 실패시
    console.error(err.message);
  },
);

// 성공시
promise2.then((contents) => {
  console.log(contents);
});

// 실패시

promise2.then(null, (err) => {
  console.error(err.message);
});

// 프로미스는 실패 핸들러만 받는 then과 동일하게 동작하는 catch() 메서드를 가진다.

promise2.catch((err) => {
  console.error(err.message);
});

// 만약 프로미스에 실패 핸들러를 추가하지 않으면 실패 시에 아무런 처리도 되지 않는다는 것을 명심하자.

console.log('--------------미확정 프로미스 만들기---------------');

function readFile(filename) {
  return new Promise((res, rej) => {
    fs.readFile(filename, { encoding: 'utf8' }, (err, contents) => {
      if (err) {
        rej(err);
        return;
      }
      res(contents);
    });
  });
}

const promise = readFile('example.txt');

promise.then(
  (contents) => {
    console.log(contents);
  },
  (err) => {
    console.log(err);
  },
);

console.log('--------------확정 프로미스 만들기---------------');

const promise3 = Promise.resolve(42);

promise3.then((value) => {
  console.log(value);
});

const promise4 = Promise.reject(42);

promise4.catch((err) => {
  console.log(err);
});

// 프로미스가 아닌 대너블도 인자로 받을 수 있다.
// 대너블은 resolve와 reject 인자를 받는 then() 메서드를 가지고 있는 객체다.

const thenable = {
  then(res, rej) {
    res('success');
  },
};

// 위 대너블을 성공한 프로미스로 변경하기 위해 Promise.resolve()를 호출한다.

const p1 = Promise.resolve(thenable);

p1.then((contents) => {
  console.log(contents);
});

const thenable2 = {
  then(res, rej) {
    rej('failure');
  },
};

const p2 = Promise.resolve(thenable2);
p2.catch((err) => {
  console.log(err);
});
