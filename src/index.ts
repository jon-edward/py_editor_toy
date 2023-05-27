import { loadPyodide } from "pyodide";

async function main(): Promise<string> {
  const pyodide = await loadPyodide({ indexURL: "pyodide" });
  const output: string = pyodide.runPython('"Hello, world!"');
  return output;
}

main().then((result) => console.log(result));
