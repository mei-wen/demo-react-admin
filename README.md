# README #

demo-react-admin

### Installation ###

* Install dependencies
    ```Bash
    npm install
    ```

### Run the App ###
 
* Simply run:
    ```Bash
    npm start
    ```
    
* The App will be running on localhost:3000
* Since the App requests APIs from _demo-node-api_, you need to run both of the projects to check out the full flow of this app.
* Or you can simply revise the state _isAuthenticated_ in _App.js_ to look inside. 

### Deployment ###  
 
* To build, run:
  ```Bash
    npm run build
    ```
* Copy the _build_ to the _src_ dic of _demo-node-api_
* The App will be running on localhost:3001


### TODO ###

* More functionality
* Optimization
* ~~Antd customized theme~~
* ~~Replace css with Less~~
* ~~Replace Fetch with Axios~~
* ~~Add request/response interceptors~~
* Webpack v4.x
* Redux-saga
* reselect
* Immutable
* Unit test
* SSR