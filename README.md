# advanced-lambda-context
Initially AWS Lambda boilerplate; all the things needed to work with lambda's.


## 

for bunyan testing
```
npm install bunyan --no-save
npm install bunyan-prettystream-circularsafe --no-save
```



## Future
  - [ ] generate docs
  - [ ] publish script
  - [ ] support alternate serialized config (only supports yml)
  - [ ] consider writting in google cloud version
  - [ ] consider azure version
  - [ ] include event schemas
  - [ ] write other event parsers as needed
    - [ ] sqs
    - [ ] sns -> sqs
  - [ ] write unit test for ssm.expandParamStoreVariables
  - [ ] unhappy path unit test for snsn event parse
  - [ ] unit tests for 3rd party peer dependencies
