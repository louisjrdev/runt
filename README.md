# Runt

A simple task runner for node.

## Getting started

Install the package
`npm install runt` or `yarn add runt`

Then initialise the `runt.config.json`
`runt -i`

Then run the test task
`runt test`

## Examples

A singular command

```json
{
	"tasks": {
		"test": "echo \"Hello World!\""
	}
}
```

Which can be executed like so:
`runt test`

Multiple commands in parallel

```json
{
	"tasks": {
		"test": "echo \"Hello World!\"",
		"test2": ["ping google.com -c 5", "echo \"Hello World2!\""]
	}
}
```

Which can be executed like so:
`runt test2`
