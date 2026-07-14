import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/seo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#060606] px-5 py-8 text-white sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(220,60,48,0.28),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.07),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f36b5f]/70 to-transparent" />

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_420px]">
        <div className="flex flex-col items-start">
          <Link href="/" className="mb-10 flex items-center gap-3 transition hover:opacity-80">
            <Image
              src="/logo.png"
              alt="MK Live Radio"
              width={48}
              height={48}
              className="h-12 w-12 rounded-2xl shadow-[0_0_32px_rgba(220,60,48,0.35)]"
              priority
            />
            <span className="text-lg font-semibold">MK Live Radio</span>
          </Link>

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-medium text-[#ff9b92]">
            <span className="h-2 w-2 rounded-full bg-[#f05a4d]" />
            404 Not Found
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal sm:text-6xl">
            Оваа фреквенција не е пронајдена.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Страницата што ја бараш не постои или е преместена. Врати се на
            почетната, разгледај ги радио станиците или пушти музика веднаш во
            web player-от.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-black transition hover:bg-gray-200"
            >
              Почетна
            </Link>
            <Link
              href="/stations"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.1]"
            >
              Радио станици
            </Link>
            <Link
              href="/webplayer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e45a4e]/50 bg-[#c63a2e]/20 px-6 text-sm font-semibold text-white shadow-[0_0_28px_rgba(198,58,46,0.2)] transition hover:border-[#ff8176]/80 hover:bg-[#c63a2e]/30"
            >
              Web Player
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image
                src="/appstore.svg"
                alt="Download on the App Store"
                width={168}
                height={56}
                className="h-14 w-auto transition hover:scale-105"
              />
            </a>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image
                src="/playstore.svg"
                alt="Get it on Google Play"
                width={189}
                height={56}
                className="h-14 w-auto transition hover:scale-105"
              />
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[480px] items-center justify-center lg:flex">
          <div className="absolute h-80 w-80 rounded-full border border-[#f36b5f]/20" />
          <div className="absolute h-60 w-60 rounded-full border border-[#f36b5f]/30" />
          <div className="absolute h-40 w-40 rounded-full border border-[#f36b5f]/40" />
          <div className="relative flex h-56 w-56 flex-col items-center justify-center rounded-[2rem] border border-white/12 bg-white/[0.07] shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur">
            <Image
              src="/logo.png"
              alt=""
              width={88}
              height={88}
              className="mb-5 h-22 w-22 rounded-3xl"
            />
            <div className="flex h-12 items-end gap-2" aria-hidden>
              <span className="h-5 w-2 rounded-full bg-[#f36b5f]" />
              <span className="h-10 w-2 rounded-full bg-white" />
              <span className="h-7 w-2 rounded-full bg-[#f36b5f]" />
              <span className="h-12 w-2 rounded-full bg-white" />
              <span className="h-6 w-2 rounded-full bg-[#f36b5f]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
