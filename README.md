# Safe Hosts

Browse safely.

```shell
npm install
./index.js --update
# Check you hosts file contains only lines redirecting to localhost
cat hosts_files/* | grep -E '^(127.0.0.1|\s*#|0.0.0.0)' -v | grep -v '^$'
./index.js --protect-me
```
