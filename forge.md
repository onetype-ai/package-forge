# Forge — the idea, distilled

Written 2026-07-19, after the first working end-to-end proof. This is not a
spec or a how-to — it's the reasoning behind the shape Forge took, so the
next session doesn't have to re-derive it.

## What Forge actually is

Forge is a development LEAD, not a chatbot with file access. It never writes
code itself — it plans, then delegates to its own team through tools. Every
member of that team is just a regular agent in the `agents` registry, model
and all. There is no separate "Forge system" underneath; Forge is what you
get when the existing agent/tool/provider machinery is pointed at itself.

## The two-company idea, and why we rejected it

The first framing was "Orah-Forge here talks to Claude-Forge over there,
and Claude-Forge has its own team." We built the wire for that (agent-forge
gRPC gateway) before realizing it was one layer too many: Claude Code
already spawns its own sub-agents via `--agents` + the `Task` tool, so a
second orchestrator on our side calling a black-box orchestrator on the
other side just duplicates the planning step for no gain.

What we landed on instead: ONE orchestrator (Forge, on our side), and every
"remote worker" is a stateless process spawn on the developer's machine.
Forge IS the brain. The developer's machine is just where the hands are.

## Every worker call is a fresh process

No persistent Claude Code session, no `--agents` sub-team, no shared state
between calls. Every `claude-cli.ask` request spawns one `claude -p` process,
it runs to completion, the process dies. This was a deliberate simplicity
choice: a persistent session would need lifecycle management, crash
recovery, session pinning to a gRPC stream — a fresh process needs none of
that, and the cost (losing conversation continuity between tool calls) is
one we don't feel yet at this scale.

## Claude Code becomes just another provider

The real unlock: `claude-cli` is a provider in `agents.providers`, exactly
like `anthropic` or `openai` or `local`. It has no `endpoint` — instead of
`send`/`receive` over HTTP, it has a `call()` function that reaches a
connected gRPC stream instead of `fetch()`. That one seam
(`provider.Get('call')` as an alternative to `send`/`receive`) is what let a
completely different transport (spawn-a-process-on-a-remote-machine) slot
into an executor that was written assuming HTTP. Any future "call an
external CLI on someone else's machine" provider reuses the same seam.

## Permission is which tools you hand over, not a prompt asking nicely

We looked at `--permission-mode acceptEdits` (Claude Code asks, then
auto-approves) and rejected it for Forge in favor of
`--dangerously-skip-permissions` — because the real boundary isn't a
runtime prompt, it's **which tools the caller chose to send for this one
call**. An agent with `metadata.tools: ['WebSearch', 'WebFetch']` physically
cannot touch a file no matter what permission mode says, because `Write` is
never in the list. The tool list IS the sandbox. This is also why we're
leaning toward keeping code-writing workers off `Bash` entirely rather than
trusting a system prompt not to run `npm install` — a instruction can be
ignored, a missing tool cannot.

## Hierarchy: parent + isHidden, not a special case

The team-of-agents idea (Forge has workers nobody else sees or can call)
didn't need a new mechanism — two fields on the existing `agents` registry
did it: `parent` (a child is only listed/runnable by its own parent) and
`isHidden` (invisible and uncallable by ANYONE, even the parent — the only
way in is a direct, explicit call, like the chat command hardcoding
`agent: 'forge'`). Forge itself is `isHidden: true` — Orah never sees it,
never accidentally delegates to it. This composes: any future package can
build its own private sub-team the same way, no new primitive needed.

## The Planner is idea work, not code work

First worker built: the Planner. Deliberately NOT a coding agent — it has
no folder, no file tools, only `WebSearch` + `WebFetch`. Its job is working
out what an app needs to actually be (screens, auth, data flow, what's
worth researching before guessing) before anyone touches code. This was a
conscious ordering choice: idea clarity before implementation, enforced by
literally not giving the agent the tools to skip ahead.

## What surprised us

- A local 9B model chains ten tools and delegates correctly with zero
  special-casing — the executor loop doesn't care how smart the model
  behind it is.
- Claude Code refuses to launch inside another Claude Code session, and
  setting the env var to an empty string still counts as "set" — it must be
  fully removed from the child process env, not blanked.
- One real research+plan round trip (two research calls + one task call to
  the Planner) took about 5 minutes end to end — entirely because every
  hop in the chain is synchronous HTTP. The result was worth the wait, but
  it's the clearest signal yet that the async/runner layer (already flagged
  in `agents/instructions.md`) stops being optional once real workers with
  real research depth are in the loop.
- The full raw output of every tool call already lives in
  `orah_conversations.messages` — nothing extra needed to be built to go
  back and read exactly what Claude said at each step, it was already there.

## Open, for whenever we pick this back up

- The `agent-forge` gRPC channel exists and is tested (echo-level) but
  unused for anything real yet — the intended role is dev-session
  management (which package/folder, health-check after a change, future
  file sync), deliberately kept separate from `claude-cli` which is purely
  "spawn Claude and give me the answer."
- No `--max-turns` equivalent exists in this Claude Code version — only
  `--max-budget-usd`. A runaway worker is bounded by budget, not by step
  count.
- Codebase-wide semantic search (a `codebase` or `atlas` package: embed
  every package's code, let any agent ask "how do I build user auth" and
  get back relevant real examples) was raised as the way to give workers
  real repo knowledge without handing them broad file access. Not started.
