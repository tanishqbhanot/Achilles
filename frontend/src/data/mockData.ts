export const candidate = {
  name: "Vedaant Agarwal",
  firstName: "Vedaant",
  role: "Software Engineer",
  university: "VIT Vellore",
  graduationYear: 2028,
  github: "github.com/vedaant",
  about:
    "Software engineering student focused on full-stack systems, applied AI, and assessment platforms. Building Achilles to make technical hiring evidence-based instead of resume-based.",
};

export const skills = [
  {
    id: "react",
    name: "React",
    score: 84,
    errors: [
      "Incorrect useEffect dependency handling",
      "Missed unnecessary re-render optimization",
    ],
  },
  {
    id: "node",
    name: "Node.js",
    score: 76,
    errors: ["Incorrect understanding of event loop behavior"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    score: 91,
    errors: [],
  },
  {
    id: "aws",
    name: "AWS",
    score: 57,
    errors: [
      "Weak understanding of IAM",
      "Incorrect security group configuration",
    ],
  },
  {
    id: "python",
    name: "Python",
    score: 86,
    errors: ["Incorrect async programming concept"],
  },
];

export const assessmentScores = {
  dsa: 82,
  technicalQuiz: 76,
  projectAssessment: 88,
  interview: 84,
};

export const projects = [
  {
    id: "1",
    name: "LedgerLens",
    description: "Personal finance and transaction analysis platform.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    github: "github.com/vedaant/ledgerlens",
    contribution:
      "Designed the transaction ingestion pipeline, query model, and React dashboard.",
  },
  {
    id: "2",
    name: "WorkX",
    description: "AI-based skill matching platform.",
    technologies: ["React", "TypeScript", "MongoDB"],
    github: "github.com/vedaant/workx",
    contribution:
      "Built candidate-to-role matching, embeddings storage, and the review UI.",
  },
];

export const skillDetails: Record<
  string,
  {
    breakdown: {
      technicalQuiz: number;
      projectAssessment: number;
      interview: number;
    };
    weakAreas: string[];
    mistakes: string[];
  }
> = {
  react: {
    breakdown: { technicalQuiz: 88, projectAssessment: 82, interview: 81 },
    weakAreas: ["useEffect dependencies", "Memoization", "Render cycles"],
    mistakes: ["Question 3", "Question 11", "Project Question 1"],
  },
  node: {
    breakdown: { technicalQuiz: 74, projectAssessment: 79, interview: 72 },
    weakAreas: ["Event loop", "Streams", "Error-first callbacks"],
    mistakes: ["Question 6", "Question 12"],
  },
  mongodb: {
    breakdown: { technicalQuiz: 93, projectAssessment: 90, interview: 89 },
    weakAreas: [],
    mistakes: [],
  },
  aws: {
    breakdown: { technicalQuiz: 61, projectAssessment: 53, interview: 57 },
    weakAreas: ["IAM", "Security Groups", "Deployment Architecture"],
    mistakes: ["Question 4", "Question 9", "Project Question 2"],
  },
  python: {
    breakdown: { technicalQuiz: 84, projectAssessment: 90, interview: 83 },
    weakAreas: ["Async programming", "GIL implications"],
    mistakes: ["Question 8"],
  },
};

export const detectedSkills = {
  languages: ["Python", "Java", "JavaScript"],
  frameworks: ["React", "Node.js"],
  databases: ["MongoDB", "PostgreSQL"],
  cloud: ["AWS"],
};

export const recentActivity = [
  {
    id: "1",
    title: "DSA / Coding submitted",
    detail: "3/4 hidden tests passed · 82/100",
    time: "12 min ago",
  },
  {
    id: "2",
    title: "Technical Quiz completed",
    detail: "11/15 correct · 76/100",
    time: "28 min ago",
  },
  {
    id: "3",
    title: "Project Assessment completed",
    detail: "LedgerLens + WorkX · 88/100",
    time: "41 min ago",
  },
  {
    id: "4",
    title: "Technical Interview finished",
    detail: "6 follow-ups · 84/100",
    time: "58 min ago",
  },
];

export const dsaProblem = {
  title: "Two Sum Closest to Target",
  difficulty: "Medium",
  statement:
    "You are given an integer array nums and an integer target. Return the two numbers whose sum is closest to target. If multiple pairs are equally close, return the pair with the smaller first value, then the smaller second value.",
  examples: [
    {
      input: "nums = [1, 4, 7, 12], target = 10",
      output: "[4, 7]",
      explanation: "4 + 7 = 11, which is the closest sum to 10.",
    },
    {
      input: "nums = [-3, 2, 8, 10], target = 6",
      output: "[-3, 8]",
      explanation: "-3 + 8 = 5, closest to 6.",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10^5",
    "-10^9 ≤ nums[i], target ≤ 10^9",
    "All numbers in nums are unique.",
  ],
  starterCode: `function twoSumClosest(nums, target) {
  // Write your solution here
  return [];
}
`,
  tests: [
    { id: 1, name: "Sample 1", status: "idle" as const },
    { id: 2, name: "Sample 2", status: "idle" as const },
    { id: 3, name: "Hidden 1", status: "idle" as const },
    { id: 4, name: "Hidden 2", status: "idle" as const },
  ],
};

export const quizQuestions = [
  {
    id: 1,
    prompt: "What happens when a React component's state updates?",
    options: [
      "The entire page reloads",
      "React schedules a re-render of that component and its children",
      "Only CSS is recomputed",
      "The virtual DOM is discarded",
    ],
    answer: 1,
  },
  {
    id: 2,
    prompt: "Which Node.js statement about the event loop is correct?",
    options: [
      "CPU-heavy work is ideal on the main thread",
      "setTimeout(fn, 0) always runs before I/O callbacks",
      "The event loop processes queued callbacks after the current stack clears",
      "Promises block the event loop until resolved",
    ],
    answer: 2,
  },
  {
    id: 3,
    prompt: "In MongoDB, what does an index primarily improve?",
    options: [
      "Write throughput in every case",
      "Read query performance for indexed fields",
      "Document schema validation",
      "Replica lag",
    ],
    answer: 1,
  },
  {
    id: 4,
    prompt: "What is the safest default for an AWS IAM policy?",
    options: [
      "AdministratorAccess on every role",
      "Wildcard resource access with Deny none",
      "Least privilege with explicit Allow on required actions",
      "Inline policies only, never managed",
    ],
    answer: 2,
  },
  {
    id: 5,
    prompt: "Why might PostgreSQL be preferred over MongoDB for LedgerLens?",
    options: [
      "It cannot store JSON",
      "Relational integrity and complex aggregations over transactions",
      "It has no indexes",
      "It does not support joins",
    ],
    answer: 1,
  },
  {
    id: 6,
    prompt: "What does useEffect run after?",
    options: [
      "Only the first paint of the whole app",
      "Commit / paint of the component, depending on dependencies",
      "Before the function body executes",
      "Only on unmount",
    ],
    answer: 1,
  },
  {
    id: 7,
    prompt: "What happens when you await a rejected Promise in async Python?",
    options: [
      "The process always crashes",
      "The exception is raised at the await point",
      "It is silently ignored",
      "It becomes a string",
    ],
    answer: 1,
  },
  {
    id: 8,
    prompt: "A security group in AWS is best described as:",
    options: [
      "A user directory",
      "A stateful virtual firewall for instances",
      "An IAM user group",
      "A Route 53 record set",
    ],
    answer: 1,
  },
  {
    id: 9,
    prompt: "Which structure avoids unnecessary React re-renders?",
    options: [
      "Creating new object literals in render without memoization",
      "Stable callbacks and memoized children when props are unchanged",
      "Putting all state in one giant object that always changes",
      "Using indexes as keys for reorderable lists",
    ],
    answer: 1,
  },
  {
    id: 10,
    prompt: "process.nextTick in Node.js runs:",
    options: [
      "After all timers and I/O",
      "Before the next event-loop phase, after the current operation",
      "Only on process exit",
      "In a worker thread by default",
    ],
    answer: 1,
  },
  {
    id: 11,
    prompt: "A compound MongoDB index is most useful when:",
    options: [
      "Queries filter on prefix fields of the index",
      "You never query those fields",
      "Documents are larger than 16MB",
      "You only insert once",
    ],
    answer: 0,
  },
  {
    id: 12,
    prompt: "Which HTTP status fits a successful resource creation?",
    options: ["200", "201", "204", "304"],
    answer: 1,
  },
  {
    id: 13,
    prompt: "TypeScript's `unknown` is safer than `any` because:",
    options: [
      "It is faster at runtime",
      "You must narrow it before use",
      "It disables type checking entirely",
      "It only works with classes",
    ],
    answer: 1,
  },
  {
    id: 14,
    prompt: "CAP theorem implies a distributed DB must trade off:",
    options: [
      "CSS, API, and performance",
      "Consistency, availability, and partition tolerance",
      "CPU, RAM, and disk",
      "SQL, NoSQL, and Graph",
    ],
    answer: 1,
  },
  {
    id: 15,
    prompt: "In an interview, the strongest evidence of skill is:",
    options: [
      "A keyword on a resume",
      "A specific decision, tradeoff, and outcome from a real project",
      "Years of experience alone",
      "The number of courses completed",
    ],
    answer: 1,
  },
];

export const projectQuestions = [
  {
    id: 1,
    projectName: "LedgerLens",
    prompt:
      "Walk through how LedgerLens ingests and categorizes transactions. Where does validation happen, and why?",
  },
  {
    id: 2,
    projectName: "LedgerLens",
    prompt:
      "Why did you choose PostgreSQL for this project instead of MongoDB?",
  },
  {
    id: 3,
    projectName: "WorkX",
    prompt:
      "How does WorkX represent a candidate's skills, and how would a mismatch be detected?",
  },
];

export const interviewPrompt =
  "Why did you choose PostgreSQL for LedgerLens instead of MongoDB?";

export const interviewFollowups = [
  "How would that choice change if you needed to ingest unstructured bank exports at 10x volume?",
  "Which indexes would you add first, and what query patterns are they for?",
  "If a recruiter claimed you 'know SQL' from this project, what evidence would you show?",
];

export const securityStatus = [
  { id: "fullscreen", label: "Fullscreen", ok: true },
  { id: "camera", label: "Camera", ok: true },
  { id: "microphone", label: "Microphone", ok: true },
  { id: "screen", label: "Screen", ok: true },
  { id: "device", label: "Device Connection", ok: true },
];

export const githubRepos = [
  { name: "ledgerlens", stars: 12, language: "TypeScript" },
  { name: "workx", stars: 8, language: "TypeScript" },
  { name: "achilles", stars: 3, language: "TypeScript" },
];


export const mockAssessment = {
  id: "assessment-001",
  title: "Technical Skill Assessment",
  durationMinutes: 1,

  questions: [
    {
      id: "q1",
      title: "Two Sum",
      difficulty: "Easy",

      description:
        "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.",

      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹",
        "Each input has exactly one solution.",
      ],

      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "nums[0] + nums[1] = 9.",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
        },
      ],

      starterCode: {
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,

        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,

        python: `class Solution:
    def twoSum(self, nums, target):
        pass`,

        javascript: `function twoSum(nums, target) {
    
}`,
      },

      testCases: [
        {
          id: "tc1",
          input: "[2,7,11,15], 9",
          expectedOutput: "[0,1]",
        },
        {
          id: "tc2",
          input: "[3,2,4], 6",
          expectedOutput: "[1,2]",
        },
        {
          id: "tc3",
          input: "[3,3], 6",
          expectedOutput: "[0,1]",
          hidden: true,
        },
      ],
    },

    {
      id: "q2",
      title: "Valid Parentheses",
      difficulty: "Easy",

      description:
        "Given a string containing brackets '(', ')', '{', '}', '[' and ']', determine whether the input string is valid.",

      constraints: [
        "1 ≤ s.length ≤ 10⁴",
        "s consists of parentheses only.",
      ],

      examples: [
        {
          input: 's = "()"',
          output: "true",
        },
        {
          input: 's = "([)]"',
          output: "false",
        },
      ],

      starterCode: {
        java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,

        cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,

        python: `class Solution:
    def isValid(self, s):
        pass`,

        javascript: `function isValid(s) {
    
}`,
      },

      testCases: [
        {
          id: "tc1",
          input: '"()"',
          expectedOutput: "true",
        },
        {
          id: "tc2",
          input: '"([)]"',
          expectedOutput: "false",
        },
      ],
    },
  ],
} as const;