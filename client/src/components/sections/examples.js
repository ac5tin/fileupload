import React from 'react';

// import components
import Terminal from '../examples/terminal';

const Examples = ()=>{
    return(
        <section className="section" id="examples">
            <h1 className="title">Examples</h1>
            <div className="columns">
                <div className="column">
                    <h4 className="title is-4">Upload</h4>
                    <Terminal 
                        title='Upload using httpie'
                        text={['http -f PUT '+window.location.hostname+'/api/file @foo.txt -b']}
                    />
                    <Terminal 
                        title='Upload using cURL'
                        text={['curl -X PUT '+window.location.hostname+'/api/file -F "=@foo.txt"']}
                    />
                </div>
                <div className="column">
                    <h4 className="title is-4">Download</h4>
                    <Terminal 
                        title='Download using httpie'
                        text={[
                            'http '+window.location.hostname+'/api/file/FqigXPc8wD > foo.txt',
                            'OR',
                            'http -dco foo.txt '+window.location.hostname+'/api/file/FqigXPc8wD -b'
                        ]}
                        colour="green"
                    />
                    <Terminal 
                        title='Download using cURL'
                        text={[
                            'curl '+window.location.hostname+'/api/file/FqigXPc8wD -o foo.txt'
                        ]}
                        colour="green"
                    />
                </div>

            </div>
        </section>
    )
}

export default Examples;
