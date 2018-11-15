import React from 'react';
import { connect } from 'react-redux';
import {
    withRouter
} from 'react-router-dom';


import MenuComponent from './menuComponent';

class MenuContainer extends React.Component {
  render() {
    const {
      history, location
    } = this.props;
    return(
      <MenuComponent
        mode={(()=>{
          if (
            location.pathname.indexOf('editor') >= 0
          ){
            return 'editor';
          } else if (
            location.pathname.indexOf('setting') >= 0
          ){
            return 'setting';
          } else {
            return 'viewer';
          }
        })()}
        handleModeChange={(mode)=>{
          console.log(process.env.PUBLIC_URL, mode)
          if(mode==='editor'){
            history.push(
              process.env.PUBLIC_URL + '/editor'
            );
          }else if (mode === 'viewer'){
            history.push(
              process.env.PUBLIC_URL
            );
          }else if (mode.indexOf('setting')>=0){
            history.push(
              `${process.env.PUBLIC_URL}/${mode}`
            );
          }
        }}
      >
        {this.props.children}
      </MenuComponent>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MenuContainer));