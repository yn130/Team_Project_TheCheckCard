![image](https://github.com/user-attachments/assets/2d0e93fa-1c44-4fa5-9d20-3f2dcc08c94b)


<br>

## ☑ 프로젝트 개요
- 제목 : The CheckCard
- 주제 : 20살 청년들이 직관적이고 빠르게 본인에게 유용한 카드를  찾을 수 있는 카드 추천 웹사이트

<br>


## ☑ 팀원 

|   Name   | 김민석 | 최소희 | 서예은 | 서거석 | 송성원 |
| :------: | --- | --- | --- | --- | --- |
| Position | Frontend| Frontend | Backend | Backend | Backend |


- 프로젝트 기간 : 2024년 7월 5일 ~ 2024년 7월 14일
- 시연 영상 (유튜브) :

<br> 

## ☑ 기술 스택

###  Front-End

<details>
    <summary>⚡️FE 기술 스택 살펴보기 </summary>
    <br>
    <ul>
        <li>HTML </li>
        <li>CSS </li>
        <li>JavaScript </li>
        <li>JQuery </li>
    </ul>
</details>

  <br>

###  Back-End

<details>
      <summary>⚡️ BE 기술 스택 살펴보기 </summary>
      <br>
      <ul>
          <li> MySQL </li>
          <li> node.js </li>
          <li>jwt </li>
          <li>BCrypt HASH </li>
      </ul>
  </details>
  
  <br>
  

### ⚡️ Collaboration
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=Jira&logoColor=white"/><img src="https://img.shields.io/badge/Github-181717?style=flat&logo=Github&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=Mysql&logoColor=white"/><img src="https://img.shields.io/badge/JQuery-0769AD?style=flat&logo=Jquery&logoColor=white"/>
<br><img src="https://img.shields.io/badge/HTML-E34F26?style=flat&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=Css3&logoColor=white"/><img src="https://img.shields.io/badge/Notin-000000?style=flat&logo=Notion&logoColor=white"/><img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=JSONWebTokens&logoColor=white"/> 

<br><br>
<hr>

## 1️⃣ 프로젝트 구조
<br>
    
    📦src
     ┗ 📂main
       ┣ 📂src
         ┣ 📂config
         ┣ 📂controller
         ┣ 📂middleware
         ┣ 📂Models
         ┣ 📂routes
         ┣ 📂utils
         ┗  📂views
           ┣ 📂include
           ┗ 📂public
           
<br>
<br>

## 2️⃣ ERD & 테이블 명세서


<img width="784" alt="image" src="https://github.com/user-attachments/assets/e7384d65-0004-4969-aeec-752311e28585">



<br>
<br>

## 3️⃣ 주요 기능

#### 커버페이지 
 -  사이트의 목적과 타겟층 명시

#### 회원가입 
- 아이디, 패스워드, 닉네임 회원가입 
- 닉네임 중복 확인
- 아이디 중복 확인

#### 로그인 / 로그아웃
-  로그인
-  토큰생성
-  메인페이지, 프로필페이지에서 로그아웃

#### 프로필페이지
- 닉네임 수정
- 내가 쓴 댓글 조회
- 내가 쓴 댓글 삭제
- 회원탈퇴 

#### 댓글
- 댓글창 팝업
- 댓글 페이지네이션
- 댓글 CRUD
- 댓글 좋아요 등록 / 취소

#### 추천카드 
- 5가지 혜택 카테고리 제공
- 카드 좋아요 등록 / 취소 
- 카데고리별 top3 카드 추천
- 카드별 좋아요 top2 댓글 조회
- 카드별 상세 혜택 조희
- 카드 검색
  

<br>
<br>

## 4️⃣ 화면구성

<table>
<tr>
  <td>커버페이지</td>
  <td>메인페이지</td>
</tr>
<tr>
  <td><img width="1512" alt="image" src="https://github.com/user-attachments/assets/29f0ab34-7655-4057-b730-5625d28d18a9">
</td>
  <td><img width="1512" alt="image" src= "https://github.com/user-attachments/assets/42807c9f-04f7-4a33-ae63-b614d132bb0d">

</td>
</tr>
<tr>
  <td>회원가입</td>
  <td>마이페이지</td>
</tr>
<tr>
  <td><img width="1512" alt="image" src="https://github.com/user-attachments/assets/2001b194-007c-499a-bf55-60c7e062d826">
</td>
  <td><img width="1512" alt="image" src="https://github.com/user-attachments/assets/a2192ace-e891-41df-a648-62a7de2044fd">
</td>
</tr>
<tr>
  <td>추천 카드 페이지 </td>
  <td> 댓글 팝업 </td>
</tr>
<tr>
  <td><img width="1512" src="https://github.com/user-attachments/assets/b43a2095-e43e-45a3-8d24-65d28b82cbf8"></td>
  <td><img width="1512" src="https://github.com/user-attachments/assets/98d117b3-c20e-4d31-8489-63675dc50773"></td>
</tr>
<tr>
  <td> 카드 상세보기 </td>
  <td> 검색 </td>
</tr>
<tr>
  <td><img width="1512" src="https://github.com/user-attachments/assets/74c6ebc1-f1cb-49a0-beba-26ef13136fe0"></td>
  <td><img width="1512" src="https://github.com/user-attachments/assets/4599614f-36a8-4b2a-8a8e-15c92fea0334"></td>
</tr>
</table>
