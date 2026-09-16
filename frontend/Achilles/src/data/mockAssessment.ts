export type SupportedLanguage = "java" | "cpp" | "python" | "javascript";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

export interface Question {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: Record<SupportedLanguage, string>;
  testCases: TestCase[];
}

export const mockAssessment = {
  id: "assessment-001",
  title: "Technical Skill Assessment",
  durationMinutes: 1,

  questions: [
    {
      id: "q1",
      title: "Two Sum",
      difficulty: "Easy" as Difficulty,

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
      difficulty: "Easy" as Difficulty,

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