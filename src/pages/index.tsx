import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { useRouter } from "next/router";

const sections = { About: About, Skills: Skills, Contact: Contact };

export default function Home() {
  const router = useRouter();
  const section = router.query?.section ?? "About";

  const Component = sections[section as keyof typeof sections];

  return (
    <main className="py-5 px-10">
      <Header />
      <Component />
    </main>
  );
}
