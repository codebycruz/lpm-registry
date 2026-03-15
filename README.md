# lpm-registry

This repository contains the registry for lpm. It simply contains JSON files describing each package with URLs to external sources to gather git repositories.

It takes the vcpkg/cargo route of being a simple registry/index stored on your machine. No pre-built executables or library source code will be distributed here.

## Contributing

Currently, the registry is going to be a manual process of creation of JSON files.

In the future, this will be streamlined with `lpm publish` which should create the file for you and open a link for you to PR it. Or even better, API usage would be available to automate this process.

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
