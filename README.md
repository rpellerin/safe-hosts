# Safe Hosts

Browse safely.

```shell
npm install
./index.js --update
./index.js --protect-me
# Check you hosts file contains only lines redirecting to localhost
cat /etc/hosts | grep -E '^(127.0.0.1|#|0.0.0.0)' -v | grep -v '^$'
```
