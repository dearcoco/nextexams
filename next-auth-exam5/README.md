## nextjs 13 + next-auth 테스트 2

### 설명
credential, google, github 여러 provider를 통해 로그인이 가능하도록 테스트해보았다.
이를 가능하게 하기 위해 signin(app/(auth)/login) 페이지를 커스터마이징했다.
* credential 로그인 시 'abc@abc.com' 과 '1234' 를 사용한다.

### 리다이렉트 로직
next-auth는 signin 처리를 위해 재귀호출하는 형태이므로 리다이렉트 로직이 필요하다.
프로바이더별로 다른 리다이렉트 로직이 필요했다.
oauth의 경우 signin 페이지가 시작할 때 서버 컴포넌트에서 세션 검사 후 리다이렉트 여부를 결정했다.
credential은 에러 상태도 보여줘야 하므로 Login 클라이언트 컴포넌트로의 분리 후 별도로 리다이렉트 여부를 결정했다.
