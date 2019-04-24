import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import _ from 'lodash';
import LayerForm from '../layer/layerForm';
import LayersList from '../../layers/layerList';
import DateField from '../dateField';
import DomainDropdown from '../domain/dropdown/domainDropdown';
import {
  Button,
  Segment,
  Form
} from 'semantic-ui-react';
import {
  getStratigraphies,
  getStratigraphy,
  getLayers,
  deleteLayer,
  createLayer,
  patchStratigraphy,
  deleteStratigraphy,
  cloneStratigraphy
} from '@ist-supsi/bmsjs';


class StratigraphyFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.updateAttributeDelay = {};
    this.state = {
      stratigraphy: null,
      isPatching: false,
      stratigraphyEmpty: false,
      fetchingStratigraphy: false,
      layers: null,
      layer: null
    };
  }
 
  componentDidMount() {
    const { id } = this.props;
    if (!_.isNil(id)) {
      this.load(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (id !== prevProps.id) {
      this.load(id);
    }
  }

  load(id) {
    // Get Stratigraphy by borehole and stratigraphy kind
    this.setState({
      stratigraphy: null,
      stratigraphyEmpty: false,
      fetchingStratigraphy: true,
      layers: null,
      layer: null
    }, function(){
      
      getStratigraphy(id).then(
        function(response){
          if (
            response.data.success
          ) {
            this.setState({
              stratigraphy: response.data.data
            }, function(){
              // Load Stratigraphy Layers
              getLayers(
                this.state.stratigraphy.id
              ).then(
                function(response){
                  if (response.data.success){
                    this.setState({
                      layers: response.data.data
                    });
                  }
                }.bind(this)
              ).catch((error) => {
                console.log(error);
              });
            }.bind(this));
          } else {
            // Stratigraphy not created yet
            this.setState({
              stratigraphyEmpty: true
            });
          }
        }.bind(this)
      ).catch((err) => {
        console.log(err);
      });
    }.bind(this));
  }

  _load(borehole, kind) {
    // Get Stratigraphy by borehole and stratigraphy kind
    this.setState({
      stratigraphy: null,
      stratigraphyEmpty: false,
      fetchingStratigraphy: true,
      layers: null,
      layer: null
    }, function(){
      
      getStratigraphies(
        borehole, kind
      ).then(
        function(response){
          if (
            response.data.success &&
            response.data.data.length===1
          ) {
            this.setState({
              stratigraphy: response.data.data[0]
            }, function(){
              // Load Stratigraphy Layers
              getLayers(
                this.state.stratigraphy.id
              ).then(
                function(response){
                  if (response.data.success){
                    this.setState({
                      layers: response.data.data
                    });
                  }
                }.bind(this)
              ).catch((error) => {
                console.log(error);
              });
            }.bind(this));
          } else {
            // Stratigraphy not created yet
            this.setState({
              stratigraphyEmpty: true
            });
          }
        }.bind(this)
      ).catch((err) => {
        console.log(err);
      });
    }.bind(this));
  }

  updateChange(attribute, value, to = true){
    const {
      onUpdated
    } = this.props;
    const state = {
      ...this.state,
      isPatching: true,
      stratigraphy: {
        ...this.state.stratigraphy
      }
    };
    _.set(state.stratigraphy, attribute, value);
    this.setState(state, () => {
      if (
        this.updateAttributeDelay.hasOwnProperty(attribute) &&
        this.updateAttributeDelay[attribute]
      ){
        clearTimeout(this.updateAttributeDelay[attribute]);
        this.updateAttributeDelay[attribute] = false;
      }
      this.updateAttributeDelay[attribute] = setTimeout(function(){
        patchStratigraphy(
          this.state.stratigraphy.id,
          attribute,
          value
        ).then(function(response) {
          if (response.data.success){
            this.setState({
              isPatching: false
            }, () => {
              if (_.isFunction(onUpdated)){
                onUpdated(this.state.stratigraphy.id, attribute, value);
              }
            });
          }
        }.bind(this)).catch(function (error) {
          console.error(error);
        });
      }.bind(this), to? 500: 0);
    });
  }

  render() {
    const { stratigraphy } = this.state;
    const {
      domains,
      t,
      onDeleted,
      onClone
    } = this.props;
    
    /*if(this.state.stratigraphyEmpty){
      return (
        <div
          style={{
            flex: '1 1 0%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div>
            Stratigraphy not yet created.
            <div
              style={{
                padding: '1em',
                textAlign: 'center'
              }}
            >
              <Button
                secondary
                size='small'
                onClick={()=>{
                  const self = this
                  createStratigraphy(
                    borehole, kind
                  ).then(
                    function(response) {
                      if(response.data.success){
                        self.load(borehole, kind)
                      }
                    }).catch(function (error) {
                    console.log(error)
                  })
                }}
              >
                <Icon name='add' />
                Create <DomainText
                  schema='layer_kind'
                  id={kind}/>
              </Button>
            </div>
          </div>
        </div>
      )
    }else 
    */
    if (this.state.stratigraphyEmpty || _.isNil(stratigraphy)) {
      return (
        <div
          style={{
            flex: '1 1 0%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div>
            Nothing selected
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          padding: '1em',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/*<StratigraphyForm id={stratigraphy.id}/>*/}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Form
              size='small'
            >
              <Form.Group widths='equal'>
                <Form.Field
                  required
                  style={{
                    width: '50%'
                  }}
                >
                  <label>{t('meta_stratigraphy')}</label>
                  <DomainDropdown
                    onSelected={(selected)=>{
                      this.updateChange(
                        'kind', selected.id, false
                      );
                    }}
                    reset={false}
                    schema='layer_kind'
                    selected={stratigraphy.kind}
                  />
                </Form.Field>
                <Form.Field
                  error={_.isNil(stratigraphy.date)}
                  required
                  style={{
                    width: '50%'
                  }}
                >
                  <label>Date</label>
                  <DateField
                    date={stratigraphy.date}
                    onChange={(selected)=>{
                      this.updateChange(
                        'date', selected, false
                      );
                    }} />
                </Form.Field>
              </Form.Group>
            </Form>
            {
              _.isNil(this.state.layers)?
                null:
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '0.5em'
                    }}
                  >
                    <Button
                      fluid
                      negative
                      onClick={()=>{
                        cloneStratigraphy(
                          stratigraphy.id
                        ).then((response)=>{
                          if (_.isFunction(onClone)){
                            onClone(stratigraphy.id);
                          }
                          this.setState({
                            stratigraphy: null
                          });
                        });
                      }}
                      size='tiny'
                    >
                      Clone
                    </Button>
                    <Button
                      fluid
                      negative
                      onClick={()=>{
                        deleteStratigraphy(
                          stratigraphy.id
                        ).then((response)=>{
                          if (_.isFunction(onDeleted)){
                            onDeleted(stratigraphy.id);
                          }
                          this.setState({
                            stratigraphy: null
                          });
                        });
                      }}
                      size='tiny'
                    >
                      Delete stratigraphy
                    </Button>
                    <Button
                      fluid
                      onClick={()=>{
                        createLayer(
                          this.state.stratigraphy.id
                        ).then(
                          function(response) {
                            if (response.data.success){
                              let layerId = response.data.id;
                              getLayers(
                                this.state.stratigraphy.id
                              ).then(function(response) {
                                if (response.data.success){
                                  this.setState({
                                    layers: response.data.data,
                                    layer: layerId
                                  });
                                }
                              }.bind(this)).catch(function (error) {
                                console.log(error);
                              });
                            }
                          }.bind(this)
                        ).catch(function (error) {
                          console.log(error);
                        });
                      }}
                      positive
                      size='tiny'
                    >
                      Add layer
                    </Button>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto'
                    }}
                  >
                    <LayersList
                      layers={this.state.layers}
                      onDelete={layer => {
                        deleteLayer(
                          layer.id
                        ).then(
                          function(response) {
                            if (response.data.success){
                              getLayers(
                                this.state.stratigraphy.id
                              ).then(function(response) {
                                if (response.data.success){
                                  this.setState({
                                    layers: response.data.data,
                                    layer: null
                                  });
                                }
                              }.bind(this)).catch(function (error) {
                                console.log(error);
                              });
                            }
                          }.bind(this)).catch(function (error) {
                          console.log(error);
                        });
                      }}
                      onSelected={layer => {
                        this.setState({
                          layer: layer.id
                        });
                      }}
                      selected={this.state.layer}
                    />
                  </div>
                </div>
            }
          </div>
          <Segment
            style={{
              flex: '1 1 0%',
              overflowY: 'auto',
              margin: '0px 1em'
            }}
          >
            {
              this.state.layer !== null?
                <LayerForm
                  conf={
                    domains.data.layer_kind.find(function(element) {
                      return element.id === stratigraphy.kind;
                    }).conf
                  }
                  id={this.state.layer}
                  onUpdated={(id, attribute, value) => {
                    const layers = [...this.state.layers];
                    for (var i = 0; i < layers.length; i++) {
                      if (id === layers[i].id){
                        layers[i][attribute] = value;
                        break;
                      }
                    }
                    this.setState({
                      layers: layers
                    });
                  }}
                />: null
            }
          </Segment>
        </div>
      </div>
    );
  }
}

StratigraphyFormContainer.propTypes = {
  id: PropTypes.number,
  onClone: PropTypes.func,
  onDeleted: PropTypes.func,
  onUpdated: PropTypes.func
};

StratigraphyFormContainer.defaultProps = {
  borehole: undefined,
  kind: undefined,
  id: undefined
};

const mapStateToProps = (state) => {
  return {
    domains: state.core_domain_list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((
  translate('borehole_form')(StratigraphyFormContainer)
));
