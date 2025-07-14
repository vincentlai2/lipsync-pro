import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Video, Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">LipSync.pro</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-105 scroll-smooth">
            Features
          </a>
          <a href="#use-cases" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-105 scroll-smooth">
            Use Cases
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-105 scroll-smooth">
            Pricing
          </a>
          <a href="#api" className="text-gray-600 hover:text-blue-600 transition-all hover:scale-105 scroll-smooth">
            API
          </a>
          <Button variant="outline" size="sm" className="hover:scale-105 transition-all">
            Sign In
          </Button>
          <a href="/#hero" className="scroll-smooth">
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
              Try Free
            </Button>
          </a>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 pt-8">
              <a href="#features" className="text-lg font-medium hover:text-blue-600 transition-all">
                Features
              </a>
              <a href="#use-cases" className="text-lg font-medium hover:text-blue-600 transition-all">
                Use Cases
              </a>
              <a href="#pricing" className="text-lg font-medium hover:text-blue-600 transition-all">
                Pricing
              </a>
              <a href="#api" className="text-lg font-medium hover:text-blue-600 transition-all">
                API
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <a href="/#hero" className="scroll-smooth">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Try Lip Sync
                  </Button>
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}