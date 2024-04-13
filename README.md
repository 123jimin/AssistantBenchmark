# Jimin's Benchmark

This is a collection of my (@123jimin) personal benchmark on AI assistants.

## Main Focuses

- Tasks mainly related to mathematics, programming and competitive programming.
- Requires modest, but not too advanced, domain-specific knowledge.
- Requires AIs to perform logical reasoning that's relatively easy for a human.
- Logical consistency is considered much more importantly than obtaining a correct result.

## Results

## Criteria

- Each benchmark has a set of criterias that will be used to grade AIs' results.
- Whether a generated code runs accurately is *not* a part of criteria.
- Instead, the criterias are mainly about whether a response is logically consistent.

### Setup

- By default, RAGs, CoT, ToT, and other similar "external" techniques are not used.
- Prompts are written in a way that a user may naturally ask, and are identical across all AIs being tested on.
- Some prompts may include personality prompts ("you are...").
- Some prompts may include instructions for AIs to avoid unwanted responses (incorrectly assuming what a user may want).

When an AI assistant uses non-default setup (custom system prompt, RAGs, ...), it will be mentioned.

## The List

To prevent contamination, I will not provide prompts, or detailed explanations on what is being tested on.

Difficulty is based on [solved.ac levels](https://solved.ac/problems/level).

### Main List

Tasks that require more logical reasoning than simple knowledge retrieval:

(TBD)

### Sub List

Tasks that sufficient amount of knowledge retrieval may be enough to resolve it:

(TBD)

## Example Tasks

While these are not parts of my benchmark, these serve as examples of what tasks in my benchmark would look like.

| Name | Description | Difficulty |
|------|-------------|------------|
| [EvenPerfect](/example/EvenPerfect.md) | Performing logical reasoning about even perfect numbers on a Python code. | Gold |
| [IdiotSort](/example/IdiotSort.md) | Ientify problems in an absurd sorting algorithm. | Gold |