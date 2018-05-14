import React from 'react';

const CopyUrlField = ({urlText})=>{
    return(
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Share Link</label>
            </div>
            <div className="field-body center">
                <div className="field has-addons">
                    <div className="control">
                        <input className="input" id="cpMe" type="text" 
                            value={urlText}
                            readOnly
                        />
                    </div>
                    <div className="control" dangerouslySetInnerHTML={{__html: `
                        <a id="cpURLbtn" class="button"
                            onClick="
                            let cpBtn = document.getElementById('cpURLbtn');
                            document.getElementById('cpMe').select();
                            document.execCommand('Copy');
                            cpBtn.classList.add('is-success');
                            cpBtn.innerHTML='<span class=\\'icon is-small\\'><i class=\\'fa fa-check\\'></i></span><span>Copied!</span>'
                            "
                        >Copy</a>
                        `}}>
                    </div>
                </div>
            </div>
        </div>
    )

} 


//const CopyUrlField = ({urlText}) =>{}

//<a id="cpURLbtn" className="button">Copy</a>

export default CopyUrlField;
