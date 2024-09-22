import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import { useRouter } from "next/router";
import Projects from "@/components/Projects";

const sections = {
  About: About,
  Skills: Skills,
  Projects: Projects,
};

export default function Home() {
  const router = useRouter();
  const section = router.query?.section ?? "About";

  const Component = sections[section as keyof typeof sections];

  return (
    <main className="min-h-[100vh] py-5 px-10">
      <Header />
      <Component />
    </main>
  );
}
