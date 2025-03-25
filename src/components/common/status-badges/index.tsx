import { SonarQubeIcon, CICDIcon, JestIcon } from "@/lib/icons";

const StatusBadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      <a
        href="https://github.com/yourusername/portfolio/actions"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 hover:bg-green-200 transition-colors dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
      >
        <CICDIcon className="h-4 w-4" />
        <span>CI/CD: Passing</span>
      </a>

      <a
        href="https://sonarcloud.io/project/overview?id=yourusername_portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
      >
        <SonarQubeIcon className="h-4 w-4" />
        <span>Quality Gate: Passed</span>
      </a>

      <a
        href="https://github.com/yourusername/portfolio/actions"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 hover:bg-red-200 transition-colors dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
      >
        <JestIcon className="h-4 w-4" />
        <span>Tests: 100%</span>
      </a>
    </div>
  );
};

export default StatusBadges;
