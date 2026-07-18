# Forge

**The remote development workbench for OneType instances.** Chat with a development team of agents that edit a package live on your machine while you watch the real instance update in an iframe.

No local Node, no local Postgres, no local instance. You pick a package on a real, running OneType instance — existing or new — and Forge sets up just that one package folder on your machine. A team of agents (Backender, Frontender, Tester) works on it while you watch the actual remote instance update live.

## How it works

- **Chat, left.** Orah-Forge — the same Orah, aimed only at developing the platform itself. Plans, delegates to the development team, reports back.
- **Iframe, right.** Not a local preview — the real remote instance, live.
- **The team.** Backender, Frontender, Tester and friends live in the `agents` registry like any other agents, only their transport runs `claude -p` on your machine through your Claude Code subscription instead of calling a model API.
- **Sync.** The server is the only source of truth. Forge pulls the chosen package into a local, disposable cache so the agents can read and write it fast; every save pushes straight back. The local copy never outlives the session.
- **Tester.** Sends JavaScript into the live iframe through a `postMessage` bridge, gets results, errors and screenshots back — clicking through the real UI without a local browser of its own.
- **Issues.** Console errors and exceptions caught from the iframe land in a shared table every agent can read before it works.

## Status

Early — the idea is written up in full at `FORGE.md` on the team Desktop, including the working single-project prototype this evolves from and the open questions for the remote layer. This repository currently holds the package shell; the pieces above are being built one at a time.

## Depends on

- `@onetype/agents` — the agentic engine: registries, the model client, the executor, delegation.
- `@onetype/orah` — conversations and the chat surface Orah-Forge is built on.
