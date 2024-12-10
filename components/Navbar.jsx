import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="flex text-slate-100 bg-gray-950 h-fit">
            <h1 className="mr-auto font-semibold text-center bg-pink-800 p-4 pl-12 pr-12 h-full">Sistema de Riego</h1>
            <div className="h-full self-center">
                <Link className="bg-pink-950 hover:bg-pink-800 active:font-bold active:bg-pink-600 p-4 pr-6 pl-6 h-full" href="/">Inicio</Link>
                <Link className="bg-pink-950 hover:bg-pink-800 active:font-bold active:bg-pink-600 p-4 pr-6 pl-6 h-full" href="/controles">Controles</Link>
                <Link className="bg-pink-950 hover:bg-pink-800 active:font-bold active:bg-pink-600 p-4 pr-6 pl-6 h-full" href="/historial">Historial</Link>
            </div>
        </nav>
    )
}