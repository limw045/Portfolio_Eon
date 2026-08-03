/**
 * ide-simulator.js - Interactive Web IDE Simulator Module
 * Renders C++, C#, Java, Python code snippets and simulates terminal execution with typewriter animations.
 */

export class IDESimulator {
  constructor() {
    this.currentLang = 'cpp';
    this.isTyping = false;

    this.snippets = {
      cpp: {
        filename: 'cpp_memory.cpp',
        code: `// Lim Wei Jian - C++ Custom Smart Pointer & Memory Arena Demo
#include <iostream>
#include <memory>

template<typename T>
class UniqueRef {
private:
    T* ptr;
public:
    explicit UniqueRef(T* p = nullptr) : ptr(p) {}
    ~UniqueRef() { delete ptr; }
    T& operator*() { return *ptr; }
    T* operator->() { return ptr; }
};

int main() {
    std::cout << "[C++ Arena] Allocating high-performance memory block..." << std::endl;
    UniqueRef<int> data(new int(374)); // CGPA 3.74
    std::cout << "[C++ Arena] Value dereferenced: " << *data << std::endl;
    return 0;
}`,
        output: `> g++ -O3 -std=c++20 cpp_memory.cpp -o app && ./app
[C++ Arena] Allocating high-performance memory block...
[C++ Arena] Value dereferenced: 374
[C++ Memory] UniqueRef automatically deallocated memory block 0x7ffe9a80. Clean exit (0).`
      },
      csharp: {
        filename: 'GameLogic.cs',
        code: `// Lim Wei Jian - C# LINQ & Game Engine Entity Pipeline
using System;
using System.Linq;
using System.Collections.Generic;

public class Character {
    public string Name { get; set; }
    public int Level { get; set; }
}

public class Program {
    public static void Main() {
        var party = new List<Character> {
            new Character { Name = "Hunter", Level = 85 },
            new Character { Name = "Mage", Level = 92 },
            new Character { Name = "Assassin", Level = 99 }
        };

        var eliteMembers = party.Where(c => c.Level > 90).Select(c => c.Name);
        Console.WriteLine($"[C# LINQ] Elite Party Members: {string.Join(", ", eliteMembers)}");
    }
}`,
        output: `> dotnet run --project GameLogic.csproj
[C# LINQ] Executing deferred query against Party collection...
[C# LINQ] Elite Party Members: Mage, Assassin
[C# Engine] Entity pipeline execution complete. Memory garbage collected.`
      },
      java: {
        filename: 'TaskQueue.java',
        code: `// Lim Wei Jian - Java Multi-Threaded Concurrent Task Executor
import java.util.concurrent.*;

public class TaskQueue {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        System.out.println("[Java ThreadPool] Initializing 3 Worker Threads...");

        for (int i = 1; i <= 3; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("[Worker " + Thread.currentThread().getId() + "] Processing Task #" + taskId);
            });
        }

        executor.shutdown();
        executor.awaitTermination(5, TimeUnit.SECONDS);
    }
}`,
        output: `> javac TaskQueue.java && java TaskQueue
[Java ThreadPool] Initializing 3 Worker Threads...
[Worker 14] Processing Task #1
[Worker 15] Processing Task #2
[Worker 16] Processing Task #3
[Java Runtime] All worker threads joined successfully.`
      },
      python: {
        filename: 'rag_agent.py',
        code: `# Lim Wei Jian - Multi-Agent RAG Orchestrator (MMU FYP Core)
import json

class RAGOrchestrator:
    def __init__(self, agent_name: str):
        self.agent_name = agent_name

    def retrieve_and_generate(self, prompt: str) -> dict:
        print(f"[{self.agent_name}] Vector Search in Official Documents...")
        context = "JKR Traffic Impact Assessment (TIA) Regulatory Standard Sec 4.2"
        response = f"Generated TIA Compliance Report based on: '{context}'"
        return {"status": 200, "efficiency_boost": "70%", "result": response}

if __name__ == "__main__":
    agent = RAGOrchestrator("JKR_MultiAgent_RAG")
    print(json.dumps(agent.retrieve_and_generate("Draft TIA Report"), indent=2))`,
        output: `> python3 rag_agent.py
[JKR_MultiAgent_RAG] Vector Search in Official Documents...
{
  "status": 200,
  "efficiency_boost": "70%",
  "result": "Generated TIA Compliance Report based on: 'JKR Traffic Impact Assessment (TIA) Regulatory Standard Sec 4.2'"
}
[Python RAG] Zero hallucinations detected. Compliance verified (100%).`
      }
    };

    this.init();
  }

  init() {
    const tabs = document.querySelectorAll('.ide-tab');
    const runBtn = document.getElementById('btn-run-code');

    // Bind tab clicks
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const lang = tab.getAttribute('data-lang');
        this.switchLang(lang);
      });
    });

    // Bind run button
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        this.runCode();
      });
    }

    // Set default snippet
    this.switchLang('cpp');
  }

  switchLang(lang) {
    if (this.isTyping) return;
    this.currentLang = lang;

    // Update tab UI
    const tabs = document.querySelectorAll('.ide-tab');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-lang') === lang) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update Editor content
    const codeDisplay = document.getElementById('code-content');
    const consoleOutput = document.getElementById('console-output');
    
    if (codeDisplay && this.snippets[lang]) {
      codeDisplay.textContent = this.snippets[lang].code;
    }
    if (consoleOutput) {
      consoleOutput.textContent = `> Ready for execution. Selected ${this.snippets[lang].filename}. Click "Run Code" above.`;
    }
  }

  runCode() {
    if (this.isTyping) return;
    const consoleOutput = document.getElementById('console-output');
    if (!consoleOutput) return;

    this.isTyping = true;
    const targetText = this.snippets[this.currentLang].output;
    consoleOutput.textContent = '> Executing compilation pipeline...\n';

    let index = 0;
    const timer = setInterval(() => {
      consoleOutput.textContent += targetText.charAt(index);
      index++;
      if (index >= targetText.length) {
        clearInterval(timer);
        this.isTyping = false;
      }
    }, 15);
  }
}
