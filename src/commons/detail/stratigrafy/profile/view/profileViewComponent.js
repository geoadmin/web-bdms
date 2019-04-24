import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import DomainText from '../../../../form/domain/domainText';
import Scroller from '../../../../scroller';

import {
  Checkbox
} from 'semantic-ui-react';

// import DateText from '../../form/dateText'

class ProfileView extends React.Component {
  

  constructor(props) {
    super(props);
    this.getDomainRow = this.getDomainRow.bind(this);
    this.getDomainRowMultiple = this.getDomainRowMultiple.bind(this);
    this.getTextRow = this.getTextRow.bind(this);
    this.getPattern = this.getPattern.bind(this);
    this.getColor = this.getColor.bind(this);
    this.isVisible = this.isVisible.bind(this);
    this.state = {
      allfields: false
    };
  }

  getDomainRow(schema, id, i18n = undefined){
    return this.getTextRow(
      _.isUndefined(i18n)? schema: i18n,
      _.isNil(id) || id === ''?
        null:
        <div>
          <DomainText
            schema={schema}
            id={id}/>
        </div>
    );
  }
  getDomainRowMultiple(schema, ids, i18n = undefined){
    return this.getTextRow(
      _.isUndefined(i18n)? schema: i18n,
      _.isNil(ids) || ids.length === 0?
        null:
        <div>
          {
            ids.map((id, idx)=>(
              <span
                key={'dbms-pvds-'+id}
              >
                <DomainText
                  id={id}
                  key={schema + '-itm-'+idx}
                  schema={schema}
                />
                {
                  idx < ids.length-1? ", ": null
                }
              </span>
            ))
          }
        </div>
    );
  }
  getTextRow(schema, text){
    const { domains, layer, t } = this.props;
    return this.isVisible(
      schema,
      <div>
        <div
          style={{
            fontSize: '0.8em',
            color: '#787878', // 'rgb(33, 133, 208)',
            lineHeight: '1em',
            // marginTop: '0.5em 0px 0.4em'
          }}
        >
          {t(schema)}
        </div>
        <div
          style={{
            marginBottom: '0.4em'
          }}
        >
          {
            _.isNil(text) || text === ''?
              '-': text
          }
        </div>
      </div>,
      layer !== null?
        domains.data.layer_kind.find(function(element) {
          return element.id === layer.kind
        }).conf: null
    )

  }
  getPattern(id){
    const {
      domains
    } = this.props;
    let domain = domains.data['custom.lit_pet_top_bedrock'].find(function(element) {
      return element.id === id
    });
    if (domain !== undefined && domain.conf !== null && domain.conf.hasOwnProperty('img')){
      return 'url("' + process.env.PUBLIC_URL + '/img/lit/' + domain.conf.img + '")'
    }
    else return null;
  }
  getColor(id){
    const {
      domains
    } = this.props;
    let domain = domains.data['custom.lit_str_top_bedrock'].find(function(element) {
      return element.id === id
    });
    if (domain !== undefined && domain.conf !== null && domain.conf.hasOwnProperty('color')){
      const color = domain.conf.color;
      return 'rgb(' + color.join(',') + ')'
    }
    else return null;
  }

  isVisible(name, field, conf){
    if(
      this.state.allfields === false
      && conf!==null
      && conf.hasOwnProperty('fields')
    ){
      if(conf.fields.indexOf(name)>=0){
        return field;
      }
      return null;
    }
    return field;
  }

