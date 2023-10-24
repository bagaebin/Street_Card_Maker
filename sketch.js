let backgroundColor = "#ffffff"; // 초기 배경 색
let userName = ""; // 초기 사용자 이름
let userPhoneNumber = ""; // 초기 사용자 전화번호
let selectedPhrases = []; // 선택된 문구들
const maxSelectedPhrases = 3; // 최대 선택 가능한 문구 수

// 문구 버튼의 선택 상태를 나타내는 객체
let phraseButtonStates = {
  phrase1: false,
  phrase2: false,
  phrase3: false,
  // 원하는 문구 버튼들에 대한 상태 추가
};

let backgroundColors = ["#ff0000", "#0000ff", "#FFD500", "#FFD500", "#00961E"]; // 명함 배경 색 조합
let nameColors = ["#FFD500", "#FFD500", "#FFD500", "#ff0000", "#0000ff"]; // 이름 색 조합
let phoneColors = ["#FFD500", "#FFD500", "#FFD500", "#ff0000", "#0000ff"]; // 전화번호 색 조합
let colorIndex = 0; // 현재 색 조합 인덱스

function setup() {
  
  
  let canvas = createCanvas(450, 275);
  canvas.parent("canvas-container"); // 캔버스를 'canv50tainer' 요소 내에 그립니다.
  updateColors();
}

function draw() {
  background(256);

  // 명함 그리기
  fill(backgroundColor);
  noStroke();
  rect(0, 0, 450, 275);
  
    fill("#000000");
  textSize(112);
  // 사용자 이름 길이에 따라 가운데 정렬 또는 좌우 양끝에 맞춘 정렬
  if (userName.length === 1) {
    textAlign(CENTER);
    text(userName, width / 2+5, 125+5);
  } else {
    let leftSpacing = (400 - textWidth(userName)) / (userName.length - 1);
    let x = 70;
    for (let i = 0; i < userName.length; i++) {
      text(userName[i], x+5, 125+5);
      x += textWidth(userName[i]) + leftSpacing;
    }
  }

  fill(nameColors[colorIndex]);
  textSize(112);
  // 사용자 이름 길이에 따라 가운데 정렬 또는 좌우 양끝에 맞춘 정렬
  if (userName.length === 1) {
    textAlign(CENTER);
    text(userName, width / 2, 125);
  } else {
    let leftSpacing = (400 - textWidth(userName)) / (userName.length - 1);
    let x = 70;
    for (let i = 0; i < userName.length; i++) {
      text(userName[i], x, 125);
      x += textWidth(userName[i]) + leftSpacing;
    }
  }
  
    fill('#000000');
    textSize(48);
  // 사용자 전화번호
  if (userPhoneNumber.length === 1) {
    textAlign(CENTER);
    text(userPhoneNumber, width / 2+3, 200+3);
  } else {
    let leftSpacing =
      (390 - textWidth(userPhoneNumber)) / (userPhoneNumber.length - 1);
    let x = 45;
    for (let i = 0; i < userPhoneNumber.length; i++) {
      text(userPhoneNumber[i], x+3, 200+3);
      x += textWidth(userPhoneNumber[i]) + leftSpacing;
    }
  }

  fill(phoneColors[colorIndex]);
    textSize(48);
  // 사용자 전화번호
  if (userPhoneNumber.length === 1) {
    textAlign(CENTER);
    text(userPhoneNumber, width / 2, 200);
  } else {
    let leftSpacing =
      (390 - textWidth(userPhoneNumber)) / (userPhoneNumber.length - 1);
    let x = 45;
    for (let i = 0; i < userPhoneNumber.length; i++) {
      text(userPhoneNumber[i], x, 200);
      x += textWidth(userPhoneNumber[i]) + leftSpacing;
    }
  }

  fill("#000000");
    textSize(24);
  if (selectedPhrases.length === 1) {
    textAlign(CENTER);
    text(selectedPhrases[0], width / 2, 240);
  } else {
    // 명함 좌우 양끝에 맞추어 배분 정렬
    let startX = 75;
    let endX = 380;
    let interval = (endX - startX) / (selectedPhrases.length - 1);
    for (let i = 0; i < selectedPhrases.length; i++) {
      text(selectedPhrases[i], startX + i * interval, 240);
    }
  }
}

function updateUserName(value) {
  // 사용자 이름 업데이트
  userName = value;
}

function updateUserPhoneNumber(value) {
  // 사용자 전화번호 업데이트
  userPhoneNumber = value;
}

function togglePhrase(phrase) {
  // 선택된 문구 토글
  if (selectedPhrases.includes(phrase)) {
    selectedPhrases = selectedPhrases.filter((item) => item !== phrase);
  } else {
    // 선택한 문구가 최대 개수에 도달하면 가장 나중에 선택한 문구를 해제
    if (selectedPhrases.length >= maxSelectedPhrases) {
      selectedPhrases.shift(); // 가장 나중에 선택한 문구 제거
    }
    selectedPhrases.push(phrase);
  }

  // 문구 버튼의 토글 상태 업데이트
  for (const buttonId in phraseButtonStates) {
    if (document.getElementById(buttonId)) {
      phraseButtonStates[buttonId] = selectedPhrases.includes(
        document.getElementById(buttonId).innerText
      );
    }
  }
}

function updateColors() {
  backgroundColor = color(backgroundColors[colorIndex]);
  document.body.style.backgroundColor = backgroundColor; // 배경 색 업데이트

  colorIndex = (colorIndex + 1) % 5; // 다음 색 조합 인덱스로 이동
}

function changeColors() {
  updateColors();
}

function saveCanvasAsImage() {
  let canvas = document.getElementById('defaultCanvas0'); // p5.js 캔버스 요소를 가져옵니다.
  
  // 캔버스를 이미지 데이터 URL로 변환합니다.
  let imageDataURL = canvas.toDataURL('image/png');

  // 이미지 데이터 URL을 이용해 다운로드 링크를 생성합니다.
  let a = document.createElement('a');
  a.href = imageDataURL;
  a.download = 'my_canvas_image.png'; // 다운로드될 파일 이름을 설정합니다.
  a.style.display = 'none';

  // 링크를 DOM에 추가하고 클릭하여 다운로드를 시작합니다.
  document.body.appendChild(a);
  a.click();

  // DOM에서 링크를 제거합니다.
  document.body.removeChild(a);
}