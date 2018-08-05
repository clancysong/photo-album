import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('stores')
@observer
class AlbumItem extends Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
        this.removeAlbum = this.removeAlbum.bind(this)
    }

    handleClick() {
        const { stores: { uiState, photoStore }, albumInfo: { id } } = this.props
        uiState.changeViewedAlbumId(id)
        photoStore.getPhotoList(uiState.viewedAlbumId)
    }

    removeAlbum() {
        const { stores: { uiState, albumStore, initStore } } = this.props
        albumStore.removeAlbum({ id: uiState.viewedAlbumId }).then((result) => {
            if (result.status > 0) {
                initStore()
            }
        })
    }

    render() {
        const { stores: { uiState }, albumInfo: { id, cover, title, description }, picsNumber } = this.props
        const isViewed = (id === uiState.viewedAlbumId)
        return (
            <li className={isViewed ? 'active' : ''}>
                <button type="button" onClick={this.handleClick}>
                    <div className="logo">
                        <img src={cover} alt="" />
                    </div>
                    <div className="info">
                        <h4>{title}</h4>
                        <p>{description}</p>
                    </div>
                    <div className="number">
                        <h4>{picsNumber}</h4>
                        <p>pics</p>
                    </div>
                    <button type="button" className="remove-btn" onClick={this.removeAlbum}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-delete" />
                        </svg>
                    </button>
                </button>
            </li>
        )
    }
}

export default AlbumItem