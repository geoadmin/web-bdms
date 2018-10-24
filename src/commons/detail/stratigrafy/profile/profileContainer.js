import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  loadLayers,
  getLayer
} from '@ist-supsi/bmsjs'
import ProfileView from './view/profileViewComponent'

class ProfileContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      layer: null,
      isFetchingLayer: false
    }
  }
  componentDidMount(){
    const {
      id
    } = this.props
    if(id !== null){
      this.props.loadLayers(id)
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        layer: null
      }, () => {
        this.props.loadLayers(this.props.id);
      });
    }
  }
  render() {
    const {
      layers
    } = this.props
    if (layers.data.length === 0){
      return null
    }
    return (
      <ProfileView
        data={layers.data}
        layer={this.state.layer}
        isFetchingLayer={this.state.isFetchingLayer}
        onSelected={(selected)=>{
          this.setState({
            isFetchingLayer: true,
            layer: null
          }, ()=>{
            getLayer(selected.id).then((result) => {
              this.setState({
                isFetchingLayer: false,
                layer: result.data.data
              })
            }).catch((err) => {
              
            })
          })
        }}/>
    )
  }
}

ProfileContainer.propTypes = {
  id: PropTypes.number
}

const mapStateToProps = (state, ownProps) => {
  return {
    layers: state.core_layers_list,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    loadLayers: (id) => {
      dispatch(loadLayers(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('borehole_form')(ProfileContainer))
