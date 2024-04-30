const {OpenAI} = require('openai');
const {stdout} = require('process');

/** @typedef {{base_url: string, api_key: string, model: string, benchmark: {prompt: string}, stream?: boolean}} RunBehcnmarkArgs */

module.exports = {
    /**
     * @param {RunBehcnmarkArgs} args
     */
    async runBenchmark(args) {
        const {base_url, api_key, model, benchmark, stream} = args;

        const openai = new OpenAI({
            baseURL: base_url,
            apiKey: api_key,
            defaultHeaders: {
                "HTTP-Referer": "https://github.com/123jimin/AssistantBenchmark",
                "X-Title": "Jimin's Benchmark",
            },
        });

        if(stream) {
            const stream = await openai.chat.completions.create({
                model: model,
                messages: [
                    {role: "user", content: benchmark.prompt},
                ],
                stream: true,
            });
    
            //@type string[]
            const delta_contents = [];
    
            for await(const chunk of stream) {
                const choices = chunk.choices;
                if(!choices?.length) continue;
    
                const [{delta: {content}}] = choices;
                if(!content) continue;
    
                stdout.write(content);
                delta_contents.push(content);
            }
    
            stdout.write("\n");
            return delta_contents.join("");
        } else {
            const res = await openai.chat.completions.create({
                model: model,
                messages: [
                    {role: "user", content: benchmark.prompt},
                ],
            });
    
            return res.choices[0]?.message?.content ?? "";
        }
    }
};