import LoginBtn from "./login-btn";
import Link from "next/link";

export default function Home({ children }: { children: React.ReactNode}) {
  return (
    <div>
      <h1>Auth testing</h1>
      <div>
        <Link href='about'>About</Link>
      </div>
      <div>
        <LoginBtn>
          
        </LoginBtn>
      </div>
    </div>
  )
}
