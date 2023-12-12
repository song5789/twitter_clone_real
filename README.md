# 설명

React + vite + Firebase 를 이용하여
X 의 레이아웃과 기능을 최대한 동일하게 만들어보려합니다.
학습을 위한 페이지로써 상업적 이용은 하지 않음을 밝힙니다.

# 진척 상황

## 23.12.02

- Firebase 초기화, 인증 기능 추가
- 인증 서버 연결 확인 과정 추가
- 로그인을 하지 않을 시 메인 화면으로 넘어가지 않게끔 함.
- 계정 생성, 로그인 폼 70% 완성.
- 로그인 화면 90% 완성.

## 23.12.03

- 소셜 로그인 구현(깃허브)
- 로그인 관련 레이아웃 완성(완벽하게 따라하지는 못함..)
- 비밀번호 리셋 추가

## 23.12.04

- 메뉴 레이아웃 구성.
- 메뉴 하단 현재 사용자 프로필 이미지, 이름 확인가능.
- 메뉴 프로필 클릭 시 로그아웃 가능. (로그아웃 페이지로 넘어감.)
- 로그아웃 페이지 구현.

## 23.12.05

- 각 컴포넌트의 Border 수정.
- 타임라인 추가.
- 메인에 없다면 변동사항을 실시간 fetch 하지 않음.
- 트윗 게시 기능 추가.
- 이미지도 추가 가능해짐 (1개만).
- Firestore, storage 초기화.

## 23.12.06

- 트윗 수정, 삭제 기능 구현.

## 23.12.07

- 홈 화면 레이아웃 완성(?) : 사이드 메뉴 기능 구현까지는 오래 걸릴듯하여 재미삼아 머스크 행님 사진 추가..
- 레이아읏의 게시버튼 기능 구현
- 내 프로필 조회 가능.
- 내 프로필 수정 가능.
- 프로필 수정 시 내가 올린 트윗의 아바타, 닉네임 수정 됨.

## 23.12.09

- 댓글 기능 구현
- 댓글 수정 및 삭제 가능.
- (추가) 스타일 수정

## 23.12.11

- 좋아요 기능 구현 (토글 가능.)

## 23.12.12

- 트윗 컴포넌트에서 좋아요, 댓글 목록 다 불러오는걸로 변경(이중 쿼리 방지)
- 소셜가입, 일반 가입 시 DB 에 정보 저장 (향후 타인 프로필 확인을 위한 밑작업)
- 소셜 로그인 시 정보가 중복저장되지 않게 필터링함.
- 특정 유저 프로필 페이지 이동시 사이드 메뉴 이미지 안나오던 현상 수정.

# 작업할 목록 (메모)

- 이메일 인증(필요하면)
- 세션관리(필요하면)
- 타인의 프로필 조회
- 좋아요를 누른 트윗에 한 해 좋아요 버튼 스타일 바꿔주기
- 트윗 검색(챌린지 이후)
