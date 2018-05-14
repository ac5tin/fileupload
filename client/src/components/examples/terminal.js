import React from 'react';
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId();

const Terminal = ({title,text,colour})=>{
    return(
        <div className="terminal">
            <div className={`terminal-bar ${colour}`}>
                <p className="terminal-title">{title}</p>
            </div>
            {text.map(line =>
                <p key={uid.randomUUID(6)} className={`terminal-text ${line === "OR" && "center"}`}>{line !== "OR" && "$"} {line}</p>
            )}
        </div>
    )
}

export default Terminal;
