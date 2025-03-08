import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="DeepMind AI">
      <h3  className="font-bold">DeepMind AI</h3>
    </Link>
  );
}
