import Image from "next/image"
import Link from "next/link"

export default function Logo (props: any) {
  return (
    <Link
        href="/"
    >
      <Image
        width={130}
        height={50}
        src="/img/logo.png"
        alt="Ez Pharma"
        { ...props }
      />
    </Link>
  )
}