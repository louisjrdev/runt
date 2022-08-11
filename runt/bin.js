#!/usr/bin/env node
import meow from 'meow';
import runt from './index.js';

const cli = meow(
	`
	Usage
	  $ runt <task>

	Options
	  --init, -i  Create a default runt.config.json
`,
	{
		importMeta: import.meta,
		flags: {
			init: {
				type: 'boolean',
				alias: 'i',
			},
		},
	}
);

runt(cli.input, cli.flags);
