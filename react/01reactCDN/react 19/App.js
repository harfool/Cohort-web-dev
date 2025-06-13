import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
const App = ()=>{

    return React.createElement(
        "div",
        {id : "react-19"},
        React.createElement(
            "h1",
            {},
            "react 19 is here with CDN"
        )
    )
}

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App))