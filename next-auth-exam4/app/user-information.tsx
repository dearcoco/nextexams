import {Session} from "next-auth";

export default function Page({ data }: {data: Session}) {
  //console.log("Hello from user-information.js");
  return <pre>{JSON.stringify(data.user, null, 2)}</pre>;
}
