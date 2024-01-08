import SideNav from "../ui/sidenav";


export default function Layout({ children }
    : { children: React.ReactNode }) {
    return (

        <div className="bgr-image mage flex h-screen flex-col md:flex-row md:overflow-hidden">
             <div className="flex md:hidden flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="hidden md:flex flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>

    )
}