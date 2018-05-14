import React, {Component} from 'react';
import axios from 'axios';

class GetFile extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg: ''
        }
    }
    componentWillMount(){
        this.setState({msg: 'Please wait. Fetching file ...'})
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        console.log(id);
        axios.get('/api/file/'+this.props.match.params.id)
            .then(res=>{
                this.setState({msg:'File Should start to download in a few seconds'})
                let filename = "";
                const disposition = res.headers['content-disposition'];
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    let matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) { 
                      filename = matches[1].replace(/['"]/g, '');
                    }
                }

                let blob = new Blob([res.data],{type: 'application/octet-stream'});
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;

                document.body.appendChild(link);
                link.click();

            })
                .catch(err => this.setState({msg:err.response.data}));
    }

    render(){
        return(
            <p>{this.state.msg}</p>
        )
    }
}


export default GetFile;
