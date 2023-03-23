## nextjs 13 + next-auth 테스트 2

### 설명
- 로그인시 oauth provider와 credential provider 중 하나를 선택할 수 있다.
- 이를 가능하게 하기 위해 signin(app/(auth)/login) 페이지를 커스터마이징
- credential provider로 로그인 할때 'abc@abc.com' 과 '1234' 를 사용한다.

### 리다이렉트 로직
프로바이더별로 다른 리다이렉트 로직을 사용
- oauth provider: 내부적으로 signin 처리를 위해 재귀호출하는 형태이므로 signin 페이지의 서버 로직에서 세션 검사 후 리다이렉트 여부를 결정했다.
- credential provider: 클라이언트 로직에서 리다이렉트 여부를 결정했다.