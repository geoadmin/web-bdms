import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  Form,
  Popup,
} from 'semantic-ui-react';

import DomainText from '../../../commons/form/domain/domainText';

import {
  listIdentifier,
  createIdentifier,
  deleteIdentifier,
  // updateIdentifier
} from '@ist-supsi/bmsjs';

import {
  updateIdentifier
} from '@ist-supsi/bmsjs/build/actions/identifier';

class IdentifierSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      de: "",
      fr: "",
      it: "",
      en: "",
    };
    this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    this.props.listIdentifier();
  }

  reset(){
    this.setState({
      id: "",
      de: "",
      fr: "",
      it: "",
      en: "",
    });
  }

  render() {
    const {
      t,
      domains
    } = this.props;
    return (
      <div
        style={{
          padding: '2em'
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Form
            style={{
              flex: 1
            }}
          >
            <Form.Group
              widths='equal'
            >
              <Form.Input
                fluid
                label={t('common:german')}
                onChange={(e)=>{
                  this.setState({
                    de: e.target.value
                  });
                }}
                placeholder={t('identifier')}
                value={this.state.de}
              />
              <Form.Input
                fluid
                label={t('common:french')}
                onChange={(e)=>{
                  this.setState({
                    fr: e.target.value
                  });
                }}
                placeholder={t('identifier')}
                value={this.state.fr}
              />
              <Form.Input
                fluid
                label={t('common:italian')}
                onChange={(e)=>{
                  this.setState({
                    it: e.target.value
                  });
                }}
                placeholder={t('identifier')}
                value={this.state.it}
              />
              <Form.Input
                fluid
                label={t('common:english')}
                onChange={(e)=>{
                  this.setState({
                    en: e.target.value
                  });
                }}
                placeholder={t('identifier')}
                value={this.state.en}
              />
              <div
                style={{
                  flex: '0 0 0% !important'
                }}
              >
                <Form.Button
                  // disabled={this.state.identifier===''}
                  icon
                  label='&nbsp;'
                  onClick={(e)=>{
                    e.stopPropagation();
                    if (
                      this.state.id !== null &&
                      this.state.id !== ''
                    ) {
                      updateIdentifier(
                        this.state.id,
                        {
                          "de": this.state.de,
                          "fr": this.state.fr,
                          "it": this.state.it,
                          "en": this.state.en,
                        }
                      ).then(
                        (response) => {
                          this.setState({
                            identifier: ''
                          }, ()=>{
                            console.log(response);
                            this.props.listIdentifier();
                          });
                        }
                      );
                    } else {
                      createIdentifier(
                        {
                          "de": this.state.de,
                          "fr": this.state.fr,
                          "it": this.state.it,
                          "en": this.state.en,
                        }  
                      ).then(
                        (response) => {
                          this.setState({
                            identifier: ''
                          }, ()=>{
                            console.log(response);
                            this.props.listIdentifier();
                          });
                        }
                      );
                    }
                  }}
                >
                  <span
                    style={{
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {
                      (
                        this.state.id !== null &&
                        this.state.id !== ''
                      )?
                        <Icon name='save' />: 
                        <Icon name='plus' />
                    } {
                      (
                        this.state.id !== null &&
                        this.state.id !== ''
                      )?
                        t('common:save'): t('common:add')
                    }
                  </span>
                </Form.Button>

                <div
                  className='linker link'
                  onClick={() => this.reset()}
                >
                  {t('common:reset')}
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>
        <hr />
        <div>
          {
            domains.data.hasOwnProperty('borehole_identifier')?
              domains.data['borehole_identifier'].map((val, idx) => (
                <div
                  className='selectable'
                  key={'bisp-'+idx}
                  onClick={
                    () => {
                      if (
                        this.state.id === val.id
                      ) {
                        this.reset();
                      } else {
                        this.setState({
                          id: val.id,
                          de: val.de.text,
                          fr: val.fr.text,
                          it: val.it.text,
                          en: val.de.text,
                        });
                      }
                    }
                  }
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    paddingBottom: '0.5em',
                    backgroundColor: this.state.id === val.id?
                      '#595959': null,
                    color: this.state.id === val.id?
                      'white': null
                  }}
                >
                  <div
                    style={{
                      marginLeft: '1em',
                      flex: '1 1 100%',
                    }}
                  >
                    {val.de.text}
                  </div>
                  <div
                    style={{
                      marginLeft: '1em',
                      flex: '1 1 100%',
                    }}
                  >
                    {val.fr.text}
                  </div>
                  <div
                    style={{
                      marginLeft: '1em',
                      flex: '1 1 100%',
                    }}
                  >
                    {val.it.text}
                  </div>
                  <div
                    style={{
                      marginLeft: '1em',
                      flex: '1 1 100%',
                    }}
                  >
                    {val.en.text}
                  </div>
                  <Popup
                    flowing
                    hoverable
                    on='click'
                    position='top right'
                    trigger={
                      <Button
                        color='red'
                        icon
                        onClick={e=>{
                          e.stopPropagation();
                        }}
                        size='tiny'
                      >
                        <Icon
                          name='trash alternate outline'
                        />
                      </Button>
                    }
                  >
                    Delete "
                    <DomainText
                      id={val.id}
                      schema='borehole_identifier'
                    />" forever?
                    <br />
                    <br />
                    <Button
                      icon
                      onClick={
                        e => {
                          e.stopPropagation();
                          deleteIdentifier(val.id).then(
                            r => {
                              if (r.data.success === true) {
                                this.props.listIdentifier();
                              } else if (
                                r.data.error === 'E-205'
                              ){
                                alert(
                                  t('messages:identifierDeletionAlreadyUsed')
                                );
                              }
                              this.reset();
                            }
                          );
                        }
                      }
                      secondary
                      size='tiny'
                    >
                      {t('confirm')}
                    </Button>
                  </Popup>
                </div>
              )):
              'Empty'
          }
        </div>
      </div>
    );
  }
};

IdentifierSettings.propTypes = {
  domains: PropTypes.shape({
    data: PropTypes.object
  }),
  listIdentifier: PropTypes.func,
  t: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    domains: state.core_domain_list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    listIdentifier: () => {
      return dispatch(
        listIdentifier()
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(['common', 'messages'])(IdentifierSettings));
