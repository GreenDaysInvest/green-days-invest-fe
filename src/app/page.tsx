import Header from "@/app/components/Header/Header";
import Partners from "./components/Partners/Partners";
import { partnersData } from "./consts";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Partners partners={partnersData} />
    </div>
  );
}
