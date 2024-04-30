//@ts-check

"use strict";

const { ArgumentParser } = require('argparse');
const { readBenchmark } = require("./benchmark.js");
const { runBenchmark } = require("./runner.js");
const process = require('node:process');
const fs = require('node:fs/promises');
const readline = require('node:readline/promises');

const parser = new ArgumentParser();

parser.add_argument('-e', "--endpoint", {help: "OpenAI-compatible endpoint (defaults to OpenRouter).", default: "https://openrouter.ai/api/v1/"});
parser.add_argument('-k', "--key", {help: "Name for environment variable containing the API key (defaults to OPENROUTER_API_KEY).", default: "OPENROUTER_API_KEY"});
parser.add_argument('-m', "--model", {help: "Model name to be used.", required: true});
parser.add_argument('-b', "--benchmark", {help: "Benchmark to run.", required: true});
parser.add_argument('-c', "--count", {help: "How many times to run.", default: 1});
parser.add_argument('-s', "--save", {help: "Directory path for saving the results."});
parser.add_argument('--no-interactive', {help: "Just save the responses.", action: 'store_true'});

const args = parser.parse_args();

/**
 * @param {{endpoint: string, key: string, model: string, benchmark: string, count: number, save?: string, no_interactive?: boolean}} args
 */
async function main(args) {
    const benchmark = await readBenchmark(args.benchmark);
    if(!benchmark) {
        throw new Error(`Invalid benchmark: ${args.benchmark}!`);
    }

    const benchmark_name = args.benchmark.split(/[/\\]/).at(-1)?.split('.').at(0) ?? args.benchmark.split('.').at(0) ?? args.benchmark;

    console.log(`Benchmarking ${benchmark_name}\npath = "${args.benchmark}"\n`);
    console.log(`## Prompt\n\n${benchmark.prompt}\n\n========\n`);
    console.log(`## Answer\n\n${benchmark.answer}\n\n========\n`);
    console.log(`## Criteria\n\n${benchmark.criteria}\n\n========\n`);

    /** @type {string[]} */
    const responses = [];

    /** @type {string[]} */
    const scores = [];

    const rl = readline.createInterface({input: process.stdin, output: process.stdout});

    for(let n=1; n <= args.count; ++n) {
        console.log(`## Response ${n} of ${args.count}\n`);
        responses.push(await runBenchmark({
            base_url: args.endpoint,
            api_key: process.env[args.key] ?? "",
            model: args.model,
            benchmark,
            stream: true,
        }));
        console.log("");

        if(!args.no_interactive) {
            scores.push((await rl.question("- Enter the score for above output: ")).trim());
            console.log("");
        }
    }

    if(args.save) {
        console.log(`Saving to "${args.save}"...`);
        for(let i=0; i<responses.length; ++i) {
            const file_name = `${args.model.toLowerCase().replace(/[^a-z0-9]+/ig, '_')}-${benchmark_name}-${(i+1).toString().padStart(2, '0')}`;
            await fs.writeFile(`${args.save}/${file_name}`, responses[i]);
        }
    }

    if(scores.length) {
        console.log(`${benchmark_name},${scores.join(',')}`);
    }

    return 0;
}

main(args).then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
});