import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <Editor
      height="100%"
      defaultLanguage="java"
      defaultValue={`class Solution {
    public int[] twoSum(int[] nums, int target) {

    }
}`}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
        padding: {
          top: 16,
        },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
      }}
    />
  );
}