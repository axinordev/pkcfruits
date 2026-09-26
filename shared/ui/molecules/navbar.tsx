import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border-b border-white/10">
            <aside>
                <Image src="/logo.jpg" alt="PKC Fruits" width={100} height={100} />
            </aside>
            <aside>
                <ul className="flex items-center gap-4">
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </aside>
        </nav>
    )
}