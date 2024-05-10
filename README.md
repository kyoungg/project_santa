# **등산을 사랑하는 당신을 위한 서비스, 산타**

- 취향에 맞는 등산 모임을 직접 모집해보세요.
- 다양한 챌린지를 앱을 통해 자동 기록을 남겨보세요.
- 다양한 종류의 챌린지를 통해 나의 업적을 기록해 보세요
- 내 순위를 확인하고, 다른 사용자들과 겨뤄보세요.

![산타로고](https://kdt-gitlab.elice.io/cloud_track/class_01/web_project3/team02/santa__front/uploads/dc801ba523de5ecdfa288ded03778468/image.png)

## 실행 방법

### client

아래 명령어 순서로 터미널에 입력하기
```bash
npm i
npm run dev
``` 

## server 

```

```

## **서비스 목적**

등산을 좋아하는 유저들 간의 다양한 커뮤니티를 활성화하고 동기부여를 위한 챌린지를 제공하여 지속 가능한 등산 문화를 조성한다.

## 서비스 목표

- 유저가 직접 참여하여 다양한 카테고리의 모임을 생성/참여하여 커뮤니티를 이룸
- 사용자가 선호 카테고리를 선택하여 선호 카테고리별 모임 조회를 통한 모임 선택의 어려움 감소
- 생성된 다양한 챌린지를 통해 사용자들이 사이트를 이용함에 있어 동기부여 제공
- 랭킹 시스템(유저가 완료한 업적 + 유저가 등반한 산의 누적 높이)를 통한 등산에 대한 동기부여 제공

## 서비스 기능 명세

### 1. 유저 기능

- 로그인(+카카오 소셜 로그인)/회원가입
- 선호 키워드 등록

### 2. 모임 기능

- 모임 생성 및 참가 가능
- 선호 카테고리 및 태그 사용자 검색어 기반 모임&검색어 조회
- 최신순, 인기순 기반 필터링
- 모임 참여인원 조회
- 유저 신고 기능

### 3.  챌린지 기능

- 챌린지는 자동으로 수행되며 100% 완료 후 업적 트로피 획득

### 4.  인증 기능

- 산 정상 좌표값 기반으로 정상 및 등반높이 인증
- 등반한 정상 개수와 누적 높이를 기록

### 5. 랭킹

- 사용자가 인증한 데이터(높이, 완료한 챌린지)를 기반으로  점수를 산출하여 랭킹시스템 생성

### 6. 관리자(Admin)

- 회원관리 : 전체 회원 정보 조회(신고 내역 등) 및 회원 정보 삭제 기능
- 챌린지 관리 : 챌린지 업로드 및 삭제
- 카테고리 관리 : 카테고리 수정 및 삭제 기능

- 서비스 시나리오
    
    # 페르소나
    
    - 이름: 엘리스
    - 나이: 35
    - 직업: 직장인
    - 거주: 서울 혼자 거주
    - 캐릭터
        - "직장 스트레스로 취미를 구하고 싶었음 자연과 운동을 좋아함."
        - "등산정보를 제공해주면서 등산 모임도 가능한 서비스를 찾고있음."
    
    ## 상세기능
    
    ### 사용자 관련 기능
    
    - 회원가입
        - 폼의 입력 값이 조건에 안맞으면 사용자에게 알려줌
            - 이메일, 이름, 비밀번호, 닉네임, 휴대폰
        - 비밀번호 분실 시 본인 이메일 인증 후 비밀번호 초기화
        - 소셜 로그인 없이도 회원가입 가능
        - 조건에 맞게 입력하면 백엔드 서버와 연결해서 회원가입 정보가 db저장됨
    - 로그인
        - 로그인 폼의 입력 값이 조건에 안 맞는다면 사용자에게 알려줌
        - 로그인 성공 - jwt 토큰이 프론트 단에 저장되고 메인페이지로 이동
        - 로그아웃 - 프론트 단에 있던 jwt토큰이 제거
    - 사용자
        - 회원정보를 조회 할 수 있음
        - 회원정보를 수정 할 수 있음
            - 닉네임 중복 불가
            - 프로필 사진 추가 가능
        - 회원정보를 삭제 할 수 있음
    - 서비스 관리자
        - 관리자 계정이 존재, 일반사용자와 구분
        - 챌린지를 열 수 있음
        - 회원을 관리 할 수 있음
        - 카테고리 관리
        
    
    ### 모임
    
    > 선호 카테고리
    > 
    - 관리자가 정해놓은 선호 카테고리를 사용자가 고른다
        - 회원가입시
    - 목적
        - 힐링, 단풍, 정상깨기, 출사, 식도락, 플로깅
    
    ### 게시판
    
    > 모임 (crud)
    > 
    - 사용자
        - 사용자가 모임 생성 가능
            - 생성한 사람에게 모임장 권한 부여
            - 입력하는 모임 정보 : 모임이름, 모임설명, 모임카테고리, 선호태그
        - 사용자가 모임 조회 가능
        - 사용자는 인기모임 조회 가능
        - 참여한 사용자를 다른 사용자에게 보여준다.
        - 사용자가 모임 참여 가능
    
    - 모임장
        - 모임장은 모임 수정 가능
        - 모임장은 모임페이지 삭제 가능
    
    카테고리
    
    - 카테고리 (crud)
        - 사용자
            - 모임 생성시 카테고리를 선택할 수 있다.
            - 모임 조회시 카테고리별로 조회 할 수있다.
        - 관리자
            - 카테고리를 추가 할 수 있다.
            - 카테고리를 삭제 할 수 있다.
    
    챌린지
    
    - 챌린지(crud)
        - 사용자
            - 사용자는 등록 된 챌린지를 조회
        - 관리자
            - 관리자는 챌린지를 생성할 수 있다.
            - 관리자는 등록한 챌린지를 조회 할 수 있다.
            - 관리자는 등록한 챌린지를 수정 할 수 있다.
            - 관리자는 등록한 챌린지를 삭제 할 수 있다.

## 기술 스택

> 프론트엔드

<img alt="typescript" src ="https://img.shields.io/badge/typescript-3178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white"/> <img alt="react" src ="https://img.shields.io/badge/react-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=white"/> <img alt="TanStack Query" src ="https://img.shields.io/badge/TanStack Query-FF4154.svg?&style=for-the-badge&logo=reactquery&logoColor=white"/>, 
<img alt="gitlab" src ="https://img.shields.io/badge/gitlab-FC6D26.svg?&style=for-the-badge&logo=gitlab&logoColor=white"/>
<img alt="sass" src ="https://img.shields.io/badge/sass-CC6699.svg?&style=for-the-badge&logo=sass&logoColor=white"/>
<img alt="reacthookform" src ="https://img.shields.io/badge/reacthookform-EC5990.svg?&style=for-the-badge&logo=reacthookform&logoColor=white"/>

> 백엔드

<img alt="springboot" src ="https://img.shields.io/badge/springboot-6DB33F.svg?&style=for-the-badge&logo=springboot&logoColor=white"/>

<img alt="springsecurity" src ="https://img.shields.io/badge/springsecurity-6DB33F.svg?&style=for-the-badge&logo=springsecurity&logoColor=white"/>
<img alt="mysql" src ="https://img.shields.io/badge/mysql-4479A1.svg?&style=for-the-badge&logo=mysql&logoColor=white"/>
<img alt="postman" src ="https://img.shields.io/badge/postman-FF6C37.svg?&style=for-the-badge&logo=postman&logoColor=white"/> 


> 서버

<img alt="docker" src ="https://img.shields.io/badge/docker-2496ED.svg?&style=for-the-badge&logo=docker&logoColor=white"/>
<img alt="nginx" src ="https://img.shields.io/badge/nginx-009639.svg?&style=for-the-badge&logo=nginx&logoColor=white"/>
<img alt="jenkins" src ="https://img.shields.io/badge/jenkins-D24939.svg?&style=for-the-badge&logo=jenkins&logoColor=white"/>
<img alt="amazon aws" src ="https://img.shields.io/badge/amazon aws-232F3E.svg?&style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img alt="amazon ec2" src ="https://img.shields.io/badge/amazon ec2-FF9900.svg?&style=for-the-badge&logo=amazonec2&logoColor=white"/>
<img alt="amazonelasticache" src ="https://img.shields.io/badge/amazon elasticache-C925D1.svg?&style=for-the-badge&logo=amazonelasticache&logoColor=white"/>

## 역할담당
| 훈련생 | 역할 |
| --- | --- |
| 옥찬혁 | 팀장👑 <br> 백엔드 |
| 나정균 | 팀원<br> 백엔드 |
| 민지원 | 팀원<br> 백엔드 |
| 김경혜 | 팀원<br> 프론트 |
| 윤혜원 | 팀원<br> 프론트 |
| 진채영 | 팀원<br> 프론트 |
| 김정현 | 코치 |
| 송재천 | 코치 |
