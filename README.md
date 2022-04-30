## Remove node_modules

This is the CLI that allows removing unused by days count node_modules.
Zero dependencies.✨

## Table of Contents

- [Installation And Usage](#installation-and-usage)
- [Arguments](#arguments)
- [Example Structure](#example-structure)
- [Example Commands](#example-commands)
- [Future Goals](#goals)
- [Contribution](#contribution)

## <a name="installation-and-usage"></a>Installation and Usage

Prerequisites: [Node.js](https://nodejs.org/) (`^12.22.0`, `^14.17.0`, or `>=16.0.0`) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

You can install using npm:

```sh
npm i -g rem-nms
```

After that, you can execute by the command line using:

```sh
rm-nm $COMMAND$ $PATH$ $DAYS$
```

See the [Arguments](#arguments) for more information.

## <a name="arguments"></a>Arguments

Allowed methods:

_**check**_ - check and print folders which should be deleted. (_default method_)

```sh
rm-nm check
```

_**execute**_ - delete folders and print deleted folders.

```sh
rm-nm execute
```

Allowed arguments:

_**path**_ - path to folder with projects. See [Structure](#structure) for more information.

```sh
--path=$VALUE$
```

_**days**_ - how many days passed after the last editing. Any number value, if that will be zero it equal to _all the time_. (Default 14 days)

```sh
--days=$VALUE$
```

## <a name="structure"></a>Example Structure

```sh
projects <-- path to this folder
│
└───sample_proj_1
│   │   node_modules <-- will be deleted
│   │   ...
└───sample_proj_2
│   │   node_modules <-- will be deleted
│   │   ...
└───sample_proj_3
│   │   node_modules <-- will be deleted
│   │   ...

```

## <a name="commands"></a>Example Commands

Default usage:

```sh
rm-nm check --path=../../ --days=7
rm-nm execute --path=../../ --days=7
```

path also can be like this:

```sh
rm-nm check --path=.
```

also you can use like this to check:

```sh
rm-nm --path=../../ --days=7
```

you can also use without days(default 14d), like this:

```sh
rm-nm check --path=../../
rm-nm execute --path=../../
```

days = 0, says that the last changed irrelevant:

```sh
rm-nm --path=../../ --days=0 <-- will be deleted all node_modules which will be found
```

## <a name="goals"></a>Future Goals

- Providing absolute path like `~`.
- Providing more information about projects.

## <a name="contribution"></a>Contribution

Show your ❤️ and support by giving a ⭐. Any suggestions, issues or PR's are welcome!
