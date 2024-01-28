import Image from "next/image"
import Link from "next/link"

export default function Logo ({ className, ...props }: any) {
  return (
    <Link
        href="/"
    >
      <Image
        className="mb-16 hidden md:block"
        width={130}
        height={50}
        src="/img/logo.png"
        alt="Ez Pharma"
      />
      <Image
        className="mb-16 md:hidden"
        width={60}
        height={50}
        src="/img/logo-mini.png"
        alt="Ez Pharma"
      />
    </Link>
  )
}