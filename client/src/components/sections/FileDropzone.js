import React,{Component} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import Dropzone from 'react-dropzone';
import bytes from 'bytes'
import empty from 'is-empty';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';

// import components
import CopyUrlField from '../dropzone/copyURLField';

// import fontawesome css
import '../../public/css/fontawesome-all.min.css';
// import sweetalert css
import '../../public/css/sweetalert.css';




//const maxSize = 1073741824; // 1GB
const maxSize = 536870912; // 500mb

class FileDropzone extends Component{
    constructor(props){
        super(props);
        this.state = {
            file: [],
            fileName: '',
            alertType: '',
            alertContent: '',
            alertTitle: '',
            alertImage: '',
            show: false,
        }
        this.onDrop = this.onDrop.bind(this);
        this.onConfirmUpload = this.onConfirmUpload.bind(this);
        this.clearAll = this.clearAll.bind(this)
    }

    onDrop(file){
        try{
            this.setState({
                file,
                fileName: file[0].name
            });
        }catch(err){
            //console.log(err)
            }
    }

    onConfirmUpload(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            show: true,
            alertTitle: 'Uploading',
            alertImage: 'https://imgoat.com/uploads/2c420d928d/70714.gif'
        })

        const file = this.state.file[0];
        const formData = new FormData();
        formData.append('',file);
        axios.put('/api/file',formData)
            .then(res =>{
                const dlFileData = res.data.split('/');
                const dlFileId = dlFileData[dlFileData.length-1];
                
                this.setState({
                    alertContent: '<b>File:</b> '+this.state.fileName+'<br />'+renderToStaticMarkup(<CopyUrlField 
                    urlText={window.location.hostname+'/'+dlFileId}
                />)+'<br /><br /><i>Note: Link expires upon the first visit</i><br /><br />',
                    alertType: res.data === 'error' ?  'error' : 'success',
                    alertTitle: 'Uploaded',
                    alertImage: ''
                });
                this.clearFile();
            }).catch(err =>{
                this.setState({
                    alertContent: '<b>Error: </b><br />'+err.response.data+'<br /><br />',
                    alertType: 'error',
                    alertTitle: 'Error',
                    alertImage: ''
                });
                this.clearFile();
            });
    }


    clearFile(){
        this.setState({file:[]})
    }

    clearAll(){
        this.setState({
            file: [],
            fileName: '',
            alertType: '',
            alertContent: '',
            alertTitle: '',
            alertImage: '',
            show: false,
        })
    }

    render(){
        return(
            <section className="section" id="fileDropZone">
                <div className="dropzone">
                    <Dropzone multiple={false} maxSize={maxSize} onDrop={this.onDrop}>
                        {!empty(this.state.file) ? 
                            <div>
                                <h5 className="title is-5">{this.state.file[0].name}</h5>
                                <p className="subtitle">{bytes(this.state.file[0].size)}</p>
                                <button className="button is-medium is-outlined" onClick={this.onConfirmUpload}>Confirm Upload</button>
                            </div>
                            :
                            <div>
                                <h4 className="title is-4">
                                    <span className="icon is-large">
                                        <i className="fas fa-3x fa-cloud-download-alt"></i>
                                    </span><br /><br />
                                    Drag and drop files here to upload
                                </h4>
                                <p className="subtitle is-6">Max Size Allowed : {bytes(maxSize)}</p>
                            </div>
                        }
                    </Dropzone>
                </div>
                <SweetAlert 
                    show={this.state.show}
                    type={this.state.alertType || "info"}
                    title={this.state.alertTitle}
                    text={this.state.alertContent}
                    imageUrl={this.state.alertImage}
                    imageSize= '180x180'
                    onConfirm={this.clearAll}
                    showConfirmButton={!empty(this.state.alertContent)}
                    confirmButtonColor="#575757"
                    showLoaderOnConfirm={true}
                    html={true}
                />
            </section>
        )
    }
}
//showConfirmButton={!empty(this.state.alertContent)}

export default FileDropzone;
