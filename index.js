import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const C = {
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  gray: "\x1b[90m",
  reset: "\x1b[0m",
  bold: "\x1b[1m"
};

let events = [];

function header() {
  console.clear();
  console.log(C.cyan + C.bold + "R I V E N T" + C.reset);
  console.log(C.magenta + "Reactive Intercom Event Engine" + C.reset);
  console.log(C.gray + "stream • inspect • history • exit" + C.reset);
  console.log("");
}

function now() {
  return new Date().toLocaleTimeString();
}

function prompt() {
  rl.question(C.cyan + "rivent> " + C.reset, handle);
}

function streamEvent() {
  rl.question("Event Name: ", (name) => {
    const ev = {
      id: events.length + 1,
      name,
      time: now()
    };
    events.push(ev);

    console.log("\n" + C.green + "Event Recorded" + C.reset);
    console.log("ID:", ev.id);
    console.log("Name:", ev.name);
    console.log("Time:", ev.time, "\n");
    prompt();
  });
}

function inspect() {
  if (!events.length) {
    console.log(C.yellow + "No events found.\n" + C.reset);
    return prompt();
  }

  const ev = events[events.length - 1];
  console.log("\n" + C.magenta + "Latest Event" + C.reset);
  console.log("ID:", ev.id);
  console.log("Name:", ev.name);
  console.log("Time:", ev.time, "\n");
  prompt();
}

function history() {
  if (!events.length) {
    console.log(C.yellow + "History empty.\n" + C.reset);
    return prompt();
  }

  console.log("\n" + C.cyan + "Event History" + C.reset);
  events.forEach(e =>
    console.log(`#${e.id} • ${e.name} • ${e.time}`)
  );
  console.log("");
  prompt();
}

function handle(cmd) {
  switch (cmd.trim()) {
    case "stream":
      streamEvent();
      break;
    case "inspect":
      inspect();
      break;
    case "history":
      history();
      break;
    case "exit":
      console.log(C.gray + "Shutdown RIVENT\n" + C.reset);
      rl.close();
      break;
    default:
      console.log(C.yellow + "Unknown command\n" + C.reset);
      prompt();
  }
}

header();
prompt();
