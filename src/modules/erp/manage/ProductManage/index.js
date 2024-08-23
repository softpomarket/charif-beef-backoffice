/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useRef } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Input,
  Popconfirm,
  Select,
  Upload,
  InputNumber,
  Radio,
  // DatePicker
} from "antd";
import { FaCog } from "react-icons/fa";
import moment from "moment";
import { Icon } from "@iconify/react";
import { Notification } from "../../../../common/components/notification";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { apiServerUrl, serverUrl } from "../../../../constants";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  deleteProductByIdFetch,
  deletePickUpByIdFetch,
  deleteTruckByIdFetch,
  getProductFetch,
  getTrucksFetch,
  insertProductFetch,
  insertTruckFetch,
  updateProductFetch,
  updateTruckFetch,
} from "./API/productApi";

const { TextArea } = Input;
const { Option } = Select;
// const { RangePicker } = DatePicker

const formatDate = "DD/MM/YYYY";

export default function ProductManage() {
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      width: "5%",
    },
    {
      title: "รายการผลิตภัณฑ์",
      dataIndex: "name",
      width: "30%",
    },

    {
      title: "สถานะ",
      width: "10%",
      render: (text, record) => {
        return (
          <>
            {record.isActive ? (
              <label>เปิดใช้งาน</label>
            ) : (
              <label>ปิดใช้งาน</label>
            )}
          </>
        );
      },
    },

    {
      title: "วันที่สร้าง",
      dataIndex: "createdAt",
      width: "10%",
      render: (text, record) => {
        return (
          <>
            <label style={{ whiteSpace: "pre" }}>{text}</label>
          </>
        );
      },
    },
    {
      title: "เเก้ไขล่าสุด",
      dataIndex: "updatedAt",
      width: "10%",
      render: (text, record) => {
        return (
          <>
            <label style={{ whiteSpace: "pre" }}>{text}</label>
          </>
        );
      },
    },
    {
      title: <FaCog />,
      dataIndex: "operator",
      align: "center",
      width: "25%",
    },
  ];
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingPropertyGallery, setLoadingPropertyGallery] = useState(false);

  const [categoryId, setCategoryId] = useState();

  const [formProperty] = Form.useForm();
  // const [formPropertyGallery] = Form.useForm()
  const [formSearch] = Form.useForm();

  const accessToken = sessionStorage.getItem("accessToken");

  const [propertyId, setPropertyId] = useState();

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyGallery, setPropertyGallery] = useState([]);
  const [propertyGalleryDisplay, setPropertyGalleryDisplay] = useState([]);

  const [imagePropertyURL, setImagePropertyURL] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  const isActivePropertyGalleryRef = useRef(false);

  const [imagePropertyGalleryURL, setImagePropertyGalleryURL] = useState({
    loading: false,
    imageUrl: null,
    imagePath: null,
  });

  // const [videoProductDetailURL, setVideoProductDetailURL] = useState({
  //     loading: false,
  //     videoUrl: null
  // })

  const [detail, setDetail] = useState();

  const propertyRef = useRef();

  // const promotionRef = useRef()

  const pageCurrentRef = useRef(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const searchNameRef = useRef("");

  const [modalProperty, setModalProperty] = useState({
    isShow: false,
    title: null,
  });

  // const [modalPropertyGallery, setModalPropertyGallery] = useState({
  //     isShow: false,
  //     title: null
  // })

  const optionPropertyImage = {
    name: "file",
    action: `${serverUrl}/api/v1/back-office/upload-file`,
    data: {
      bucket: "productcovercoconut",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      // const newFileName = generateNewFileName(info.file.name)
      // optionPropertyImage.data.name = newFileName

      if (info.file.status !== "uploading") {
        let result = info.file.response;
        if (result?.status) {
          setImagePropertyURL({
            imageUrl: result.result.googleImage,
            loading: false,
            imagePath: result.result.imagePath,
          });
        }
      } else {
        setImagePropertyURL({
          imageUrl: imagePropertyURL.imageUrl,
          loading: true,
          imagePath: imagePropertyURL.imagePath,
        });
      }

      if (info.file.status === "done") {
        Notification("success", "เเจ้งเตือน!", "อัพโหลดรูปภาพสำเร็จ");
      } else if (info.file.status === "error") {
        Notification(
          "error",
          "เเจ้งเตือน!",
          "อัพโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
        );
      }
    },
    progress: {
      strokeColor: {
        "0%": "#FF7F00",
        "100%": "#FF7F00",
      },
      strokeWidth: 3,
      width: "10%",
      format: (percent) => `${parseFloat(percent.toFixed(0))}%`,
    },
  };

  const getProductsAll = async (name) => {
    setLoading(true);

    let param = {
      keyword: name,
    };
    const result = await getProductFetch(param, null, accessToken);

    propertyRef.current = result?.result;
    setTotal(result?.length);

    let tempList = [];
    if (result.status === 204 || result.length === 0) {
      setList(tempList);
      setLoading(false);
      return;
    }

    result?.result?.map((val, index) => {
      tempList.push({
        index: index + 1,
        name: val.title,

        isActive: val.isActive, // สถานะการใช้งาน

        createdAt: val.createdAt
          ? moment(val.createdAt).format(formatDate) +
            "\n" +
            moment(val.createdAt).format("HH:mm")
          : "-",
        updatedAt: val.updatedAt
          ? moment(val.updatedAt).format(formatDate) +
            "\n" +
            moment(val.updatedAt).format("HH:mm")
          : "-",
        operator: (
          <>
            <Button
              style={{
                width: 35,
                backgroundColor: "orange",
                border: "1px solid orange",
                color: "white",
                borderRadius: 50,
              }}
              onClick={async () => {
                formProperty.setFieldsValue({
                  id: val.id,
                  title: val.title,
                  categoryId: val.categoriesId,
                  keyword: val.keyword,
                  subTitle: val.subTitle,
                  price: val.price,
                  detail: val.description,

                  isActive: val.isActive,
                });

                setImagePropertyURL({
                  loading: false,
                  imageUrl: val.BeefImage.googleImage,
                  imagePath: val.BeefImage.imagePath,
                });

                // setPropertyId(val.id);
                // console.log("propertyId : ", val.id)

                // setPropertyGallery(val.TruckGallery);
                // setPropertyGalleryDisplay(val.TruckGallery);

                // setVideoProductDetailURL({
                //     loading: false,
                //     videoUrl: val.videoURL
                // })

                setDetail(val.description ?? "");

                setModalProperty({ isShow: true, title: "edit" });
              }}
            >
              <div style={{ marginTop: 0, marginLeft: 0 }}>
                <Icon
                  icon="typcn:edit"
                  style={{ color: "white", width: 20, height: 20 }}
                />
              </div>
            </Button>
            {"  "}

            <Popconfirm
              title="คุณยืนยันลบหรือไม่ ?"
              okText={<span style={{ width: 50 }}>ใช่</span>}
              onConfirm={async () => {
                await handlePropertiesDelete(val.id);

                // reload
                await getProductsAll("");
              }}
              cancelText={<span style={{ width: 50 }}>ไม่ใช่</span>}
            >
              <Button
                danger
                type="primary"
                style={{
                  width: 35,
                  borderRadius: 50,
                }}
              >
                <div style={{ marginTop: 0, marginLeft: 0 }}>
                  <Icon
                    icon="fluent:delete-16-regular"
                    style={{ color: "white", width: 20, height: 20 }}
                  />
                </div>
              </Button>
            </Popconfirm>
          </>
        ),
      });
    });
    setList(tempList);
    searchNameRef.current = name;

    setLoading(false);
  };

  const onPropertyFinish = async (values) => {
    let param = {
      id: values.id ? values.id : "",
    };

    // const listOfURL = propertyGallery?.map((property) => property.imagePath);

    let body = {
      price: 0,
      title: values.title,
      keyword: values.keyword,
      description: detail,
      isActive: values.isActive,
      imagePath: imagePropertyURL.imagePath,
      categoriesId: values.categoryId,
    };

    if (modalProperty.title === "add") {
      const result = await insertProductFetch(null, body, accessToken);

      if (result.status) {
        Notification("success", "สร้างสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถสร้างได้ กรุณาลองใหม่อีกครั้ง");
      }
    } else if (modalProperty.title === "edit") {
      const result = await updateProductFetch(param, body, accessToken);

      if (result.status) {
        Notification("success", "เเก้ไขสำเร็จ");
      } else {
        Notification("error", "ไม่สามารถเเก้ไขได้ กรุณาลองใหม่อีกครั้ง");
      }
    }

    // reload
    await getProductsAll("");

    // set default
    setFormPropertyDefault();
  };

  // const onPropertyGalleryFinish = async (values) => {

  // }

  const onSearchFinish = async (values) => {
    let title = values?.title ? values.title : "";
    await getProductsAll(title);
  };

  const handlePropertiesDelete = async (id) => {
    let param = {
      id,
    };
    const result = await deleteProductByIdFetch(param, null, accessToken);

    if (result.status) {
      Notification("success", "ลบสำเร็จ");
    } else {
      Notification("error", "ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const onPagine = (n) => {
    pageCurrentRef.current = n.current;
    getProductsAll(searchNameRef.current);
  };

  const setFormPropertyDefault = () => {
    formProperty.setFieldsValue({
      id: undefined,
      title: undefined,
      isActive: undefined,
      isClosed: undefined,
      categoryId: undefined,
      price: undefined,
      detail: undefined,
    });

    setImagePropertyURL({
      loading: false,
      imageUrl: null,
      imagePath: null,
    });

    setImagePropertyGalleryURL({
      loading: false,
      imageUrl: null,
    });

    // setVideoProductDetailURL({
    //     loading: false,
    //     videoUrl: null
    // })

    setDetail("");

    setModalProperty({
      isShow: false,
      title: null,
    });
  };

  const getBaseApi = async () => {
    // getPropertyTypesAll();
    // getAllCategories();
    getProductsAll("");
  };

  useEffect(() => {
    getBaseApi();
  }, []);

  useEffect(() => {}, [propertyGalleryDisplay]);

  return (
    <Row>
      <Col span={12}>
        <label>จัดการผลิตภัณฑ์</label>
      </Col>

      <Col span={12} style={{ paddingBottom: 20 }}>
        <Form form={formSearch} layout="vertical" onFinish={onSearchFinish}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ paddingLeft: 10 }}>
              <Form.Item
                // label="ชื่ออสังหา"
                name="title"
                style={{ width: "100%" }}
              >
                <Input placeholder="ชื่อผลิตภัณฑ์" />
              </Form.Item>
            </div>

            <div style={{ paddingLeft: 10, marginTop: -24 }}>
              <Button
                style={{ float: "right", width: 70 }}
                type="primary"
                onClick={() => formSearch.submit()}
              >
                ค้นหา
              </Button>
            </div>
          </div>
        </Form>
      </Col>

      <Col span={24} style={{ paddingBottom: 20 }}>
        <Button
          type="primary"
          style={{ float: "right" }}
          onClick={() => {
            formProperty.resetFields();

            setPropertyGallery([]);
            setPropertyGalleryDisplay([]);

            setModalProperty({
              isShow: true,
              title: "add",
            });
          }}
        >
          เพิ่มสินค้า
        </Button>
      </Col>

      <Col span={24}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={{
            current: pageCurrentRef.current,
            pageSize: pageSize,
            total: total,
          }}
          onChange={(n) => onPagine(n)}
        ></Table>
      </Col>

      <Modal
        title={
          <strong>
            <label className="topic-color-bold">
              {modalProperty.title === "add" ? "เพิ่มข้อมูล" : "เเก้ไขข้อมูล"}
            </label>
          </strong>
        }
        visible={modalProperty.isShow}
        zIndex={999}
        onCancel={() => {
          // default
          setFormPropertyDefault();
        }}
        width={785}
        onOk={() => {
          formProperty.submit();
        }}
        okText={<label style={{ width: 50, cursor: "pointer" }}>บันทึก</label>}
        cancelText={
          <label style={{ width: 50, cursor: "pointer" }}>ยกเลิก</label>
        }
      >
        <Form layout="vertical" form={formProperty} onFinish={onPropertyFinish}>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} xl={12}>
              <Row gutter={[24, 0]}>
                <Form.Item name="fileId" style={{ display: "none" }}>
                  <Input />
                </Form.Item>
                <Col span={24}>
                  <Form.Item name="id" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="title"
                    label="ชื่อผลิตภัณฑ์"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกชื่อผลิตภัณฑ์",
                      },
                    ]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="keyword"
                    label="keyword"
                    rules={[{ required: true, message: "กรุณากรอก keyword" }]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col>

                {/* <Col span={24}>
                  <Form.Item
                    name="price"
                    label="ราคา"
                    rules={[{ required: true, message: "กรุณากรอกราคา" }]}
                  >
                    <Input placeholder="กรอกข้อความ" />
                  </Form.Item>
                </Col> */}
                <Col xs={24} md={12} xl={12}>
                  <Form.Item
                    name="categoryId"
                    label="หมวดหมู่ผลิตภัณฑ์"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกหมวดหมู่ผลิตภัณฑ์",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      optionFilterProp="children"
                      allowClear
                      placeholder="เลือกรายการ"
                      onChange={(value) => setCategoryId(value)}
                    >
                      <Option key={1} value={1}>
                        เนื้อสด
                      </Option>
                      <Option key={2} value={2}>
                        เนื้อสไลด์( โคขุน )
                      </Option>
                      <Option key={3} value={3}>
                        เนื้อสเต็ก ( โคขุน )
                      </Option>
                      <Option key={4} value={4}>
                        เนื้อแร็ปขึ้นก้อน
                      </Option>
                      <Option key={5} value={5}>
                        เนื้อแปรรูป
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col xs={24} md={12} xl={12}>
              <Row gutter={[24, 0]}>
                <Col xs={24} md={24} xl={24}>
                  <div style={{ display: "grid" }}>
                    <label style={{ paddingBottom: 6 }}>ภาพปกผลิตภัณฑ์</label>
                    {imagePropertyURL?.imageUrl ? (
                      <img
                        style={{
                          borderRadius: 8,
                          height: 200,
                          border: "1px solid #EEEEEE",
                        }}
                        src={`${imagePropertyURL.imageUrl}`}
                      />
                    ) : (
                      <img
                        style={{
                          height: 200,
                          borderRadius: 8,
                          border: "1px solid #C4C4C4",
                        }}
                        src={`./assets/images/default/df-img.png`}
                      />
                    )}
                    <div style={{ paddingTop: 24, paddingBottom: 24 }}>
                      <Upload
                        {...optionPropertyImage}
                        accept="image/jpeg, image/png, image/jfif"
                        style={{ width: "100%" }}
                        maxCount={1}
                        showUploadList={false}
                      >
                        <Button
                          type="default"
                          style={{ width: "100%" }}
                          icon={
                            imagePropertyURL.loading ? (
                              <LoadingOutlined />
                            ) : (
                              <UploadOutlined />
                            )
                          }
                        >
                          อัพโหลดรูปภาพ
                        </Button>
                      </Upload>
                    </div>
                  </div>
                </Col>

                {/* <Col xs={24} md={12} xl={12}>
                                    <div style={{ display: "grid" }}>
                                        <label style={{ paddingBottom: 6 }}>วิดีโอสินค้า (ไม่บังคับ)</label>
                                        {videoProductDetailURL?.videoUrl ?
                                            <div style={{ backgroundColor: "black", borderRadius: 8 }}>
                                                <Video
                                                    url={videoProductDetailURL.videoUrl}
                                                    title={""}
                                                    height={"100%"}
                                                    width={"100%"}
                                                />
                                            </div>
                                            :
                                            <img
                                                style={{ width: "100%", borderRadius: 8, border: "1px solid #C4C4C4" }}
                                                src={`./assets/images/default/df-vdo.png`}
                                            />
                                        }
                                        <div style={{ paddingTop: 12 }}>
                                            <Upload
                                                {...optionProductDetailVideo}
                                                accept='.mp4'
                                                style={{ width: "100%" }}
                                                maxCount={1}
                                                showUploadList={{ showRemoveIcon: false }}
                                            >
                                                <Button
                                                    type="default"
                                                    style={{ width: "100%" }}
                                                    icon={videoProductDetailURL.loading ? <LoadingOutlined /> : <UploadOutlined />}
                                                >อัพโหลดวิดีโอ</Button>
                                            </Upload>
                                        </div>
                                    </div>
                                </Col> */}
              </Row>
            </Col>
            <Col span={24}>
              <Form.Item
                name="detail"
                label="รายละเอียดรายละเอียดผลิตภัณฑ์"
                rules={[{ required: true, message: "กรุณากรอกรายละเอียด" }]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    toolbar: {
                      items: [
                        "heading",
                        "|",
                        "fontfamily",
                        "fontsize",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "|",
                        "alignment",
                        "|",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "todoList",
                        "|",
                        "code",
                        "codeBlock",
                        "|",
                        "undo",
                        "redo",
                      ],
                      removeButtons: "Subscript,Superscript",
                      height: 300,
                    },
                  }}
                  data={detail}
                  onBlur={(event, editor) => {
                    const data = editor.getData();

                    setDetail(data);
                    formProperty.setFieldValue("detail", data);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="isActive"
                label="สถานะการใช้งาน"
                rules={[
                  { required: true, message: "กรุณาเลือกสถานะการใช้งาน" },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  optionFilterProp="children"
                  allowClear
                  placeholder="เลือกสถานะ"
                >
                  <Option key={0} value={true}>
                    เปิดใช้งาน
                  </Option>
                  <Option key={1} value={false}>
                    ปิดใช้งาน
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
}
