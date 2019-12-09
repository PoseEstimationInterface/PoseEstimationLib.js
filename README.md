# PoseEstimationLib.js

## :book: Introduce

- 특정 포즈를 취하고 있는지 확인할 수 있는 라이브러리입니다.

1. `@tensorflow/posenet`를 통해 이미지에서 포즈 데이터를 추출합니다.
2. 추출된 포즈 데이터에서 상대 위치, 각도, 방향, 속도 데이터를 계산하고 이를 통해 특정한 자세를 취하고 있는지 확인합니다.

## :rocket: ​Installation

##### npm

```bash
npm install pose-estimation-lib.js
```

#### yarn

```bash
yarn add pose-estimation-lib.js
```

## :memo: Getting Started

```javascript
import * as posenet from "@tensorflow-models/posenet";
import * as pelib from "pose-estimation-lib.js/dist/src/pose";
import * as peutils from "pose-estimation-lib.js/dist/src/uitls";

async function main() {
  const imgElement = ...
  const flipHorizontal = true;

  // initialize posenet
  const net = await posenet.load({
    architecture: "ResNet50",
    outputStride: 16,
    inputResolution: 200,
    multiplier: 1,
    quantBytes: 1
  });

  // estimation pose from imgElement
  const pose = await net.estimatePoses(imgElement, {
    decodingMethod: "single-person",
    flipHorizontal
  });

  const isLeftUp = pelib.isLeftHandUp(pose);
  console.log("isLeftHandUp", isLeftUp);
}

main();
```

## 📃 Document

### 1. Left Hand Up

![LeftHandUp](https://media.giphy.com/media/U3tBTrTBhov5NLiCcG/giphy.gif)

#### Example Code

```js
const isLeftUp = pelib.isLeftHandUp(pose);
console.log("isLeftHandUp", isLeftUp);
```

### 2. Left Hand Up (Big)

![LeftHandUpBig](https://media.giphy.com/media/YRPvRRumiEzZrNqvno/giphy.gif)

#### Example Code

```js
const isLeftUpBig = pelib.isLeftHandUp(pose, 90);
console.log("isLeftUpBig", isLeftUpBig);
```

### 3. Right Hand Up

![RightHandUp](https://media.giphy.com/media/JqDYckncoHFsOvO3Dy/giphy.gif)

#### Example Code

```js
const isRightUp = pelib.isRightHandUp(pose);
console.log("isRightHandUp", isRightUp);
```

### 4. Right Hand Up (Big)

![RightHandUpBig](https://media.giphy.com/media/hXIwheimqo9nyOzU02/giphy.gif)

#### Example Code

```js
const isRightUp = pelib.isRightHandUp(pose, 90);
console.log("isRightHandUpBig", isRightUp);
```

### 5. Jumping

![Jumping](https://media.giphy.com/media/LmYoTNpbBJeCfnkOwH/giphy.gif)

#### Example Code

```js
let groundY = 0;

// in update loop
groundY = peutils.getGround(pose);

const isJumping = pelib.isJumping(pose, groundY);
console.log("isJumping", isJumping);
```

### 6. Sitting

```js
const isSitting = pelib.isSitDown(pose);
console.log("isSitting", isSitting);
```

## :pray: ​Contributing

프로젝트 참여는 누구나 환영합니다. Github 저장소를 통해 PR을 요청해주시면 감사하겠습니다.

## :family: Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/okps123">
      <img src="https://avatars2.githubusercontent.com/u/4093939?s=460&v=4" width="100px;" alt="Jongbok Park"/><br />
      <sub><b>Jongbok Park</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/mine0697782">
      <img src="https://avatars1.githubusercontent.com/u/39540900?s=460&v=4" width="100px;" alt="mine0697782"/><br />
      <sub><b>mine0697782</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/ChanHHOO">
      <img src="https://avatars2.githubusercontent.com/u/39542964?s=460&v=4" width="100px;" alt="ChanHHOO"/><br />
      <sub><b>ChanHHOO</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/soninsu-beep">
      <img src="https://avatars1.githubusercontent.com/u/55822065?s=460&v=4" width="100px;" alt="soninsu-beep"/><br />
      <sub><b>soninsu-beep</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/jhg2957">
      <img src="https://avatars3.githubusercontent.com/u/17774948?s=460&v=4" width="100px;" alt="jhg2957"/><br />
      <sub><b>jhg2957</b></sub></a><br />
    </td>
  </tr>
</table>
