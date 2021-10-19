# Franklyn2-Client
Franklyn is an exam support system.

Franklyn Client is the client for the examinees (students).

## Used Technologies
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)

## To Install - For Developers
```bash
# Clone this repository
git clone https://gitlab.com/franklyn-examsupport/franklyn-client.git

# Go into the repository
cd Franklyn

# Install dependencies
yarn

# Decide whether you want to use the local server or the production server:
Location: franklyn-client\Franklyn\app\config\config.js
Variable: const locally = true/false;

# Run the app in development mode
yarn dev

# OR

# Run the app without the developer console
yarn start
```

``` bash
# Package for Windows/Linux/MacOS
yarn package

# Package with developer console
yarn cross-env DEBUG_PROD=true yarn run package

It is necessary to execute these commands on the OS for which you want to package the client.

# The executable can now be found in the release directory
cd ./release
```