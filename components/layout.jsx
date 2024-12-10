import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="h-full w-full">
            <Navbar />
            {children}
        </div>
    )
}