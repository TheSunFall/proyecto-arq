import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="h-full w-full dark:bg-slate-950 dark:text-slate-100">
            <Navbar />
            {children}
        </div>
    )
}
