import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="space-x-8 space-y-4 h-full w-full">
            <Navbar />
            {children}
        </div>
    )
}