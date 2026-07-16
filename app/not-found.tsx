import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, StoreButtons } from "@/app/components/site-chrome";

export default function NotFound() {
  return (
    <main className="site-page">
      <SiteHeader language="mk" />
      <section className="site-shell not-found">
        <div>
          <span className="eyebrow">404 · Сигналот е изгубен</span>
          <h1>Оваа фреквенција не е пронајдена.</h1>
          <p>Страницата што ја бараш не постои или е преместена. Симни ја апликацијата или продолжи кон директориумот со сите македонски радио станици.</p>
          <StoreButtons compact />
          <div className="secondary-links">
            <Link href="/stations" className="secondary-link">Радио станици →</Link>
            <Link href="/" className="secondary-link secondary-link--muted">Почетна</Link>
          </div>
        </div>
        <div className="not-found__visual" aria-hidden>
          <span>4</span>
          <Image src="/logo.png" alt="" width={150} height={150} priority />
          <span>4</span>
        </div>
      </section>
      <SiteFooter language="mk" />
    </main>
  );
}
