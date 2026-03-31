# lde-org/registry

This repository contains the registry for LDE.

## How it works

The registry is just an easily indexable list of JSON files describing information for a package, and where to get it from.

No pre-built executables or library source code will be stored here.

## Contributing

You can use `lde publish` which will create a pull request with the changes to add your package to the registry.

But the process is still largely manual, in the future as demand increases it will be streamlined.

### Example

```json
{
	"name": "hood",
	"description": "Cross-platform rendering in pure LuaJIT.",
	"authors": ["David Cruz <codebycruz@gmail.com>"],
	"git": "https://github.com/codebycruz/hood",
	"branch": "master",
	"versions": {
		"0.1.0": "5d4bb28703d8f1c17a0e241810145194a51042f0"
	}
}
```
