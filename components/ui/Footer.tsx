import { Video } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">LipSync.pro</span>
            </div>
            <p className="text-gray-400">
              The most advanced AI lip sync generator for creators and developers worldwide.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#api" className="hover:text-white transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Use Cases</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/video-localization-best-practices" className="hover:text-white transition-colors">
                  Video Localization
                </Link>
              </li>
              <li>
                <Link href="/ai-lip-sync-for-elearning" className="hover:text-white transition-colors">
                  E-learning
                </Link>
              </li>
              <li>
                <Link href="/ai-lip-sync-for-social-media" className="hover:text-white transition-colors">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link href="/corporate-training" className="hover:text-white transition-colors">
                  Corporate Training
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/author/lipsync-team" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 LipSync.pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}