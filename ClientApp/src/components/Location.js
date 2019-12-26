import 'leaflet/dist/leaflet.css';

import React from 'react';

import LocationApi from '../api/v1/LocationApi'
import LocationTypeApi from '../api/v1/LocationTypeApi'

import {
  Map as MapLeaflet, TileLayer as TileLayerLeaflet,
  Marker
} from 'react-leaflet'
import L from 'leaflet'


import {
  Form, Input, Select, Row, Card, Alert, Button, Spin, Modal,
  DatePicker, Col, Upload, message, Icon
} from 'antd';
const { Option } = Select;


export let positionIcon = new L.Icon({
  iconUrl: require('../assets/img/position.svg'),
  iconRetinaUrl: require('../assets/img/position.svg'),
  iconSize: [38, 50],
  iconAnchor: [20, 30],
  popupAnchor: [-3, -76],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}



class LocationForm extends React.PureComponent {

  state = {
    center: {
      lat: 51.505,
      lng: -0.09
    },
    marker: {
      lat: 51.505,
      lng: -0.09
    },
    locationTypes: [],
    name: "",
    locationTypeId: 1,
    lat: undefined,
    lng: undefined,
    logoId: undefined,
    loading: false,
    message: "",
    messageType: "primary",
    imageUrl: undefined
  };


  constructor(props) {
    super(props)

    this.selectionMarkerRef = React.createRef();

    this.updatePosition = this.updatePosition.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        marker: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    });
    //
    LocationTypeApi.get()
      .then(r => {
        this.setState({ locationTypes: r.data })
      })
  }

  updatePosition = () => {
    const selectionMarkerRef = this.selectionMarkerRef.current;
    if (selectionMarkerRef != null) {
      const latlng = selectionMarkerRef.leafletElement.getLatLng()
      this.setState({ marker: latlng })
    }
  }


  handleAdd = () => {
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {

        that.setState({ loading: true }, () => {

          LocationApi.add({
            name: values.name,
            locationTypeId: values.locationTypeId,
            logoId: this.state.logoId,
            lat: values.lat,
            lng: values.lng
          }).then(r => {
            if (r.data) {

              that.setState({
                message: "successfuly",
                messageType: "primary",
                name: undefined,
                logoId: undefined
              })

              this.showMessage("Added Successfuly", "success");

            }
          })
            .catch(error => {
              this.showMessage(error.description, "error");
            })
            .finally(() => {
              this.setState({ loading: false });
            });
        })

      }
    });

  }


  showMessage(msg, type) {
    this.setState({ message: msg, messageType: type });
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {

      // this.props.form.setFieldsValue({ logoId: info.file.response.data })
      this.setState({ logoId: info.file.response.data })

      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };


  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const markerPosition = [this.state.marker.lat, this.state.marker.lng]
    const center = [this.state.center.lat, this.state.center.lng];
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <div>
        <Card title="Share Location">
          <Spin spinning={this.state.loading} delay={500}>
            <Form labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
              wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }} >
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input  Name!',
                    }
                  ],
                })(<Input style={{ width: '100%' }} />)}
              </Form.Item>


              <Form.Item label="Location Type">
                {getFieldDecorator('locationTypeId', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Select  Location Type!',
                    }
                  ],
                })(<Select style={{ width: "100%" }} >
                  {this.state.locationTypes.map(r =>
                    <Option key={r.locationTypeId} value={r.locationTypeId} >{r.name}</Option>)}
                </Select>)}
              </Form.Item>


              <Form.Item label="Logo">
                {getFieldDecorator('logo', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Select  Logo!',
                    }
                  ],
                })(

                  <Upload
                    name="file"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/v1/file/upload"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="logo" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>


                )}
              </Form.Item>


              <Form.Item label="Location on map">
                {getFieldDecorator('map', {
                  rules: [
                    {

                    }
                  ],
                })(
                  <MapLeaflet
                    ref={this.mapLeaflet}
                    center={center} zoom={9}
                    trackResize={true} dragging={true} boxZoom={true}
                    style={{ height: 200 }}
                  >
                    <TileLayerLeaflet
                      attribution='{&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors}'
                      url={mbUrl}
                      opacity={0.9}
                      id='mapbox.light'
                    />


                    <Marker position={markerPosition} icon={positionIcon}
                      draggable="true"
                      onDragend={this.updatePosition.bind(this)}
                      ref={this.selectionMarkerRef}

                    >
                    </Marker>
                  </MapLeaflet>
                )}
              </Form.Item>


              <Form.Item>
                <Button type="primary" onClick={this.handleAdd}>Save</Button>
              </Form.Item>

              {this.state.message &&
                <Row style={{ marginTop: 10, marginBottom: 10 }} >
                  <Alert message={this.state.message}
                    type={this.state.messageType}
                    closable />
                </Row>
              }

            </Form>
          </Spin>
        </Card>    

      </div>

    );
  }
}





export const Location = Form.create({ name: 'Location' })(LocationForm);
