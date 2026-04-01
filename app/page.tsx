import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <div className="absolute right-4 top-4">
        <Link
          href="/privacy"
          className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <span className="flex items-center gap-1" aria-hidden>
            <Image src="https://flagcdn.com/w40/mk.png" alt="MK" width={16} height={12} />
            <Image src="https://flagcdn.com/w40/gb.png" alt="EN" width={16} height={12} />
          </span>
          <span>Политика за приватност</span>
        </Link>
      </div>

      <Image
        src="/logo.png"
        alt="MK Live Radio Logo"
        width={128}
        height={128}
        className="mb-6 h-32 w-32 rounded-2xl shadow-lg"
      />
      <h1 className="mb-2 text-4xl font-bold">MK Live Radio</h1>
      <p className="mb-6 max-w-md text-gray-400">
        Слушај ги твоите омилени македонски радио станици – во живо, бесплатно и
        секогаш достапно.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="https://apps.apple.com/de/app/mk-live-radio/id6748603781"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/appstore.svg"
            alt="Download on the App Store"
            width={168}
            height={56}
            className="h-14 w-auto transition hover:scale-105"
          />
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=app.mkliveradio.android"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/playstore.svg"
            alt="Get it on Google Play"
            width={189}
            height={56}
            className="h-14 w-auto transition hover:scale-105"
          />
        </a>
      </div>

      <a
        href="https://www.instagram.com/mkliveradio"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center gap-2 text-gray-400 transition hover:text-white"
      >
        <Image
          src="/instaLogo.png"
          alt="Instagram"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span>@mkliveradio</span>
      </a>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MK Live Radio · Made with ❤️ in Macedonia
      </footer>
    </main>
  );
}
