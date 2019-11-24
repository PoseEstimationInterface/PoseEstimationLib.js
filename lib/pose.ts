import { getAngle } from "./utils";

/**
 * 왼손을 들고 있는지 확인하는 함수입니다
 * 최소 각도(minAngle)를 통해 인식하는 손의 높이를 제한할 수 있습니다
 * @param pose 포즈 데이터 배열
 * @param minAngle 최소 각도
 */
export function isLeftHandUp(pose: any, minAngle: number = 0): boolean {
  const leftHip = pose["keypoints"][11]["position"];
  const leftShoulder = pose["keypoints"][5]["position"];
  const leftElbow = pose["keypoints"][7]["position"];
  const leftWrist = pose["keypoints"][9]["position"];

  const isHandUp = leftWrist["y"] - leftElbow["y"] < 0;
  const angle = getAngle(leftElbow, leftShoulder, leftHip);

  if (isHandUp && minAngle >= angle) {
    return true;
  }

  return false;
}

/**
 * 오른손을 들고 있는지 확인하는 함수입니다
 * 최소 각도(minAngle)를 통해 인식하는 손의 높이를 제한할 수 있습니다
 * @param pose 포즈 데이터 배열
 * @param minAngle 최소 각도
 */
export function isRightHandUp(pose: any, minAngle: number = 0): boolean {
  const rightHip = pose["keypoints"][12]["position"];
  const rightShoulder = pose["keypoints"][6]["position"];
  const rightElbow = pose["keypoints"][8]["position"];
  const rightWrist = pose["keypoints"][10]["position"];

  const isHandUp = rightWrist["y"] - rightElbow["y"] < 0;
  const angle = getAngle(rightElbow, rightShoulder, rightHip);

  if (isHandUp && angle >= minAngle) {
    return true;
  }

  return false;
}

/**
 * 앉아있는지 확인하는 함수입니다.
 * @param pose 포즈 데이터 배열
 */
export function isSitDown(pose: any): boolean {
  const leftHip = pose["keypoints"][11]["position"];
  const leftAnkle = pose["keypoints"][15]["position"];
  const leftShoulder = pose["keypoints"][5]["position"];

  const rightHip = pose["keypoints"][12]["position"];
  const rightAnkle = pose["keypoints"][16]["position"];
  const rightShoulder = pose["keypoints"][6]["position"];

  const len1 = leftHip["y"] - leftShoulder["y"];
  const len2 = leftAnkle["y"] - leftHip["y"];
  const len3 = rightHip["y"] - rightShoulder["y"];
  const len4 = rightAnkle["y"] - rightHip["y"];

  if (len2 < len1 * 0.9 && len4 < len3 * 0.9) {
    return true;
  }

  return false;
}

export function isJumping(pose: any, groundY: number): boolean {
  if (pose["keypoints"][15]["score"] > 0.5) {
    const leftAnkle = pose["keypoints"][15]["position"];

    const rightHip = pose["keypoints"][12]["position"];
    const rightAnkle = pose["keypoints"][16]["position"];

    const jumpDefault = (rightAnkle["y"] - rightHip["y"]) / 4;
    const rightJumpLen = groundY - rightAnkle["y"];
    const leftJumpLen = groundY - leftAnkle["y"];

    if (rightJumpLen > jumpDefault && leftJumpLen > jumpDefault) {
      return true;
    }
  }

  return false;
}
