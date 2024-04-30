//@ts-check

"use strict";

const fs = require("node:fs/promises");

module.exports = {
    /**
     * @param {string} file_path
     */
    async readBenchmark(file_path) {
        const src = await fs.readFile(file_path, 'utf-8');

        /** @type {{prompt?: string, answer?: string, criteria?: string}} */
        const obj = {};

        /** @type {null|'prompt'|'answer'|'criteria'} */
        let curr_field = null;

        for(let line of src.split("\n")) {
            line = line.trimEnd();
            if(line.startsWith("## ")) {
                const title = line.slice(3).trim().toLowerCase()
                switch(title) {
                    case 'prompt':
                    case 'answer':
                    case 'criteria':
                        curr_field = title;
                        break;
                    default:
                        curr_field = null;
                        break;
                }
                continue;
            }

            if(curr_field != null) {
                obj[curr_field] = (obj[curr_field] ?? "") + line + '\n';
            }
        }

        if(obj.prompt && obj.answer && obj.criteria) return ({
            prompt: obj.prompt.trim(),
            answer: obj.answer.trim(),
            criteria: obj.criteria.trim(),
        });
        else return null;
    }
};