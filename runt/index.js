import fs from 'fs';
import chalk from 'chalk';
import { spawn } from 'child_process';

const runt = (input, flags) => {
	const configPath = `${process.cwd()}/runt.config.json`;

	if (flags.init) {
		return createConfig(configPath);
	}

	if (!fs.existsSync(configPath)) {
		return console.log(
			chalk.redBright(`
No runt.config.json could be found.
${chalk.whiteBright('You can generate one using: runt --init')}
`)
		);
	}

	if (input.length <= 0) {
		return console.log(
			chalk.redBright(
				'No task was provided, please provide a task to run.'
			)
		);
	}

	const config = JSON.parse(fs.readFileSync(configPath));
	const taskName = input[0];

	if (!Object.keys(config.tasks).includes(taskName)) {
		return console.log(
			chalk.redBright(
				`No task with name '${taskName}' was found in the config.`
			)
		);
	}
	const task = config.tasks[taskName];

	if (Array.isArray(task)) {
		task.forEach((subTask) => {
			runTask(subTask);
		});
	} else {
		runTask(task);
	}
};

const runTask = (task) => {
	const command = task.split(' ');
	const runningTask = spawn(command[0], [
		...command.slice(1, command.length),
	]);
	runningTask.stdout.on('data', (data) => {
		console.log(`${data}`);
	});

	runningTask.stderr.on('data', (data) => {
		console.log(`${data}`);
	});

	runningTask.on('error', (error) => {
		console.log(`${error.message}`);
	});

	runningTask.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
};

const createConfig = (configPath) => {
	const defaultConfig = {
		tasks: {
			test: 'echo "Hello World"',
		},
	};
	fs.writeFileSync(configPath, JSON.stringify(defaultConfig, undefined, 4));
};

export default runt;
