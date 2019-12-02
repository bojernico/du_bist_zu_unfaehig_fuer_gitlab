# Franklyn-Client
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
# Run the app in development mode
yarn dev

# OR

# Run the app without the developer console
yarn start
```

``` bash
# Package for Windows
yarn package
# Package for Windows with developer console
yarn cross-env DEBUG_PROD=true yarn run package

# Package for Linux (Only possible on Linux)
yarn package --linux
# Package for Linux with developer console
yarn cross-env DEBUG_PROD=true yarn run package --linux

# The executable can now be found in the release directory
cd ./release
```