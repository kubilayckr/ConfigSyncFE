# ConfigSync - Frontend (React)

## Project Description
ConfigSync Frontend is a React application that dynamically manipulates the DOM based on configuration data fetched from the backend API or local YAML files. The application either retrieves configuration data via API calls (in JSON format) or reads YAML files located in the public resources folder to dynamically render content on web pages based on predefined rules.

## Technologies Used
- **React 19.1.0**
- **Axios (for API calls)**
- **js-yaml (for parsing YAML files)**
- **React Router (for navigation)**

## Setup & Installation
Follow these steps to set up and run the frontend application:

### 1. Clone the Repository:
```sh
git clone https://github.com/kubilayckr/ConfigSyncFE.git
cd configsync-frontend
```

### 2. Install Dependencies:
```sh
npm install
```

### 3. Run the Application:
```sh
npm start
```

The application will start on:
```
http://localhost:3000/
```

## Data Handling & Dynamic DOM Manipulation

The application supports two modes for fetching configuration data:

### 1. **Fetching Configuration from the Backend API**  
The frontend makes API calls to the backend to retrieve configuration data in JSON format.

### 2. **Reading Configuration from Local YAML Files**  
Alternatively, the frontend can read configuration data from YAML files located in the `public/resources` folder. The YAML data is parsed and used to update the DOM.

## API Integration
The frontend communicates with the backend using API calls to fetch configuration data. This data is used to dynamically update the DOM based on the configuration rules.

### ConfigService

The `ConfigService` is responsible for fetching configuration data from the backend API and loading it from local YAML files. It handles both the API calls and reading YAML files to provide the necessary configuration data for the application.

### ConfigValidator

The `ConfigValidator` is responsible for validating the configuration data. It ensures that the data retrieved from both the API (in JSON format) and the YAML files is structured correctly and adheres to predefined templates. This validation ensures that the configuration data is safe to use for dynamic rendering.

### DomManipulator

The `DomManipulator` is responsible for dynamically updating the DOM based on the configuration data and predefined rules. The DOM is manipulated based on the "action" specified in the configuration, such as showing/hiding elements, changing text, or updating styles.