  render() {
    const {
      data, t, onSelected, layer
    } = this.props;

    return (
      <div style={{
        flex: "1 1 100%",
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
      }}>
        <Scroller
          style={{
            flex: '0 0 auto'
          }}
        
        >
          <div
            style={{
              width: '200px'
            }}
          >
            {
              data.map((item, idx) => (
                <div
                  key={'bms-pvc-'+item.id}
                  className='selectable'
                  style={{
                    borderBottom: 'thin solid #cecece',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'row',
                    borderRight: '0.25em solid ' + (
                      layer !== null && layer.id === item.id? 'red': 'transparent'
                    )
                  }}
                  onClick={()=>{
                    onSelected(item);
                  }}
                >
                  <div
                    style={{
                      width: '5em',
                      backgroundColor: this.getColor(item.lithostratigraphy),
                      backgroundImage: this.getPattern(item.lithology),
                      backgroundSize: 'cover',
                      display: 'flex',
                      flexDirection: 'column',
                      // alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        fontSize: '0.7em',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      {item.depth_to} m
                    </div>
                  </div>
                  <div
                    style={{
                      flex: '1 1 100%',
                      padding: '0.5em 1em 0.5em 0.5em'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold'
                      }}
                    >
                      <DomainText
                          schema='custom.lit_str_top_bedrock'
                          id={item.lithostratigraphy}/>
                    </span>
                    <br/>
                    <span
                      style={{
                        color: '#787878',
                        fontSize: '0.8em'
                      }}>
                      <DomainText
                        schema='custom.lit_pet_top_bedrock'
                        id={item.lithology}/>
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </Scroller>
        <Scroller style={{
            flex: "1 1 100%",
            // overflowY: 'auto'
            padding: '1em'
          }}
        >
          {
            this.props.layer === null?
            '':
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                {this.getTextRow(
                  'depth_from', layer.depth_from
                )}
                <div
                  style={{
                    flex: '1',
                    textAlign: 'right'
                  }}
                >
                  <Checkbox
                    label='Show all fields'
                    toggle
                    checked={this.state.allfields}
                    onChange={(ev, data)=>{
                      this.setState({
                        allfields: data.checked
                      })
                    }}
                  />
                </div>
              </div>
              {this.getTextRow(
                'depth_to', layer.depth_to
              )}
              {this.getTextRow(
                'description', layer.description
              )}
              {this.getTextRow(
                'geology', layer.geology
              )}
              {this.getTextRow(
                'last',
                layer.last === true?
                  t("common:yes"):
                  layer.last === false?
                    t("common:no"): null
              )}
              {this.getDomainRow(
                'qt_description',
                layer.qt_description
              )}
              {this.getDomainRow(
                'custom.lit_pet_top_bedrock',
                layer.lithology,
                'lithology'
              )}
              {this.getDomainRow(
                'custom.lit_str_top_bedrock',
                layer.lithostratigraphy,
                'lithostratigraphy'
              )}
              {this.getDomainRow(
                'custom.chro_str_top_bedrock',
                layer.chronostratigraphy,
                'chronostratigraphy'
              )}
              {this.getDomainRow(
                'vtec404',
                layer.tectonic_unit,
                'tectonic_unit'
              )}
              {this.getDomainRowMultiple(
                'mlpr112',
                layer.color,
                'color'
              )}
              {this.getDomainRow(
                'mlpr101',
                layer.plasticity,
                'plasticity'
              )}
              {this.getDomainRow(
                'mlpr105',
                layer.humidity,
                'humidity'
              )}
              {this.getDomainRow(
                'mlpr103',
                layer.consistance,
                'consistance'
              )}
              {this.getDomainRow(
                'mlpr106',
                layer.alteration,
                'alteration'
              )}
              {this.getDomainRow(
                'mlpr102',
                layer.compactness,
                'compactness'
              )}
              {this.getDomainRowMultiple(
                'mlpr113',
                layer.jointing,
                'jointing'
              )}
              {this.getDomainRow(
                'mlpr108',
                layer.soil_state,
                'soil_state'
              )}
              {this.getDomainRowMultiple(
                'mlpr108',
                layer.organic_component,
                'organic_component'
              )}
              {this.getTextRow(
                'striae',
                layer.striae === true?
                  t("common:yes"):
                  layer.striae === false?
                    t("common:no"): null
              )}
              {this.getDomainRow(
                'mlpr109',
                layer.grain_size_1,
                'grain_size_1'
              )}
              {this.getDomainRow(
                'mlpr109',
                layer.grain_size_2,
                'grain_size_2'
              )}
              {this.getDomainRowMultiple(
                'mlpr110',
                layer.grain_shape,
                'grain_shape'
              )}
              {this.getDomainRowMultiple(
                'mlpr115',
                layer.grain_granularity,
                'grain_granularity'
              )}
              {this.getDomainRow(
                'mlpr116',
                layer.cohesion,
                'cohesion'
              )}
              {this.getDomainRowMultiple(
                'mlpr117',
                layer.further_properties,
                'further_properties'
              )}
              {this.getDomainRow(
                'mcla101',
                layer.uscs_1,
                'uscs_1'
              )}
              {this.getDomainRow(
                'mcla101',
                layer.uscs_2,
                'uscs_2'
              )}
              {this.getDomainRowMultiple(
                'mcla101',
                layer.uscs_3,
                'uscs_3'
              )}
              {this.getTextRow(
                'uscs_original', layer.uscs_original
              )}
              {this.getDomainRowMultiple(
                'mcla104',
                layer.uscs_determination,
                'uscs_determination'
              )}
              {this.getDomainRow(
                'mcla102',
                layer.unconrocks,
                'unconrocks'
              )}
              {this.getDomainRowMultiple(
                'mcla107',
                layer.debris,
                'debris'
              )}
              {this.getDomainRowMultiple(
                'custom.lit_pet_top_bedrock',
                layer.lit_pet_deb,
                'lit_pet_deb'
              )}
              {this.getDomainRow(
                'mcla105',
                layer.lithok,
                'lithok'
              )}
              {this.getDomainRow(
                'mcla106',
                layer.kirost,
                'kirost'
              )}
              {this.getTextRow(
                'notes', layer.notes
              )}
            </div>
            
          }
        </Scroller>
      </div>
    )
  }
}

ProfileView.propTypes = {
    data: PropTypes.array,
    layer: PropTypes.object,
    isFetchingLayer: PropTypes.bool,
    onSelected: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    domains: state.core_domain_list,
    setting: state.setting
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  translate(['layer_form','common'])(ProfileView)
);
