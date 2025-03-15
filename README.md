
# Connect the Dots

A simple JavaScript game where you connect the dots to form shapes.

## Description

Connect the Dots is an engaging JS game built using EaselJS, where players drag a turtle across the screen to connect numbered dots, thereby forming various shapes. Designed for both entertainment and educational purposes, the game helps improve hand-eye coordination and shape recognition skills.

## Features

-   **Interactive Turtle**: Drag the turtle icon to connect the dots seamlessly.
-   **Multiple Shapes**: Connect the dots to form different predefined shapes.
-   **Clear Drawing**: Easily clear your drawings with the Clear button to start anew.
-   **Responsive Design**: Play the game on various devices and screen sizes.
-   **Customizable Drawing Tools** (Planned Feature)
-   **Undo/Redo Functionality** (Planned Feature)

## Installation

You can install and run Connect the Dots in several ways:

### 1. Download as ZIP

1.  **Download** the repository as a ZIP file.
2.  **Extract** the contents to a location on your local machine.
3.  **Open** `index.html` in the root directory of the extracted folder using your favorite browser.

### 2. Clone the Repository via Git

1.  **Clone** the repository using Git:
    
     
    `git clone https://github.com/sugarlabs/connectthedots.git` 
    
2.  **Navigate** to the cloned directory:
    
       
    `cd connectthedots` 
    
3.  **Open** `index.html` in your browser:
    
       
    `open index.html` 
    
    _(Alternatively, you can manually open the file through your browser's file explorer.)_
    

### 3. Fork and GitHub Pages

1.  **Fork** this repository to your GitHub account.
2.  **Enable GitHub Pages** in the repository settings, building it from the `master` branch.
3.  **Visit** the GitHub Pages URL provided to play the game.

For more information on setting up GitHub Pages, read [this article](https://docs.github.com/en/pages/getting-started-with-github-pages).
### 4. **Integration with Sugarizer**

**Sugarizer** is a web-based implementation of the Sugar Learning Platform, allowing you to run Sugar activities directly in your browser without installing Sugar Desktop. Follow the steps below to integrate and run **Connect the Dots** on Sugarizer.

#### **Prerequisites**

-   **Sugarizer Environment**: Ensure you have access to Sugarizer. You can use the Sugarizer Demo or install Sugarizer locally following the [Sugarizer Installation Guide](https://github.com/llaske/sugarizer?tab=readme-ov-file).
    
-   **Node.js and npm**: Ensure you have [Node.js](https://nodejs.org/) and npm installed on your machine to manage dependencies.
    
-   **Volo**: Install Volo, a tool used by Sugarizer to manage dependencies and create activities.
    
    `npm install -g volo` 
    

#### **Steps to Integrate Connect the Dots into Sugarizer**

1.  **Clone the Sugarizer Repository**
    
    ```
    git clone https://github.com/sugarizer/sugarizer.git
    cd sugarizer
    ``` 
    
2.  **Create the Activity from the Template**
    
    Navigate to the `activities` directory and create a new activity based on the default template.
    
    ```
    cd sugarizer/activities
    volo create ConnectTheDots.activity ./ActivityTemplate
    cd ConnectTheDots.activity
    ``` 
    
3.  **Copy Connect the Dots Files into the Activity Structure**
    Copy the project form this repository as it is with minor changes.
    
    **File Structure:**   
    ```
    connectthedots.activity/
    ├── activity/
    │   ├── activity.info
    │   ├── activity-icon.svg    
    ├── css/
    │   └── activity.css
    ├── icons/
	│	├── clear-button.svg
    │   ├── new-button.svg
    ├── images/
    │	├── dot.svg
    │   ├── pen.svg
    │	├── star.svg
    ├── js/
    │   ├── activity.js
    │   └── activity-works.js
    ├── lib/
    ├── po/  
    ├── index.html   
    ├── LICENSE
    ├── NOTICE     
    ├── package.json
    └── setup.py
    ```
    

6.  **Update `activities.json`**
    
    If you're not using a module bundler, ensure that `activities.json` in the Sugarizer directory includes your new activity. 
    ```
    [
        `{"id": "org.sugarlabs.ConnectTheDotsActivity","mame": "Connect the Dots","version": 1,"directory": "activities/ConnectTheDots.activity","icon": "activity/activity-icon.svg","favorite": true,"activityId": null}` 
    ]
    ``` 
    
7.  **Install Dependencies**
    
    Navigate to your project's root directory and install necessary dependencies, including Electron, which is required to run Sugarizer as a desktop application.

    
    ```
    cd sugarizer
    npm install
    ``` 
    
8.  **Install Electron**
    
    If the error you're encountering suggests that Electron is not installed or not found. Follow these steps to install Electron:
    
    -   **Install Electron Locally as a Dev Dependency**
        
           `npm install --save-dev electron` 
        
    -   **Alternatively, Install Electron Globally**        
             
        `npm install -g electron` 
        
        _(Note: Installing Electron globally allows you to run Electron commands from any directory.)_
        
9.  **Run the Application**
    
    Now, you can start Sugarizer and test your **Connect the Dots** activity.
    
      `npm start` 
      `npm start -- --window`// for window view mode 
    
    If you encounter the error `sh: 1: electron: not found`, ensure that Electron is correctly installed by following step 8.
    

### Running Connect the Dots on Sugarizer

To run **Connect the Dots** within the Sugarizer environment, follow these additional steps:
1.  **Start Sugarizer**
    
    In the Sugarizer root directory, run:    
    `npm start` 
    
    This command launches Sugarizer using Electron, allowing you to interact with your **Connect the Dots** activity within the simulated Sugar environment.
    
3.  **Access the Activity**
    
    Once Sugarizer is running:
    
    -   Click on the **Connect the Dots** activity icon in the Sugarizer launcher.
    -   The game should load, displaying the toolbar and canvas.
    -   Follow the on-screen instructions to start connecting the dots.

## Usage

Once you've opened the game in your browser:

1.  **Follow** the on-screen instructions to start connecting the dots.
2.  **Drag** the turtle to move between dots in numerical order to form the desired shape.
3.  **Use** the **Clear** button to erase your drawings and start over without affecting the dot positions.

## Support

If you encounter any issues or have suggestions, please open an [issue](https://github.com/sugarlabs/connectthedots/issues) in the Connect the Dots GitHub repository, and we'll get back to you as soon as possible.

## Contribution

We welcome contributions to enhance the Connect the Dots game! To contribute:

1.  **Fork** the repository on GitHub.
    
2.  **Clone** your forked repository to your local machine.
    
3.  **Create** a new branch for your feature or bug fix:
    
    `git checkout -b feature/YourFeatureName` 
    
4.  **Commit** your changes with descriptive messages:
 
    `git commit -m "Add feature: YourFeatureName"` 
    
5.  **Push** your changes to your forked repository:
    
    `git push origin feature/YourFeatureName` 
    
6.  **Open** a Pull Request in the original repository, describing your changes and their purpose.
    

Please ensure your contributions follow our [Code of Conduct](CODE_OF_CONDUCT.md) and maintain code quality and readability.

## Technologies Used

-   **JavaScript**: Core language for game logic.
-   **EaselJS**: A JavaScript library for working with HTML5 Canvas, used for rendering graphics.
-   **SVG**: Scalable Vector Graphics for button icons and game elements.
-   **HTML/CSS**: Markup and styling for the game's interface.


## Acknowledgements

-   **EaselJS** for providing a robust framework for canvas-based graphics.
-   **Sugar Labs** community for inspiration and support.
-   **Open Source Contributors** who have helped improve this project.