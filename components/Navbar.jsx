import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="flex text-slate-100 bg-slate-800 h-24 sm:h-16">
            <h1 className="mr-auto font-semibold text-center bg-primary py-4 pl-12 pr-12">Sistema de Riego</h1>
            <div className="font-semibold flex flex-row ">
                <Link className="bg-teal-700 hover:bg-teal-600 active:font-bold active:bg-teal-500 py-4 pr-6 pl-6 h-full" href="/">Inicio</Link>
                <Link className="bg-teal-700 hover:bg-teal-600 active:font-bold active:bg-teal-500 py-4 pr-6 pl-6 h-full" href="/controles">Controles</Link>
                <Link className="bg-teal-700 hover:bg-teal-600 active:font-bold active:bg-teal-500 py-4 pr-6 pl-6 h-full" href="/historial">Historial</Link>
            </div>
        </nav>
    )
}