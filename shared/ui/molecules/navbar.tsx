import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between border-b border-white/10 bg-white/10 p-4 backdrop-blur-sm max-lg:px-3 max-lg:py-2">
            <aside>
                <Image src="/logo.png" alt="PKC Fruits" width={100} height={100} className="max-lg:h-10 max-lg:w-10" />
            </aside>
            <aside>
                <ul className="flex items-center gap-4 max-lg:gap-2 max-lg:text-sm">
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </aside>
        </nav>
    )
}