import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './pics-viewer.css'

@inject('stores')
@observer
class PicsViewer extends Component {
    constructor() {
        super()
        this.uploadPics = this.uploadPics.bind(this)
    }

    uploadPics(event) {
        const { target } = event
        const { stores: { uiState, photoStore } } = this.props
        if (uiState.viewedAlbumId > 0) {
            for (let i = 0; i < target.files.length; i++) {
                const reader = new FileReader()
                reader.onload = (file => (event1) => {
                    const photo = {
                        albumId: uiState.viewedAlbumId,
                        photo: event1.target.result,
                        name: file.name,
                        modified: file.lastModified,
                        size: file.size,
                        type: file.type
                    }
                    photoStore.addPhoto(photo).then((result) => {
                        if (result.status > 0) {
                            photoStore.getPhotoList(uiState.viewedAlbumId)
                        }
                    })
                })(target.files[i])
                reader.readAsDataURL(target.files[i])
            }
        } else {
            console.log('没有相册被选中')
        }
    }

    removePhoto(photoId) {
        const { stores: { uiState, photoStore } } = this.props
        photoStore.removePhoto({ id: photoId }).then((result) => {
            if (result.status > 0) {
                photoStore.getPhotoList(uiState.viewedAlbumId)
            }
        })
    }

    render() {
        const { stores: { photoStore } } = this.props
        return (
            <div className="pics-viewer">
                <div className="header">
                    <h2>我的图片</h2>
                    <label htmlFor="upload-pics">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-cloud-upload" />
                        </svg>
                    </label>
                    <input type="file" accept="image/*" id="upload-pics" className="upload-pics" multiple onChange={this.uploadPics} />
                </div>
                <div className="imgs">
                    <ul>
                        {
                            photoStore.photos.map(item => (
                                <li key={item.id}>
                                    <div className="inner">
                                        <div className="img-wrapper">
                                            <img src={item.photo} alt="" />
                                            <button
                                                type="button"
                                                className="remove-btn"
                                                onClick={() => {
                                                    this.removePhoto(item.id)
                                                }}
                                            >
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-delete" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default PicsViewer