# Description of [my own Kata](https://www.codewars.com/kata/6663503171bb305036437e26)

Your task is to return an array of objects, where each object has a key with the tag name and a value with the content inside the tag. If a tag is nested inside another tag, the value should be an array reflecting this tree structure.

Note: Self-closing tags, invalid tags, not closed tags are not valid and should be handled as normal text. Two (or more) duplicate tags should be handled as two (or more) separate tags.

Examples:
---------------------
Input: "Hello"

Output: 
```[]```
---------------------
Input: 
```"Hello, my name is <name>John</name>."```

Output:
```
[{ "key": "name", "value": "John" }]
```
---------------------
Input: ```"Hello, my name is <name>John</name> and <surname>Musk</surname>."```

Output:
```
[
  { "key": "name", "value": "John" },
  { "key": "surname", "value": "Musk" }
]
```
---------------------
Input: ```"Hello, my name is <person><name>John</name> and <surname>Musk</surname></person>."```

Output:
```
[
  {
    "key": "person",
    "value": [
      { "key": "name", "value": "John" },
      " and ",
      { "key": "surname", "value": "Musk" }
    ]
  }
]
```
---------------------
Input: ```"Hello, my name is <name>John</name> and <name>Peter</name>."```

Output:
```
[
  {
    "key": "name",
    "value": "John"
  },
  {
    "key": "name",
    "value": "Peter"
  }
]
```

Happy Coding!
