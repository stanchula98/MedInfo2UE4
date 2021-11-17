# Medizinische Informatik 2 
## Übung 4a                


### parser setup
```
install all necessary dependencies

"dependencies": {
    "sqlite3": "^5.0.2",
    "nodejs": "v14.18.1."
  }
```

```
change all paths on files:

- meta_parser.js
- spteps_parser.js
- vitalparameter_parser.js

```

## run parser

```
cd /path/to/parser
node meta_parser.js
node steps_parser.js
node vitalparameter_parser.js

```
Now all your parsed JSON files should be generated in your disired destination.


## migrate date to sqlite database

```
cd /path/to/parser
node db_migrate.js

```

### SAMPLE APPLICATION

To look through the data you can visit the website: https://medinfo2ue4.onrender.com/

GitHub-Repository: https://github.com/stanchula98/MedInfo2UE4







