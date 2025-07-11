import Link from "next/link";
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from "@/lib/icons";
import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer className="bg-muted/40 py-16">
      <div className="site-container">
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-3">{siteConfig.name}</h3>
          <p className="text-sm font-medium text-gray-400 max-w-md mb-6">
            Full Stack Developer specializing in modern web technologies, CI/CD,
            and testing.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={siteConfig.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={siteConfig.urls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={siteConfig.urls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MailIcon className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm font-medium text-gray-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
